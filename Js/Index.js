document.addEventListener("DOMContentLoaded", function () {
  const languageToggles = document.querySelectorAll(".toggle-btn"); // Select all toggle buttons
  const body = document.body;
  const contentElements = document.querySelectorAll("[data-en]");

  // Store original Arabic inner HTML including attributes
  const originalContent = new Map();
  contentElements.forEach((element) => {
    originalContent.set(element, {
      html: element.innerHTML,
      aos: {
        fade: element.getAttribute("data-aos"),
        duration: element.getAttribute("data-aos-duration"),
      },
    });
  });

  // Check localStorage for saved language preference
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage) {
    setLanguage(savedLanguage);
  } else {
    // Set default language if none is saved
    setLanguage("en");
  }

  // Add event listeners to all toggle buttons
  languageToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const currentLang = body.classList.contains("english") ? "en" : "ar";
      const newLang = currentLang === "en" ? "ar" : "en";
      setLanguage(newLang);
    });
  });

  function setLanguage(language) {
    if (language === "en") {
      body.classList.add("english");
      languageToggles.forEach((toggle) => {
        toggle.querySelector("span").textContent = "عربي";
      });
      body.setAttribute("lang", "en");
      body.setAttribute("dir", "ltr");
    } else {
      body.classList.remove("english");
      languageToggles.forEach((toggle) => {
        toggle.querySelector("span").textContent = "English";
      });
      body.setAttribute("lang", "ar");
      body.setAttribute("dir", "rtl");
    }
    updateContent(language);
    localStorage.setItem("preferredLanguage", language);
  }

  function updateContent(language) {
    contentElements.forEach((element) => {
      if (language === "en") {
        element.innerHTML = element.getAttribute("data-en");
        element.classList.add("english");
      } else {
        const original = originalContent.get(element);
        element.innerHTML = original.html;
        element.setAttribute("data-aos", original.aos.fade);
        element.setAttribute("data-aos-duration", original.aos.duration);
        element.classList.remove("english");
      }
    });
    // Reinitialize AOS
    AOS.refresh();

    // Convert numbers based on the language
    convertNumbersInElement(document.body);
  }

  function convertToHindiNumerals(text) {
    const arabicToHindiMap = {
      0: "\u0660", // ٠
      1: "\u0661", // ١
      2: "\u0662", // ٢
      3: "\u0663", // ٣
      4: "\u0664", // ٤
      5: "\u0665", // ٥
      6: "\u0666", // ٦
      7: "\u0667", // ٧
      8: "\u0668", // ٨
      9: "\u0669", // ٩
    };
    return text.replace(/[0-9]/g, (match) => arabicToHindiMap[match]);
  }

  function convertToArabicNumerals(text) {
    const hindiToArabicMap = {
      "\u0660": 0, // ٠
      "\u0661": 1, // ١
      "\u0662": 2, // ٢
      "\u0663": 3, // ٣
      "\u0664": 4, // ٤
      "\u0665": 5, // ٥
      "\u0666": 6, // ٦
      "\u0667": 7, // ٧
      "\u0668": 8, // ٨
      "\u0669": 9, // ٩
    };
    return text.replace(/[\u0660-\u0669]/g, (match) => hindiToArabicMap[match]);
  }

  function convertNumbersInElement(element) {
    const currentLanguage = body.getAttribute("lang");

    if (element.nodeType === Node.TEXT_NODE) {
      if (currentLanguage === "ar") {
        element.textContent = convertToHindiNumerals(element.textContent);
      } else {
        element.textContent = convertToArabicNumerals(element.textContent);
      }
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      for (const child of element.childNodes) {
        convertNumbersInElement(child);
      }
    }
  }
});

// navbar

$(document).ready(function () {
  // Handle navbar toggler click
  $(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
  });

  // Initial setup
  handleResize();

  // Debounced resize handler
  let resizeTimeout;
  $(window).resize(function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
  });
});

// Cache selectors
const $subMenus = $(".sub-menu");
const $menuLinks = $(".menu-link");

// Handle resize
function handleResize() {
  if ($(window).innerWidth() <= 992) {
    // Bind click event to menu links for small screens
    $menuLinks.off("click").on("click", function (e) {
      const $submenu = $(this).next(".sub-menu");
      if ($submenu.length) {
        e.preventDefault(); // Prevent default action only if there is a submenu
        $submenu.slideToggle();
      }
    });
  } else {
    // Unbind click event for larger screens
    $menuLinks.off("click");
    // Reset sub-menus display
    $subMenus.each(function () {
      $(this).css("display", "");
    });
  }
}

// Prevent default action for menu links only if they have a submenu
$menuLinks.each(function () {
  const $submenu = $(this).next(".sub-menu");
  if (!$submenu.length) {
    $(this)
      .off("click")
      .on("click", function (e) {
        window.location.href = $(this).attr("href"); // Ensure navigation happens
      });
  }
});

// Header Ends

// pie chart

// Bar chart

// Function to animate progress bars when they come into view
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((progressBar) => {
    const progress = progressBar.querySelector(".progress");
    const progressValue = progressBar.getAttribute("data-value");
    const progressBarTop = progressBar.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    if (progressBarTop < windowHeight) {
      progress.style.height = progressValue + "%";
    }
  });
}

// Initial animation when page loads
animateProgressBars();

// Event listener to animate progress bars on scroll
window.addEventListener("scroll", animateProgressBars);


