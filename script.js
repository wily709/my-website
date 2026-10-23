
"use strict";

// 1. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// 2. Animated job title
const typedText = document.getElementById("typedText");

const titles = [
  "Aspiring Developer",
  "ICT Professional",
  "Problem Solver"
];

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function animateTitle() {
  const currentTitle = titles[titleIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typedText.textContent = currentTitle.slice(0, characterIndex);

  let delay = deleting ? 45 : 90;

  if (!deleting && characterIndex === currentTitle.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 350;
  }

  setTimeout(animateTitle, delay);
}

animateTitle();

// 3. Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => element.classList.add("visible"));
}

// 4. Automatically display the current year
document.getElementById("year").textContent =
  new Date().getFullYear();

// 5. Contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Replace this with your own email address before publishing
const contactEmail = "YOUR_EMAIL@example.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  if (contactEmail === "YOUR_EMAIL@example.com") {
    formStatus.textContent =
      "Please configure your email address in script.js first.";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(
    `Portfolio enquiry from ${name}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formStatus.textContent =
    "Opening your email application. Send the message there to complete delivery.";

  window.location.href =
    `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
