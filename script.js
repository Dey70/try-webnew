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

  // Copy code functionality
  document.querySelector(".copy-button").addEventListener("click", copyCode);

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
      alert("Free trial signup would be implemented here.");
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
  document.querySelectorAll(".step, .feature").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});


//hamburger menu  toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });
});
