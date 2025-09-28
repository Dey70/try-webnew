// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileNav.classList.toggle("active");

    // Toggle body scroll when menu is open
    if (mobileNav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking on links
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking on login button
  document
    .querySelector(".mobile-nav .cta-button")
    .addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
    });

  // Demo window interactions
  document
    .querySelector(".translate-btn")
    .addEventListener("click", function () {
      const originalText = this.textContent;

      this.textContent = "Translating...";
      this.style.background = "linear-gradient(45deg, #28ca42, #22a83a)";

      setTimeout(() => {
        this.textContent = "Complete!";
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = "";
        }, 1500);
      }, 1000);
    });

  // Language selector interaction
  document.querySelectorAll(".lang-box").forEach((box) => {
    box.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Tab navigation
  document.querySelectorAll(".nav-tabs span").forEach((tab) => {
    tab.addEventListener("click", function () {
      document
        .querySelectorAll(".nav-tabs span")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ===== DASHBOARD FUNCTIONALITY - WEEK 7 ENHANCEMENTS ===== //
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const translateButton = document.getElementById("translateButton");
  const clearButton = document.getElementById("clearButton");
  const languageSelector = document.getElementById("languageSelector");
  const charCount = document.querySelector(".char-count");
  const wordCount = document.querySelector(".word-count");
  const targetLanguageIndicator = document.getElementById(
    "targetLanguageIndicator"
  );
  const copyButton = document.getElementById("copyButton");
  const clearHistoryButton = document.getElementById("clearHistoryButton");
  const historyContent = document.getElementById("historyContent");

  // Language configurations with flags and sample translations
  const languageConfigs = {
    french: {
      name: "Français",
      flag: "french",
      flagEmoji: "🇫🇷",
      translations: {
        "welcome to our website": "bienvenue sur notre site web",
        "hello world": "bonjour le monde",
        "how are you": "comment allez-vous",
        "good morning": "bonjour",
        "thank you": "merci",
        "good evening": "bonsoir",
        please: "s'il vous plaît",
        "excuse me": "excusez-moi",
        yes: "oui",
        no: "non",
        help: "aide",
        "where is": "où est",
        "i love you": "je t'aime",
        "what time is it": "quelle heure est-il",
        "i don't understand": "je ne comprends pas",
        "speak english": "parlez anglais",
        "how much": "combien",
        where: "où",
        when: "quand",
        why: "pourquoi",
        what: "quoi",
        who: "qui",
        how: "comment",
      },
    },
    spanish: {
      name: "Español",
      flag: "spanish",
      flagEmoji: "🇪🇸",
      translations: {
        "welcome to our website": "bienvenido a nuestro sitio web",
        "hello world": "hola mundo",
        "how are you": "¿cómo estás?",
        "good morning": "buenos días",
        "thank you": "gracias",
        "good evening": "buenas noches",
        please: "por favor",
        "excuse me": "disculpe",
        yes: "sí",
        no: "no",
        help: "ayuda",
        "where is": "dónde está",
        "i love you": "te amo",
        "what time is it": "¿qué hora es?",
        "i don't understand": "no entiendo",
        "speak english": "habla inglés",
        "how much": "cuánto",
        where: "dónde",
        when: "cuándo",
        why: "por qué",
        what: "qué",
        who: "quién",
        how: "cómo",
      },
    },
    german: {
      name: "Deutsch",
      flag: "german",
      flagEmoji: "🇩🇪",
      translations: {
        "welcome to our website": "willkommen auf unserer website",
        "hello world": "hallo welt",
        "how are you": "wie geht es dir?",
        "good morning": "guten morgen",
        "thank you": "danke",
        "good evening": "guten abend",
        please: "bitte",
        "excuse me": "entschuldigung",
        yes: "ja",
        no: "nein",
        help: "hilfe",
        "where is": "wo ist",
        "i love you": "ich liebe dich",
        "what time is it": "wie spät ist es?",
        "i don't understand": "ich verstehe nicht",
        "speak english": "sprechen sie englisch",
        "how much": "wie viel",
        where: "wo",
        when: "wann",
        why: "warum",
        what: "was",
        who: "wer",
        how: "wie",
      },
    },
    italian: {
      name: "Italiano",
      flag: "italian",
      flagEmoji: "🇮🇹",
      translations: {
        "welcome to our website": "benvenuto nel nostro sito web",
        "hello world": "ciao mondo",
        "how are you": "come stai?",
        "good morning": "buongiorno",
        "thank you": "grazie",
        "good evening": "buonasera",
        please: "per favore",
        "excuse me": "scusi",
        yes: "sì",
        no: "no",
        help: "aiuto",
        "where is": "dov'è",
        "i love you": "ti amo",
        "what time is it": "che ore sono?",
        "i don't understand": "non capisco",
        "speak english": "parla inglese",
        "how much": "quanto",
        where: "dove",
        when: "quando",
        why: "perché",
        what: "cosa",
        who: "chi",
        how: "come",
      },
    },
    portuguese: {
      name: "Português",
      flag: "portuguese",
      flagEmoji: "🇵🇹",
      translations: {
        "welcome to our website": "bem-vindo ao nosso site",
        "hello world": "olá mundo",
        "how are you": "como está?",
        "good morning": "bom dia",
        "thank you": "obrigado",
        "good evening": "boa noite",
        please: "por favor",
        "excuse me": "com licença",
        yes: "sim",
        no: "não",
        help: "ajuda",
        "where is": "onde está",
        "i love you": "eu te amo",
        "what time is it": "que horas são?",
        "i don't understand": "eu não entendo",
        "speak english": "fala inglês",
        "how much": "quanto",
        where: "onde",
        when: "quando",
        why: "por que",
        what: "o que",
        who: "quem",
        how: "como",
      },
    },
    dutch: {
      name: "Nederlands",
      flag: "dutch",
      flagEmoji: "🇳🇱",
      translations: {
        "welcome to our website": "welkom op onze website",
        "hello world": "hallo wereld",
        "how are you": "hoe gaat het?",
        "good morning": "goedemorgen",
        "thank you": "dank je",
        "good evening": "goedenavond",
        please: "alsjeblieft",
        "excuse me": "pardon",
        yes: "ja",
        no: "nee",
        help: "hulp",
        "where is": "waar is",
        "i love you": "ik hou van je",
        "what time is it": "hoe laat is het?",
        "i don't understand": "ik begrijp het niet",
        "speak english": "spreek engels",
        "how much": "hoeveel",
        where: "waar",
        when: "wanneer",
        why: "waarom",
        what: "wat",
        who: "wie",
        how: "hoe",
      },
    },
    russian: {
      name: "Русский",
      flag: "russian",
      flagEmoji: "🇷🇺",
      translations: {
        "welcome to our website": "добро пожаловать на наш сайт",
        "hello world": "привет мир",
        "how are you": "как дела?",
        "good morning": "доброе утро",
        "thank you": "спасибо",
        "good evening": "добрый вечер",
        please: "пожалуйста",
        "excuse me": "извините",
        yes: "да",
        no: "нет",
        help: "помощь",
        "where is": "где находится",
        "i love you": "я тебя люблю",
        "what time is it": "который час?",
        "i don't understand": "я не понимаю",
        "speak english": "говорите по-английски",
        "how much": "сколько",
        where: "где",
        when: "когда",
        why: "почему",
        what: "что",
        who: "кто",
        how: "как",
      },
    },
    chinese: {
      name: "中文",
      flag: "chinese",
      flagEmoji: "🇨🇳",
      translations: {
        "welcome to our website": "欢迎来到我们的网站",
        "hello world": "你好世界",
        "how are you": "你好吗？",
        "good morning": "早上好",
        "thank you": "谢谢",
        "good evening": "晚上好",
        please: "请",
        "excuse me": "打扰一下",
        yes: "是",
        no: "不",
        help: "帮助",
        "where is": "在哪里",
        "i love you": "我爱你",
        "what time is it": "现在几点？",
        "i don't understand": "我不明白",
        "speak english": "说英语",
        "how much": "多少",
        where: "哪里",
        when: "什么时候",
        why: "为什么",
        what: "什么",
        who: "谁",
        how: "怎么样",
      },
    },
    japanese: {
      name: "日本語",
      flag: "japanese",
      flagEmoji: "🇯🇵",
      translations: {
        "welcome to our website": "私たちのウェブサイトへようこそ",
        "hello world": "こんにちは世界",
        "how are you": "元気ですか？",
        "good morning": "おはようございます",
        "thank you": "ありがとう",
        "good evening": "こんばんは",
        please: "お願いします",
        "excuse me": "すみません",
        yes: "はい",
        no: "いいえ",
        help: "助け",
        "where is": "どこにありますか",
        "i love you": "愛しています",
        "what time is it": "今何時ですか？",
        "i don't understand": "分かりません",
        "speak english": "英語を話してください",
        "how much": "いくら",
        where: "どこ",
        when: "いつ",
        why: "なぜ",
        what: "何",
        who: "誰",
        how: "どのように",
      },
    },
    korean: {
      name: "한국어",
      flag: "korean",
      flagEmoji: "🇰🇷",
      translations: {
        "welcome to our website": "저희 웹사이트에 오신 것을 환영합니다",
        "hello world": "안녕하세요 세계",
        "how are you": "어떻게 지내세요?",
        "good morning": "좋은 아침",
        "thank you": "감사합니다",
        "good evening": "좋은 저녁",
        please: "제발",
        "excuse me": "실례합니다",
        yes: "네",
        no: "아니요",
        help: "도움",
        "where is": "어디에 있습니까",
        "i love you": "사랑해요",
        "what time is it": "지금 몇 시예요?",
        "i don't understand": "이해하지 못하겠습니다",
        "speak english": "영어 하세요",
        "how much": "얼마",
        where: "어디",
        when: "언제",
        why: "왜",
        what: "무엇",
        who: "누구",
        how: "어떻게",
      },
    },
  };

  // Initialize current language
  let currentLanguage = "french";

  // ===== LIVE CHARACTER AND WORD COUNTER ===== //
  function updateCounters(text) {
    const charLength = text.length;
    const wordLength = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    if (charCount) {
      charCount.textContent = `${charLength} characters`;
      // Add visual feedback for character limits
      if (charLength > 1000) {
        charCount.style.color = "#ff4444";
        charCount.style.fontWeight = "bold";
      } else if (charLength > 800) {
        charCount.style.color = "#ff9500";
        charCount.style.fontWeight = "bold";
      } else {
        charCount.style.color = "#888";
        charCount.style.fontWeight = "normal";
      }
    }

    if (wordCount) {
      wordCount.textContent = `${wordLength} words`;
    }
  }

  // Character counter functionality
  if (inputText && (charCount || wordCount)) {
    inputText.addEventListener("input", function () {
      updateCounters(this.value);
    });

    // Initialize counters
    updateCounters(inputText.value);
  }

  // ===== LANGUAGE SELECTOR FUNCTIONALITY ===== //
  function updateLanguageIndicator(languageKey) {
    const config = languageConfigs[languageKey];
    if (targetLanguageIndicator && config) {
      const flagElement = targetLanguageIndicator.querySelector(".flag");
      const textElement = targetLanguageIndicator.querySelector("span");

      if (flagElement && textElement) {
        flagElement.className = `flag ${config.flag}`;
        textElement.textContent = config.name;
      }
    }
  }

  // Language selector change event
  if (languageSelector) {
    languageSelector.addEventListener("change", function () {
      currentLanguage = this.value;
      updateLanguageIndicator(currentLanguage);

      // Add selection animation
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // Clear output when language changes
      if (outputText && outputText.value.trim() !== "") {
        outputText.value = "";
        // Show a hint about the new language
        outputText.placeholder = `Translation will appear in ${languageConfigs[currentLanguage].name}...`;
        setTimeout(() => {
          outputText.placeholder = "Translation will appear here...";
        }, 3000);
      }
    });

    // Initialize language indicator
    updateLanguageIndicator(currentLanguage);
  }

  // ===== ENHANCED TRANSLATION FUNCTIONALITY ===== //
  async function translateText(text, targetLang) {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          language: targetLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Translation failed");
      }

      const data = await response.json();
      return data.data.translatedText;
    } catch (error) {
      console.error("Translation API Error:", error);
      
      // Enhanced error handling with specific messages
      if (error.message.includes("Failed to fetch")) {
        showNotification("Server not available. Please check your connection.", "error");
      } else if (error.message.includes("Text too long")) {
        showNotification("Text is too long. Please reduce the length.", "error");
      } else if (error.message.includes("Missing required fields")) {
        showNotification("Please enter text to translate.", "error");
      } else {
        showNotification("Translation failed. Please try again.", "error");
      }
      
      // Fallback to local mock translation if API fails
      return generateFallbackTranslation(text, targetLang);
    }
  }

  function generateFallbackTranslation(text, targetLang) {
    const config = languageConfigs[targetLang];
    if (!config) return `${text} [Translated to ${targetLang}]`;

    const lowerText = text.toLowerCase();

    // Check for exact match first
    if (config.translations[lowerText]) {
      return config.translations[lowerText];
    }

    // Word-by-word translation for unknown phrases
    const words = text.split(" ");
    const translatedWords = words.map((word) => {
      // Remove punctuation for lookup
      const cleanWord = word.toLowerCase().replace(/[.,!?;:"'()]/g, "");
      const punctuation = word.replace(/[a-zA-Z]/g, "");

      // Look up the clean word
      const translatedWord =
        config.translations[cleanWord] ||
        generateMockTranslation(cleanWord, targetLang);
      return translatedWord + punctuation;
    });

    return translatedWords.join(" ");
  }

  // Generate mock translation for unknown words based on target language
  function generateMockTranslation(word, targetLang) {
    if (word.length < 2) return word;

    const mockPatterns = {
      french: {
        suffixes: ["é", "er", "tion", "ique", "eux", "euse", "ment"],
        prefixes: ["dé", "pré", "sur", "sous"],
      },
      spanish: {
        suffixes: ["o", "a", "ción", "ico", "oso", "osa", "mente"],
        prefixes: ["des", "pre", "sobre", "sub"],
      },
      german: {
        suffixes: ["en", "er", "ung", "isch", "lich", "ig", "heit"],
        prefixes: ["un", "vor", "über", "unter"],
      },
      italian: {
        suffixes: ["o", "a", "zione", "ico", "oso", "osa", "mente"],
        prefixes: ["dis", "pre", "sopra", "sotto"],
      },
      portuguese: {
        suffixes: ["o", "a", "ção", "ico", "oso", "osa", "mente"],
        prefixes: ["des", "pré", "sobre", "sub"],
      },
      dutch: {
        suffixes: ["en", "er", "ing", "isch", "lijk", "ig", "heid"],
        prefixes: ["on", "voor", "over", "onder"],
      },
      russian: {
        suffixes: ["ый", "ая", "ие", "ов", "ен", "ка", "ость"],
        prefixes: ["не", "пре", "над", "под"],
      },
      chinese: {
        suffixes: ["的", "了", "着", "过", "们", "子", "性"],
        prefixes: ["不", "再", "超", "副"],
      },
      japanese: {
        suffixes: ["る", "た", "て", "ます", "です", "の", "に"],
        prefixes: ["不", "再", "超", "副"],
      },
      korean: {
        suffixes: ["다", "요", "는", "을", "를", "의", "에"],
        prefixes: ["불", "재", "초", "부"],
      },
    };

    const patterns = mockPatterns[targetLang] || mockPatterns.french;
    let translated = word;

    // Add target language suffix
    if (Math.random() > 0.4) {
      const suffix =
        patterns.suffixes[Math.floor(Math.random() * patterns.suffixes.length)];
      translated = word.slice(0, -1) + suffix;
    }

    // Add target language prefix occasionally
    if (Math.random() > 0.8) {
      const prefix =
        patterns.prefixes[Math.floor(Math.random() * patterns.prefixes.length)];
      translated = prefix + translated;
    }

    return translated;
  }

  // Enhanced typing animation for translation output
  function typeTranslation(text, callback) {
    if (!outputText) return;

    let i = 0;
    const typeSpeed = Math.max(15, Math.min(40, 800 / text.length)); // Adaptive speed
    outputText.value = "";
    
    // Add typing cursor effect
    outputText.style.borderRight = "2px solid #ff4444";
    outputText.style.animation = "blink 1s infinite";

    function typeChar() {
      if (i < text.length) {
        outputText.value += text.charAt(i);
        i++;
        setTimeout(typeChar, typeSpeed);
      } else {
        // Remove typing cursor
        outputText.style.borderRight = "";
        outputText.style.animation = "";
        
        // Add completion animation
        outputText.style.animation = "fadeInScale 0.3s ease-out";
        setTimeout(() => {
          outputText.style.animation = "";
        }, 300);
        
        if (callback) callback();
      }
    }

    typeChar();
  }

  // ===== TRANSLATION BUTTON FUNCTIONALITY ===== //
  if (translateButton && inputText && outputText) {
    translateButton.addEventListener("click", async () => {
      const text = inputText.value.trim();

      if (!text) {
        // Enhanced shake animation for empty input
        inputText.style.animation = "shake 0.5s ease-in-out";
        inputText.style.borderColor = "#ff4444";
        inputText.focus();

        setTimeout(() => {
          inputText.style.animation = "";
          inputText.style.borderColor = "";
        }, 500);
        return;
      }

      // Disable button and show enhanced loading state
      translateButton.disabled = true;
      const buttonText = translateButton.querySelector(".button-text");
      const buttonIcon = translateButton.querySelector(".button-icon");
      const originalText = buttonText.textContent;
      const originalIcon = buttonIcon.textContent;

      // Create loading spinner
      const spinner = document.createElement("div");
      spinner.className = "loading-spinner";
      spinner.style.marginRight = "8px";
      
      buttonText.textContent = "Translating...";
      buttonIcon.innerHTML = "";
      buttonIcon.appendChild(spinner);
      translateButton.style.background = "linear-gradient(135deg, #666 0%, #555 100%)";

      // Clear output and show processing state with animation
      outputText.value = "";
      outputText.placeholder = "Processing translation...";
      outputText.style.opacity = "0.7";
      
      // Add loading overlay to output section
      const outputSection = outputText.closest('.output-section');
      const loadingOverlay = document.createElement("div");
      loadingOverlay.className = "loading-overlay";
      loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Translating...</div>
      `;
      outputSection.style.position = "relative";
      outputSection.appendChild(loadingOverlay);

      try {
        const translation = await translateText(text, currentLanguage);

        // Remove loading overlay
        const loadingOverlay = outputSection.querySelector('.loading-overlay');
        if (loadingOverlay) {
          loadingOverlay.remove();
        }
        outputText.style.opacity = "1";

        // Type out the translation with animation
        typeTranslation(translation, () => {
          // Re-enable button
          translateButton.disabled = false;
          buttonText.textContent = originalText;
          buttonIcon.textContent = originalIcon;
          translateButton.style.background = "";
          outputText.placeholder = "Translation will appear here...";

          storeTranslationHistory(text, translation, currentLanguage);
        });
      } catch (error) {
        console.error("Translation failed:", error);
        
        // Remove loading overlay on error
        const loadingOverlay = outputSection.querySelector('.loading-overlay');
        if (loadingOverlay) {
          loadingOverlay.remove();
        }
        outputText.style.opacity = "1";
        
        handleTranslationError();
      }
    });
  }

  // ===== CLEAR BUTTON FUNCTIONALITY ===== //
  if (clearButton && inputText && outputText) {
    clearButton.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Clear both text areas with animation
      const originalInputBorder = inputText.style.borderColor;
      const originalOutputBorder = outputText.style.borderColor;

      inputText.style.borderColor = "#ff9500";
      outputText.style.borderColor = "#ff9500";

      // Fade out content
      inputText.style.opacity = "0.5";
      outputText.style.opacity = "0.5";

      setTimeout(() => {
        inputText.value = "";
        outputText.value = "";
        updateCounters("");

        // Fade back in
        inputText.style.opacity = "1";
        outputText.style.opacity = "1";
        inputText.style.borderColor = originalInputBorder;
        outputText.style.borderColor = originalOutputBorder;

        // Focus on input
        inputText.focus();
      }, 200);
    });
  }

  // ===== COPY FUNCTIONALITY ===== //
  if (copyButton && outputText) {
    copyButton.addEventListener("click", function () {
      const textToCopy = outputText.value.trim();

      if (!textToCopy) {
        // Show feedback for empty output
        this.style.background =
          "linear-gradient(135deg, #ff4444 0%, #cc3333 100%)";
        const originalText = this.textContent;
        this.textContent = "Nothing to copy!";

        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = "";
        }, 2000);
        return;
      }

      // Copy to clipboard
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // Success feedback
          const originalText = this.textContent;
          const originalBackground = this.style.background;

          this.textContent = "Copied!";
          this.style.background =
            "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
          this.style.transform = "scale(1.05)";

          setTimeout(() => {
            this.textContent = originalText;
            this.style.background = originalBackground;
            this.style.transform = "";
          }, 2000);
        })
        .catch(() => {
          // Error feedback
          this.style.background =
            "linear-gradient(135deg, #ff4444 0%, #cc3333 100%)";
          const originalText = this.textContent;
          this.textContent = "Copy failed!";

          setTimeout(() => {
            this.textContent = originalText;
            this.style.background = "";
          }, 2000);
        });
    });
  }

  // ===== DEMO WALKTHROUGH FEATURE ===== //
  let demoActive = false;

  function startDemoWalkthrough() {
    if (demoActive) return;
    demoActive = true;

    const steps = [
      {
        element: inputText,
        text: "Welcome to our website! Let me translate this for you.",
        highlight: "input-section",
        delay: 1000,
      },
      {
        element: languageSelector,
        text: null,
        highlight: "language-dropdown-container",
        action: () => {
          languageSelector.value = "spanish";
          languageSelector.dispatchEvent(new Event("change"));
        },
        delay: 1500,
      },
      {
        element: translateButton,
        text: null,
        highlight: "translate-button",
        action: () => {
          translateButton.click();
        },
        delay: 2000,
      },
    ];

    let currentStep = 0;

    function executeStep() {
      if (currentStep >= steps.length) {
        demoActive = false;
        document.querySelectorAll(".demo-highlight").forEach((el) => {
          el.classList.remove("demo-highlight");
        });
        return;
      }

      const step = steps[currentStep];

      // Remove previous highlight
      document.querySelectorAll(".demo-highlight").forEach((el) => {
        el.classList.remove("demo-highlight");
      });

      // Add highlight to current element
      const targetElement =
        document.querySelector(`.${step.highlight}`) || step.element;
      if (targetElement) {
        targetElement.classList.add("demo-highlight");
      }

      // Add text if first step
      if (step.text && step.element) {
        step.element.value = step.text;
        updateCounters(step.text);
      }

      // Execute action if present
      if (step.action) {
        setTimeout(step.action, 500);
      }

      currentStep++;
      setTimeout(executeStep, step.delay);
    }

    executeStep();
  }

  // Demo walkthrough for presentation
  window.startDemoWalkthrough = () => {
    startDemoWalkthrough();
  };

  // Add demo button to dashboard header
  const dashboardHeader = document.querySelector('.dashboard-header');
  if (dashboardHeader) {
    const demoButton = document.createElement('button');
    demoButton.className = 'cta-button';
    demoButton.style.marginTop = '1rem';
    demoButton.textContent = '🎬 Start Demo';
    demoButton.onclick = () => startDemoWalkthrough();
    dashboardHeader.appendChild(demoButton);
  }

  // Add CSS for demo highlighting
  if (!document.querySelector("#demo-highlight-style")) {
    const style = document.createElement("style");
    style.id = "demo-highlight-style";
    style.textContent = `
      .demo-highlight {
        animation: demoGlow 2s ease-in-out infinite;
        position: relative;
        z-index: 10;
      }
      
      @keyframes demoGlow {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 0 30px rgba(255, 68, 68, 0.8);
          transform: scale(1.02);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add shake animation to CSS if not present
  if (!document.querySelector("#shake-style")) {
    const style = document.createElement("style");
    style.id = "shake-style";
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== OTHER EXISTING FUNCTIONALITY ===== //

  // ===== OTHER EXISTING FUNCTIONALITY ===== //

  // Form submission
  const contactForm = document.querySelector(".contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you for your message! We'll get back to you soon.");
      this.reset();
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Login button functionality
  const headerLoginButton = document.querySelector("header .cta-button");
  if (headerLoginButton) {
    headerLoginButton.addEventListener("click", () => {
      alert("Login functionality would be implemented here.");
    });
  }

  // Try for Free button functionality
  const heroCtaButton = document.querySelector(".hero .cta-button");
  if (heroCtaButton) {
    heroCtaButton.addEventListener("click", () => {
      // Scroll to dashboard section
      const dashboard = document.querySelector("#dashboard");
      if (dashboard) {
        dashboard.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        alert("Free trial signup would be implemented here.");
      }
    });
  }

  // Add scroll effect to header
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = "rgba(0, 0, 0, 0.95)";
      } else {
        header.style.background = "rgba(0, 0, 0, 0.8)";
      }
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".step, .feature, .testimonial-card, .feature-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // Dashboard animation on scroll
  const dashboardSection = document.querySelector(".dashboard");
  if (dashboardSection) {
    const dashboardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate dashboard elements
            const translationPanel =
              entry.target.querySelector(".translation-panel");
            const features = entry.target.querySelectorAll(".feature-item");

            if (translationPanel) {
              translationPanel.style.opacity = "0";
              translationPanel.style.transform = "translateY(30px)";
              translationPanel.style.transition = "all 0.8s ease";

              setTimeout(() => {
                translationPanel.style.opacity = "1";
                translationPanel.style.transform = "translateY(0)";
              }, 200);
            }

            features.forEach((feature, index) => {
              feature.style.opacity = "0";
              feature.style.transform = "translateY(20px)";
              feature.style.transition = "all 0.6s ease";

              setTimeout(() => {
                feature.style.opacity = "1";
                feature.style.transform = "translateY(0)";
              }, 400 + index * 100);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    dashboardObserver.observe(dashboardSection);
  }

  // ===== KEYBOARD SHORTCUTS ===== //
  document.addEventListener("keydown", (e) => {
    // Ctrl + Enter to translate (when input is focused)
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === "Enter" &&
      inputText &&
      document.activeElement === inputText
    ) {
      e.preventDefault();
      if (translateButton && !translateButton.disabled) {
        translateButton.click();
      }
    }

    // Esc to clear (when dashboard elements are focused)
    if (e.key === "Escape" && clearButton) {
      const dashboardElements = [
        inputText,
        outputText,
        languageSelector,
        translateButton,
        clearButton,
      ];
      if (dashboardElements.includes(document.activeElement)) {
        clearButton.click();
      }
    }
  });

  // ===== ENHANCED ACCESSIBILITY ===== //
  // Add ARIA labels and improve keyboard navigation
  if (translateButton) {
    translateButton.setAttribute(
      "aria-label",
      "Translate text to selected language"
    );
  }

  if (clearButton) {
    clearButton.setAttribute("aria-label", "Clear input and output text");
  }

  if (copyButton) {
    copyButton.setAttribute("aria-label", "Copy translated text to clipboard");
  }

  if (languageSelector) {
    languageSelector.setAttribute(
      "aria-label",
      "Select target language for translation"
    );
  }

  // ===== SAMPLE TEXT SUGGESTIONS ===== //
  const sampleTexts = [
    "Welcome to our website",
    "Hello world",
    "How are you today?",
    "Thank you for your help",
    "Good morning everyone",
    "Please contact us for support",
    "We provide excellent service",
    "Innovation drives our success",
  ];

  // Add sample text functionality (double-click on input to get random sample)
  if (inputText) {
    inputText.addEventListener("dblclick", function () {
      if (this.value.trim() === "") {
        const randomText =
          sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        this.value = randomText;
        updateCounters(randomText);

        // Show hint
        this.style.backgroundColor = "rgba(74, 144, 226, 0.1)";
        setTimeout(() => {
          this.style.backgroundColor = "";
        }, 1000);
      }
    });

    // Add title for hint
    inputText.setAttribute("title", "Double-click for sample text when empty");
  }

  // ===== PERFORMANCE OPTIMIZATION ===== //
  // Debounce function for input events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Debounced counter update for better performance
  if (inputText) {
    const debouncedUpdateCounters = debounce(
      (text) => updateCounters(text),
      150
    );

    inputText.addEventListener("input", function () {
      debouncedUpdateCounters(this.value);
    });
  }

  // ===== ERROR HANDLING & USER FEEDBACK ===== //
  function showNotification(message, type = "info", duration = 3000) {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "1000",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    });

    // Set background color based on type
    const backgrounds = {
      success: "linear-gradient(135deg, #28a745, #20c997)",
      error: "linear-gradient(135deg, #dc3545, #e74c3c)",
      warning: "linear-gradient(135deg, #ffc107, #fd7e14)",
      info: "linear-gradient(135deg, #17a2b8, #6f42c1)",
    };
    notification.style.background = backgrounds[type] || backgrounds.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  // Add error handling to translation
  function handleTranslationError() {
    showNotification("Translation failed. Please try again.", "error");

    if (translateButton) {
      translateButton.disabled = false;
      const buttonText = translateButton.querySelector(".button-text");
      const buttonIcon = translateButton.querySelector(".button-icon");

      if (buttonText) buttonText.textContent = "Translate";
      if (buttonIcon) buttonIcon.textContent = "🌍";
      translateButton.style.background = "";
    }
  }

  // ===== WORD LIMIT WARNINGS ===== //
  const CHAR_WARNING_LIMIT = 800;
  const CHAR_MAX_LIMIT = 1000;

  function checkLimits(text) {
    const length = text.length;

    if (length > CHAR_MAX_LIMIT) {
      showNotification(
        `Character limit exceeded! Maximum ${CHAR_MAX_LIMIT} characters allowed.`,
        "warning"
      );
      if (translateButton) {
        translateButton.disabled = true;
      }
    } else if (length > CHAR_WARNING_LIMIT) {
      if (translateButton) {
        translateButton.disabled = false;
      }
    } else {
      if (translateButton) {
        translateButton.disabled = false;
      }
    }
  }

  // Add limit checking to input
  if (inputText) {
    inputText.addEventListener("input", function () {
      checkLimits(this.value);
    });
  }

  // ===== TRANSLATION HISTORY ===== //
  let currentPage = 1;
  const itemsPerPage = 5;
  let totalHistoryItems = 0;

  async function storeTranslationHistory(
    originalText,
    translatedText,
    targetLanguage
  ) {
    try {
      const response = await fetch("/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_text: originalText,
          translated_text: translatedText,
          target_language: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("[v0] Translation saved to database:", result.data?.id);

      // Refresh the history display
      await displayTranslationHistory();
    } catch (error) {
      console.error("[v0] Error saving translation to database:", error);
      showNotification("Failed to save translation to history", "error");
    }
  }

  async function displayTranslationHistory(page = 1) {
    const historyContent = document.getElementById("historyContent");
    if (!historyContent) return;

    try {
      const response = await fetch(`/api/history?page=${page}&limit=${itemsPerPage}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const history = result.data || [];
      totalHistoryItems = result.total || history.length;

      if (history.length === 0) {
        historyContent.innerHTML = `
          <div class="history-empty">
            <div class="empty-icon">📝</div>
            <p>No translations yet. Start translating to see your history here!</p>
          </div>
        `;
        return;
      }

      historyContent.innerHTML = history
        .map((item) => {
          const languageConfig = languageConfigs[item.target_language];
          const languageName = languageConfig
            ? languageConfig.name
            : item.target_language;
          const languageFlag = languageConfig ? languageConfig.flagEmoji : "🌍";

          // Enhanced timestamp formatting
          const timestamp = new Date(item.created_at);
          const now = new Date();
          const diffMs = now - timestamp;
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMs / 3600000);
          const diffDays = Math.floor(diffMs / 86400000);

          let timeAgo;
          if (diffMins < 1) {
            timeAgo = "Just now";
          } else if (diffMins < 60) {
            timeAgo = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
          } else if (diffHours < 24) {
            timeAgo = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
          } else if (diffDays < 7) {
            timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
          } else {
            timeAgo = timestamp.toLocaleDateString();
          }

          return `
          <div class="history-item" data-id="${item.id}">
            <div class="history-meta">
              <div class="history-language">
                <span>${languageFlag}</span>
                <span>English → ${languageName}</span>
              </div>
              <div class="history-timestamp" title="${timestamp.toLocaleString()}">${timeAgo}</div>
            </div>
            <div class="history-texts">
              <div class="history-original">${item.original_text}</div>
              <div class="history-arrow">→</div>
              <div class="history-translated">${item.translated_text}</div>
            </div>
            <div class="history-actions">
              <button class="history-copy-btn" onclick="copyHistoryText('${item.translated_text.replace(
                /'/g,
                "\\'"
              )}')">
                <span>📋</span> Copy
              </button>
              <button class="history-reuse-btn" onclick="reuseHistoryText('${item.original_text.replace(
                /'/g,
                "\\'"
              )}', '${item.target_language}')">
                <span>🔄</span> Reuse
              </button>
              <button class="history-delete-btn" onclick="deleteHistoryItem('${
                item.id
              }')">
                <span>🗑️</span> Delete
              </button>
            </div>
          </div>
        `;
        })
        .join("") + createPaginationControls();

    } catch (error) {
      console.error("[v0] Error fetching translation history:", error);
      historyContent.innerHTML = `
        <div class="history-empty">
          <div class="empty-icon">⚠️</div>
          <p>Failed to load translation history. Please try again later.</p>
        </div>
      `;
    }
  }

  function createPaginationControls() {
    const totalPages = Math.ceil(totalHistoryItems / itemsPerPage);
    if (totalPages <= 1) return "";

    return `
      <div class="pagination-controls">
        <button class="pagination-btn" onclick="loadHistoryPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>
          ← Previous
        </button>
        <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
        <button class="pagination-btn" onclick="loadHistoryPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>
          Next →
        </button>
      </div>
    `;
  }

  window.loadHistoryPage = async (page) => {
    if (page < 1) return;
    currentPage = page;
    await displayTranslationHistory(page);
  };

  window.deleteHistoryItem = async (itemId) => {
    if (confirm("Are you sure you want to delete this translation?")) {
      try {
        const response = await fetch(`/api/history?id=${itemId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("[v0] Translation deleted from database:", itemId);

        // Refresh the history display
        await displayTranslationHistory();
        showNotification("Translation deleted!", "success");
      } catch (error) {
        console.error("[v0] Error deleting translation:", error);
        showNotification("Failed to delete translation", "error");
      }
    }
  };

  async function clearTranslationHistory() {
    if (
      confirm(
        "Are you sure you want to clear all translation history? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch("/api/history/clear", {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("[v0] All translation history cleared from database");

        // Refresh the history display
        await displayTranslationHistory();
        showNotification("Translation history cleared!", "success");
      } catch (error) {
        console.error("[v0] Error clearing translation history:", error);
        showNotification("Failed to clear translation history", "error");
      }
    }
  }

  // Download history functionality
  window.downloadHistory = async () => {
    try {
      const response = await fetch("/api/history?export=true");
      if (!response.ok) {
        throw new Error("Failed to fetch history data");
      }
      
      const result = await response.json();
      const history = result.data || [];
      
      if (history.length === 0) {
        showNotification("No translation history to download", "warning");
        return;
      }
      
      // Create CSV content
      const csvContent = [
        "Date,Original Text,Translated Text,Target Language",
        ...history.map(item => 
          `"${new Date(item.created_at).toLocaleString()}","${item.original_text.replace(/"/g, '""')}","${item.translated_text.replace(/"/g, '""')}","${item.target_language}"`
        )
      ].join("\n");
      
      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `translation_history_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotification("Translation history downloaded successfully!", "success");
    } catch (error) {
      console.error("Error downloading history:", error);
      showNotification("Failed to download translation history", "error");
    }
  };

  // Copy history text functionality
  window.copyHistoryText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification("Text copied to clipboard!", "success");
    }).catch(() => {
      showNotification("Failed to copy text", "error");
    });
  };

  // Reuse history text functionality
  window.reuseHistoryText = (text, language) => {
    if (inputText) {
      inputText.value = text;
      updateCounters(text);
      inputText.focus();
      
      if (languageSelector && language !== currentLanguage) {
        languageSelector.value = language;
        languageSelector.dispatchEvent(new Event("change"));
      }
      
      showNotification("Text loaded for translation!", "success");
    }
  };

  // Initialize history display on page load
  displayTranslationHistory();

  console.log(
    "🌍 WebNew Translation Dashboard initialized with Week 11 optimizations!"
  );
  console.log("Features loaded:");
  console.log("✅ Multi-language support with 10 languages");
  console.log("✅ Live character and word counter");
  console.log("✅ Clear/Reset functionality");
  console.log("✅ Copy to clipboard");
  console.log("✅ Backend API integration with consistent response structure");
  console.log("✅ Translation history storage with pagination");
  console.log("✅ Enhanced responsive design");
  console.log("✅ Loading states and smooth animations");
  console.log("✅ Improved error handling with specific messages");
  console.log("✅ History download functionality (CSV export)");
  console.log("✅ Keyboard shortcuts (Ctrl+Enter to translate, Esc to clear)");
  console.log("✅ Sample text suggestions (double-click input when empty)");
  console.log("✅ Enhanced accessibility and user feedback");
  console.log("✅ Demo-ready presentation features");
});
