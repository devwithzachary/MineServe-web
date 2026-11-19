document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navInner = document.getElementById("nav-inner");
  if (menuBtn && navInner) {
    menuBtn.addEventListener("click", () => {
      const open = navInner.classList.toggle("mobile-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navInner.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navInner.classList.remove("mobile-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Interactive screenshot showcase
  const tabs = document.querySelectorAll(".showcase-tab");
  const stageImg = document.getElementById("showcase-img");
  if (tabs.length && stageImg) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const src = tab.getAttribute("data-src");
        const alt = tab.getAttribute("data-alt");
        if (src) stageImg.src = src;
        if (alt) stageImg.alt = alt;
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item .faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
});
