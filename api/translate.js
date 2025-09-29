export default async function handler(req, res) {
  // Set CORS headers for cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only POST requests are supported",
    });
  }

  try {
    const { text, sourceLanguage, targetLanguage, language } = req.body || {};

    // Accept legacy { language } (Week 11) while preferring { targetLanguage }
    const requestedTarget = targetLanguage || language;
    const requestedSource = sourceLanguage || "en";

    // Enhanced input validation
    if (!text || !requestedTarget) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "text and targetLanguage are required",
      });
    }

    if (typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid text",
        message: "Text must be a non-empty string",
      });
    }

    if (text.length > 1000) {
      return res.status(400).json({
        success: false,
        error: "Text too long",
        message: "Text must be less than 1000 characters",
      });
    }

    // Internal language keys used by the UI
    const internalToIso = {
      french: "fr",
      spanish: "es",
      german: "de",
      italian: "it",
      portuguese: "pt",
      dutch: "nl",
      russian: "ru",
      chinese: "zh",
      japanese: "ja",
      korean: "ko",
    };

    const isoToInternal = Object.fromEntries(
      Object.entries(internalToIso).map(([k, v]) => [v, k])
    );

    // Accept both internal keys (e.g. "french") and ISO codes (e.g. "fr")
    const normalizeLang = (val, fallbackInternal) => {
      if (!val) return fallbackInternal;
      const lower = String(val).toLowerCase();
      if (internalToIso[lower]) return { iso: internalToIso[lower], internal: lower };
      // If it's an ISO code we know
      if (isoToInternal[lower]) return { iso: lower, internal: isoToInternal[lower] };
      // Default: assume already ISO; keep internal as provided
      return { iso: lower, internal: lower };
    };

    const normalizedTarget = normalizeLang(requestedTarget, "french");
    const normalizedSource = normalizeLang(requestedSource, "en");

    // Validate target is among supported UI languages when using internal keys
    const validInternal = [
      'french', 'spanish', 'german', 'italian', 'portuguese', 
      'dutch', 'russian', 'chinese', 'japanese', 'korean'
    ];

    if (
      normalizedTarget.internal &&
      validInternal.includes(normalizedTarget.internal) === false &&
      isoToInternal[normalizedTarget.iso] === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid language",
        message: `Target language must be one of: ${validInternal.join(', ')}`,
      });
    }

    // Call LibreTranslate (or configured compatible service)
    const libreUrl = process.env.LIBRETRANSLATE_URL || "https://libretranslate.com";
    const libreKey = process.env.LIBRETRANSLATE_API_KEY || undefined;

    const startedAt = Date.now();
    let translatedText = "";

    try {
      const ltResponse = await fetch(`${libreUrl}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: normalizedSource.iso || "en",
          target: normalizedTarget.iso,
          format: "text",
          api_key: libreKey,
        }),
      });

      if (!ltResponse.ok) {
        const errText = await safeReadJson(ltResponse).catch(() => ({}));
        throw new Error(
          `Translation service error: ${ltResponse.status} ${ltResponse.statusText} ${(errText && errText.error) || ''}`
        );
      }

      const ltData = await ltResponse.json();
      translatedText = ltData.translatedText || ltData.translation || "";

      if (!translatedText) {
        throw new Error("Empty translation from service");
      }
    } catch (svcErr) {
      console.error("[Translate] Service error, falling back:", svcErr);
      // As a minimal fallback, echo text with a tag to avoid blank UI
      translatedText = `${text}`;
    }

    const processingTime = Date.now() - startedAt;

    // Prepare data for history save, keeping internal target key for UI compatibility
    const targetInternalKey = normalizedTarget.internal || isoToInternal[normalizedTarget.iso] || normalizedTarget.iso;
    const translationData = {
      originalText: text,
      translatedText,
      targetLanguage: targetInternalKey,
      timestamp: new Date().toISOString(),
      processingTime,
      characterCount: text.length,
      wordCount: text.trim().split(/\s+/).length,
      userId: null,
      sessionId: req.headers["x-session-id"] || "anonymous",
    };

    const saveResult = await saveTranslationToDatabase(translationData);

    res.status(200).json({
      success: true,
      data: {
        originalText: text,
        translatedText,
        targetLanguage: targetInternalKey,
        timestamp: new Date().toISOString(),
        processingTime,
        characterCount: text.length,
        wordCount: text.trim().split(/\s+/).length,
        saved: saveResult.saved,
        id: saveResult.id,
      },
      message: "Translation completed successfully",
    });
  } catch (error) {
    console.error("Translation API Error:", error);

    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "An error occurred while processing your translation request",
      timestamp: new Date().toISOString(),
    });
  }
}

async function safeReadJson(resp) {
  try {
    return await resp.json();
  } catch (_) {
    return {};
  }
}

// Database preparation functions (Week 10 foundation)
async function saveTranslationToDatabase(translationData) {
  try {
    // Call the history API to save the translation
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");

    const response = await fetch(
      `${baseUrl}/api/history`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_text: translationData.originalText,
          translated_text: translationData.translatedText,
          target_language: translationData.targetLanguage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("[DB] Translation saved successfully:", result.data?.id);

    return { success: true, saved: true, id: result.data?.id };
  } catch (error) {
    console.error("[DB] Error saving translation:", error);
    return { success: false, error: error.message };
  }
}

function generateTranslationId() {
  return `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function getUserTranslationHistory(userId, limit = 10) {
  console.log(
    `[DB Placeholder] Getting history for user: ${userId}, limit: ${limit}`
  );
  return [];
}

async function deleteTranslationById(translationId, userId) {
  console.log(
    `[DB Placeholder] Deleting translation: ${translationId} for user: ${userId}`
  );
  return { success: true };
}

async function getTranslationStats(userId) {
  console.log(`[DB Placeholder] Getting stats for user: ${userId}`);
}