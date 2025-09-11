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

    // Generate mock translation response
    const translation = `${text.trim()} [Translated to ${language}]`;

    // Add some language-specific mock improvements
    const languageEnhancements = {
      french: (text) =>
        text.replace(/hello/gi, "bonjour").replace(/world/gi, "monde"),
      spanish: (text) =>
        text.replace(/hello/gi, "hola").replace(/world/gi, "mundo"),
      german: (text) =>
        text.replace(/hello/gi, "hallo").replace(/world/gi, "welt"),
      italian: (text) =>
        text.replace(/hello/gi, "ciao").replace(/world/gi, "mondo"),
      portuguese: (text) =>
        text.replace(/hello/gi, "olá").replace(/world/gi, "mundo"),
      dutch: (text) =>
        text.replace(/hello/gi, "hallo").replace(/world/gi, "wereld"),
      russian: (text) =>
        text.replace(/hello/gi, "привет").replace(/world/gi, "мир"),
      chinese: (text) =>
        text.replace(/hello/gi, "你好").replace(/world/gi, "世界"),
      japanese: (text) =>
        text.replace(/hello/gi, "こんにちは").replace(/world/gi, "世界"),
      korean: (text) =>
        text.replace(/hello/gi, "안녕하세요").replace(/world/gi, "세계"),
    };

    let enhancedTranslation = translation;
    if (languageEnhancements[language]) {
      enhancedTranslation = languageEnhancements[language](translation);
    }

    // Return successful response
    res.status(200).json({
      success: true,
      originalText: text,
      translatedText: enhancedTranslation,
      targetLanguage: language,
      timestamp: new Date().toISOString(),
      processingTime: processingTime,
      characterCount: text.length,
      wordCount: text.trim().split(/\s+/).length,
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
