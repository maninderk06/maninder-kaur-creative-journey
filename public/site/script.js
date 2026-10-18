// ===== CONFIGURATION — update contact details here =====
const CONFIG = {
  // Add Maninder's real email here, e.g. "name@example.com". Leave empty to keep email disabled.
  EMAIL: "",
  INSTAGRAM_URL: "https://www.instagram.com/bhangalmxninder/",
  WHATSAPP_URL: "https://wa.me/918968781134",
};

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// Social links
document.querySelectorAll(".js-ig").forEach((a) => (a.href = CONFIG.INSTAGRAM_URL));
document.querySelectorAll(".js-wa").forEach((a) => (a.href = CONFIG.WHATSAPP_URL));

// Email: enabled only when a valid address is configured
const emailReady = isValidEmail(CONFIG.EMAIL);
document.querySelectorAll(".js-mail").forEach((a) => {
  if (emailReady) {
    a.href = "mailto:" + CONFIG.EMAIL;
  } else {
    a.removeAttribute("href");
    a.classList.add("is-disabled");
    a.setAttribute("aria-disabled", "true");
    a.setAttribute("aria-label", "Email (coming soon)");
    a.title = "Email coming soon";
  }
});
document.querySelectorAll(".js-mail-label").forEach((s) => (s.textContent = emailReady ? CONFIG.EMAIL : "Email Coming Soon"));

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Scroll state: nav shadow + back to top
const nav = document.getElementById("nav");
const toTop = document.getElementById("toTop");
const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
  toTop.classList.toggle("show", window.scrollY > 500);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Active nav highlighting
const links = [...navLinks.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Theme toggle (saved in localStorage)
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const syncThemeBtn = () => {
  const dark = root.getAttribute("data-theme") === "dark";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
};
syncThemeBtn();
themeBtn.addEventListener("click", () => {
  const dark = root.getAttribute("data-theme") !== "dark";
  if (dark) root.setAttribute("data-theme", "dark"); else root.removeAttribute("data-theme");
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  syncThemeBtn();
});
