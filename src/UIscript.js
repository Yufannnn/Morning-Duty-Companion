// Typed header text (depends on typed.js from CDN).
document.addEventListener("DOMContentLoaded", () => {
  if (!window.Typed) return;
  // eslint-disable-next-line no-new
  new Typed("#typed-text", {
    strings: ["Morning Duty Companion"],
    typeSpeed: 80,
    startDelay: 1000,
    loop: false,
  });
});

