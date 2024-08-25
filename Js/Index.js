//

function convertToHindiNumerals(text) {
  const arabicToHindiMap = {
    0: "٠",
    1: "١",
    2: "۲",
    3: "۳",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  return text.replace(/[0-9]/g, function (match) {
    return arabicToHindiMap[match];
  });
}

function convertNumbersInElement(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    element.textContent = convertToHindiNumerals(element.textContent);
  } else if (element.nodeType === Node.ELEMENT_NODE) {
    for (const child of element.childNodes) {
      convertNumbersInElement(child);
    }
  }
}

// Convert numbers in the entire document
convertNumbersInElement(document.body);

//

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
