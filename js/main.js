// Countdown Timer
let countDownDate = new Date("May 31, 2025 23:59:59").getTime();

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();

  // Find The Date Difference Between Now And Countdown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Skills section
  const skillsSection = document.querySelector("#our-skills");
  const progressSpans = document.querySelectorAll(".the-progress span");

  // Stats section
  const statsSection = document.querySelector(".stats");
  const numberElements = document.querySelectorAll(".stats .number");

  // Flags to ensure animations only run once
  let skillsAnimated = false;
  let statsAnimated = false;

  // Function to check if element is in viewport
  function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to animate skills progress bars
  function animateSkills() {
    if (skillsAnimated) return;

    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });

    skillsAnimated = true;
  }

  // Function to start counting for stats
  function startCount(el) {
    const goal = parseInt(el.dataset.goal);
    let current = 0;
    const duration = 2000; // 2 seconds
    const steps = 50; // Number of steps to reach goal
    const increment = Math.ceil(goal / steps);
    const interval = duration / steps;

    const counter = setInterval(() => {
      current += increment;

      if (current >= goal) {
        el.textContent = goal;
        clearInterval(counter);
      } else {
        el.textContent = current;
      }
    }, interval);
  }

  // Function to animate stats counters
  function animateStats() {
    if (statsAnimated) return;

    numberElements.forEach((num) => {
      startCount(num);
    });

    statsAnimated = true;
  }

  // Scroll event handler
  window.addEventListener("scroll", function () {
    // Check skills section
    if (isInViewport(skillsSection)) {
      animateSkills();
    }

    // Check stats section
    if (isInViewport(statsSection)) {
      animateStats();
    }
  });

  // Check on initial load as well
  if (isInViewport(skillsSection)) {
    animateSkills();
  }

  if (isInViewport(statsSection)) {
    animateStats();
  }
});
