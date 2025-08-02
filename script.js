// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", function () {
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
      const button = this;
      const originalText = button.textContent;

      button.textContent = "Translating...";
      button.style.background = "linear-gradient(45deg, #28ca42, #22a83a)";

      setTimeout(() => {
        button.textContent = "Complete!";
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = "";
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

  // Dashboard functionality
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const translateButton = document.getElementById("translateButton");
  const charCount = document.querySelector(".char-count");

  // Sample translations for demo purposes
  const translations = {
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
    "the quick brown fox jumps over the lazy dog":
      "le renard brun et rapide saute par-dessus le chien paresseux",
    "artificial intelligence": "intelligence artificielle",
    "machine learning": "apprentissage automatique",
    technology: "technologie",
    innovation: "innovation",
    "digital transformation": "transformation numérique",
    "data science": "science des données",
    "software development": "développement de logiciels",
    "web development": "développement web",
    "mobile app": "application mobile",
    "user experience": "expérience utilisateur",
    "customer service": "service client",
    "business strategy": "stratégie d'entreprise",
    "market research": "étude de marché",
    "global expansion": "expansion mondiale",
    "e-commerce": "commerce électronique",
  };

  // Character counter
  if (inputText && charCount) {
    inputText.addEventListener("input", function () {
      const count = this.value.length;
      charCount.textContent = `${count} characters`;
    });
  }

  // Translation functionality
  if (translateButton && inputText && outputText) {
    translateButton.addEventListener("click", function () {
      const text = inputText.value.trim();

      if (!text) {
        // Shake animation for empty input
        inputText.style.animation = "shake 0.5s ease-in-out";
        setTimeout(() => {
          inputText.style.animation = "";
        }, 500);
        return;
      }

      // Disable button and show loading state
      translateButton.disabled = true;
      const buttonText = translateButton.querySelector(".button-text");
      const buttonIcon = translateButton.querySelector(".button-icon");
      const originalText = buttonText.textContent;
      const originalIcon = buttonIcon.textContent;

      buttonText.textContent = "Translating...";
      buttonIcon.textContent = "⏳";

      // Clear output
      outputText.value = "";

      // Simulate translation delay
      setTimeout(() => {
        // Simple translation logic - check for exact matches first, then word-by-word
        let translation = translateText(text.toLowerCase());

        // Type out the translation with animation
        typeTranslation(translation, () => {
          // Re-enable button
          translateButton.disabled = false;
          buttonText.textContent = originalText;
          buttonIcon.textContent = originalIcon;
        });
      }, 1500);
    });
  }

  // Translation function
  function translateText(text) {
    // Check for exact match first
    if (translations[text]) {
      return translations[text];
    }

    // Word-by-word translation for unknown phrases
    const words = text.split(" ");
    const translatedWords = words.map((word) => {
      // Remove punctuation for lookup
      const cleanWord = word.replace(/[.,!?;:"'()]/g, "");
      const punctuation = word.replace(cleanWord, "");

      // Look up the clean word
      const translatedWord =
        translations[cleanWord] || generateMockTranslation(cleanWord);

      return translatedWord + punctuation;
    });

    return translatedWords.join(" ");
  }

  // Generate mock French-like translation for unknown words
  function generateMockTranslation(word) {
    const frenchSuffixes = ["é", "er", "tion", "ique", "eux", "euse", "ment"];
    const frenchPrefixes = ["dé", "pré", "sur", "sous", "anti", "inter"];

    if (word.length < 3) return word;

    // Simple transformation rules
    let translated = word;

    // Add French suffix
    if (Math.random() > 0.5) {
      const suffix =
        frenchSuffixes[Math.floor(Math.random() * frenchSuffixes.length)];
      translated = word.slice(0, -1) + suffix;
    }

    // Add French prefix occasionally
    if (Math.random() > 0.8) {
      const prefix =
        frenchPrefixes[Math.floor(Math.random() * frenchPrefixes.length)];
      translated = prefix + translated;
    }

    return translated;
  }

  // Typing animation for translation output
  function typeTranslation(text, callback) {
    let i = 0;
    const typeSpeed = 30; // milliseconds per character

    function typeChar() {
      if (i < text.length) {
        outputText.value += text.charAt(i);
        i++;
        setTimeout(typeChar, typeSpeed);
      } else {
        if (callback) callback();
      }
    }

    typeChar();
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

  // Copy code functionality (if copy button exists)
  const copyButton = document.querySelector(".copy-button");
  if (copyButton) {
    copyButton.addEventListener("click", copyCode);
  }

  function copyCode() {
    const code = '<script src="https://cdn.webnew.com/webnew.js"></script>';
    navigator.clipboard.writeText(code).then(() => {
      const button = document.querySelector(".copy-button");
      const originalText = button.textContent;
      button.textContent = "Copied!";
      button.style.background = "#4ade80";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
      }, 2000);
    });
  }

  // Form submission
  document
    .querySelector(".contact form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you for your message! We'll get back to you soon.");
      this.reset();
    });

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
  document
    .querySelector("header .cta-button")
    .addEventListener("click", function () {
      alert("Login functionality would be implemented here.");
    });

  // Try for Free button functionality
  document
    .querySelector(".hero .cta-button")
    .addEventListener("click", function () {
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

  // Add scroll effect to header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
      header.style.background = "rgba(0, 0, 0, 0.8)";
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
});
