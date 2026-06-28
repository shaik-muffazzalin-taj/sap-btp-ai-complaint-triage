const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("video[data-fallback-src]").forEach((video) => {
  const source = video.querySelector("source");
  if (!source) {
    return;
  }

  video.addEventListener("error", () => {
    const fallbackSource = video.dataset.fallbackSrc;
    if (fallbackSource && source.src !== fallbackSource) {
      source.src = fallbackSource;
      video.load();
    }
  }, true);
});

console.log("SAP BTP Business AI Complaint Triage Phase 1 MVP portfolio loaded.");
