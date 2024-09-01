document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  const yearCounters = document.querySelectorAll(".year"); // Select elements with the 'year' class

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

  function convertToHindiNumerals(number) {
    return number.toString().replace(/\d/g, (digit) => arabicToHindiMap[digit]);
  }

  function containsHindiNumerals(text) {
    return /[\u0660-\u0669]/.test(text);
  }

  function formatWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatNumber(number, isHindi, isYear) {
    if (isYear) {
      // For years, do not include commas
      return isHindi ? convertToHindiNumerals(number) : number;
    }
    // For other numbers, format with commas if needed
    const formattedNumber = formatWithCommas(number);
    return isHindi ? convertToHindiNumerals(formattedNumber) : formattedNumber;
  }

  function animateCounter(element, start, end, duration, isHindi, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      let currentNumber;
      if (end % 1 === 0) {
        currentNumber = Math.floor(progress * (end - start) + start);
      } else {
        const decimalPlaces = end.toString().split(".")[1]?.length || 0;
        currentNumber = (progress * (end - start) + start).toFixed(
          decimalPlaces
        );
      }

      // Format the number with commas if needed
      const isYear = element.classList.contains("year");
      const formattedNumber = formatNumber(currentNumber, isHindi, isYear);

      // Display the number in the correct format with the suffix
      element.textContent = formattedNumber + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function startCounterAnimation(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const numericText = counter.textContent.match(
          /[\d\u0660-\u0669.,-]+/
        )[0]; // Keep both Arabic (Western) and Hindi numerals, along with commas and dots
        const suffix = counter.textContent.replace(numericText, ""); // Extract non-numeric part (e.g., %)

        const isHindi = containsHindiNumerals(numericText);
        const arabicText = isHindi
          ? numericText
              .replace(/[\u0660-\u0669]/g, (hindiDigit) => {
                return Object.keys(arabicToHindiMap).find(
                  (key) => arabicToHindiMap[key] === hindiDigit
                );
              })
              .replace(/,/g, "")
          : numericText.replace(/,/g, ""); // Remove commas for number parsing

        const endValue = parseFloat(arabicText);
        const isYear = counter.classList.contains("year"); // Check if it's a year

        animateCounter(counter, 0, endValue, 2000, isHindi, suffix); // Pass the suffix to keep it
        observer.unobserve(counter); // Stop observing once animation starts
      }
    });
  }

  // Set up Intersection Observer
  const observer = new IntersectionObserver(startCounterAnimation, {
    threshold: 0.1, // Adjust the threshold as needed
  });

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  yearCounters.forEach((yearCounter) => {
    observer.observe(yearCounter); // Observe year counters separately
  });
});
