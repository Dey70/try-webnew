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
    const { text, language } = req.body;

    // Validate input
    if (!text || !language) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Both text and language are required",
      });
    }

    if (typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        error: "Invalid text",
        message: "Text must be a non-empty string",
      });
    }

    if (text.length > 1000) {
      return res.status(400).json({
        error: "Text too long",
        message: "Text must be less than 1000 characters",
      });
    }

    // Simulate processing delay based on text length
    const processingTime = Math.min(2000, Math.max(500, text.length * 20));
    await new Promise((resolve) => setTimeout(resolve, processingTime));

    // Enhanced translation dictionaries for better demo translations
    const translationDictionaries = {
      french: {
        hello: "bonjour",
        world: "monde",
        welcome: "bienvenue",
        to: "à",
        our: "notre",
        website: "site web",
        good: "bon",
        morning: "matin",
        evening: "soir",
        thank: "merci",
        you: "vous",
        please: "s'il vous plaît",
        yes: "oui",
        no: "non",
        help: "aide",
        where: "où",
        is: "est",
        how: "comment",
        are: "êtes",
        what: "quoi",
        when: "quand",
        why: "pourquoi",
        who: "qui",
        i: "je",
        love: "aime",
        time: "temps",
        understand: "comprends",
        speak: "parlez",
        english: "anglais",
        much: "beaucoup",
        the: "le",
        and: "et",
        or: "ou",
        but: "mais",
        with: "avec",
        for: "pour",
        this: "ce",
        that: "que",
      },
      spanish: {
        hello: "hola",
        world: "mundo",
        welcome: "bienvenido",
        to: "a",
        our: "nuestro",
        website: "sitio web",
        good: "bueno",
        morning: "mañana",
        evening: "tarde",
        thank: "gracias",
        you: "usted",
        please: "por favor",
        yes: "sí",
        no: "no",
        help: "ayuda",
        where: "dónde",
        is: "es",
        how: "cómo",
        are: "están",
        what: "qué",
        when: "cuándo",
        why: "por qué",
        who: "quién",
        i: "yo",
        love: "amo",
        time: "tiempo",
        understand: "entiendo",
        speak: "hablar",
        english: "inglés",
        much: "mucho",
        the: "el",
        and: "y",
        or: "o",
        but: "pero",
        with: "con",
        for: "para",
        this: "este",
        that: "que",
      },
      german: {
        hello: "hallo",
        world: "welt",
        welcome: "willkommen",
        to: "zu",
        our: "unser",
        website: "webseite",
        good: "gut",
        morning: "morgen",
        evening: "abend",
        thank: "danke",
        you: "sie",
        please: "bitte",
        yes: "ja",
        no: "nein",
        help: "hilfe",
        where: "wo",
        is: "ist",
        how: "wie",
        are: "sind",
        what: "was",
        when: "wann",
        why: "warum",
        who: "wer",
        i: "ich",
        love: "liebe",
        time: "zeit",
        understand: "verstehe",
        speak: "sprechen",
        english: "englisch",
        much: "viel",
        the: "der",
        and: "und",
        or: "oder",
        but: "aber",
        with: "mit",
        for: "für",
        this: "dies",
        that: "dass",
      },
      italian: {
        hello: "ciao",
        world: "mondo",
        welcome: "benvenuto",
        to: "a",
        our: "nostro",
        website: "sito web",
        good: "buono",
        morning: "mattina",
        evening: "sera",
        thank: "grazie",
        you: "tu",
        please: "per favore",
        yes: "sì",
        no: "no",
        help: "aiuto",
        where: "dove",
        is: "è",
        how: "come",
        are: "sono",
        what: "cosa",
        when: "quando",
        why: "perché",
        who: "chi",
        i: "io",
        love: "amo",
        time: "tempo",
        understand: "capisco",
        speak: "parlare",
        english: "inglese",
        much: "molto",
        the: "il",
        and: "e",
        or: "o",
        but: "ma",
        with: "con",
        for: "per",
        this: "questo",
        that: "che",
      },
      portuguese: {
        hello: "olá",
        world: "mundo",
        welcome: "bem-vindo",
        to: "para",
        our: "nosso",
        website: "site",
        good: "bom",
        morning: "manhã",
        evening: "noite",
        thank: "obrigado",
        you: "você",
        please: "por favor",
        yes: "sim",
        no: "não",
        help: "ajuda",
        where: "onde",
        is: "é",
        how: "como",
        are: "são",
        what: "o que",
        when: "quando",
        why: "por que",
        who: "quem",
        i: "eu",
        love: "amo",
        time: "tempo",
        understand: "entendo",
        speak: "falar",
        english: "inglês",
        much: "muito",
        the: "o",
        and: "e",
        or: "ou",
        but: "mas",
        with: "com",
        for: "para",
        this: "este",
        that: "que",
      },
    };

    // Enhanced translation function
    function translateWithDictionary(text, targetLanguage) {
      const dictionary = translationDictionaries[targetLanguage];
      if (!dictionary) {
        return `${text} [Translated to ${targetLanguage}]`;
      }

      // Split text into words and preserve punctuation
      const words = text.toLowerCase().split(/(\s+|[.,!?;:()"])/g);

      const translatedWords = words.map((word) => {
        // Skip whitespace and punctuation
        if (/^\s+$/.test(word) || /^[.,!?;:()"]+$/.test(word)) {
          return word;
        }

        // Clean word for dictionary lookup
        const cleanWord = word.replace(/[.,!?;:()"]/g, "").toLowerCase();

        // Look up in dictionary or return original
        return dictionary[cleanWord] || word;
      });

      return translatedWords.join("");
    }

    // Generate translation
    const translation = translateWithDictionary(text, language);

    // Database preparation - placeholder for future MongoDB/SQL integration
    const translationData = {
      originalText: text,
      translatedText: translation,
      targetLanguage: language,
      timestamp: new Date().toISOString(),
      processingTime: processingTime,
      characterCount: text.length,
      wordCount: text.trim().split(/\s+/).length,
      userId: null, // Will be populated when user auth is implemented
      sessionId: req.headers["x-session-id"] || "anonymous", // For tracking
    };

    // Placeholder function for database storage (Week 10 implementation)
    const saveResult = await saveTranslationToDatabase(translationData);

    // Return successful response
    res.status(200).json({
      success: true,
      originalText: text,
      translatedText: translation,
      targetLanguage: language,
      timestamp: new Date().toISOString(),
      processingTime: processingTime,
      characterCount: text.length,
      wordCount: text.trim().split(/\s+/).length,
      saved: saveResult.saved,
      id: saveResult.id,
    });
  } catch (error) {
    console.error("Translation API Error:", error);

    res.status(500).json({
      error: "Internal server error",
      message: "An error occurred while processing your translation request",
      timestamp: new Date().toISOString(),
    });
  }
}

// Database preparation functions (Week 10 foundation)
async function saveTranslationToDatabase(translationData) {
  try {
    // Call the history API to save the translation
    const response = await fetch(
      `${process.env.VERCEL_URL || "http://localhost:3000"}/api/history`,
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

// Additional database preparation functions for Week 10
async function getUserTranslationHistory(userId, limit = 10) {
  // TODO: Week 10 - Implement user-specific history retrieval
  console.log(
    `[DB Placeholder] Getting history for user: ${userId}, limit: ${limit}`
  );
  return [];
}

async function deleteTranslationById(translationId, userId) {
  // TODO: Week 10 - Implement translation deletion
  console.log(
    `[DB Placeholder] Deleting translation: ${translationId} for user: ${userId}`
  );
  return { success: true };
}

async function getTranslationStats(userId) {
  // TODO: Week 10 - Implement translation statistics
  console.log(`[DB Placeholder] Getting stats for user: ${userId}`);
  return {
    totalTranslations: 0,
    totalCharacters: 0,
    languagesUsed: [],
    lastTranslation: null,
  };
}
