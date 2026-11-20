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

  // Localized pricing display (matching Stripe Adaptive Pricing estimates)
  const pricingTable = {
    GBP: { code: "GBP", free: "£0", plus: "£2.99", pro: "£6.99" },
    USD: { code: "USD", free: "$0", plus: "$3.99", pro: "$8.99" },
    EUR: { code: "EUR", free: "€0", plus: "€3.49", pro: "€7.99" },
    CAD: { code: "CAD", free: "CA$0", plus: "CA$5.49", pro: "CA$12.49" },
    AUD: { code: "AUD", free: "A$0", plus: "A$5.99", pro: "A$13.99" },
    NZD: { code: "NZD", free: "NZ$0", plus: "NZ$6.49", pro: "NZ$14.99" },
    BRL: { code: "BRL", free: "R$0", plus: "R$21.90", pro: "R$49.90" },
    INR: { code: "INR", free: "₹0", plus: "₹319", pro: "₹749" },
    JPY: { code: "JPY", free: "¥0", plus: "¥590", pro: "¥1,390" },
    PLN: { code: "PLN", free: "0 zł", plus: "14.99 zł", pro: "34.99 zł" },
    SEK: { code: "SEK", free: "0 kr", plus: "39 kr", pro: "89 kr" }
  };

  function detectWebPricing() {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
    const lang = (navigator.language || "en-GB").toUpperCase();
    const region = lang.includes("-") ? lang.split("-").pop() : "";
    const euroRegions = new Set(["AT","BE","CY","DE","EE","ES","FI","FR","GR","HR","IE","IT","LT","LU","LV","MT","NL","PT","SI","SK"]);

    if (tz === "europe/london" || region === "GB" || region === "UK") return pricingTable.GBP;
    if (tz.startsWith("america/toronto") || tz.startsWith("america/vancouver") || tz.startsWith("america/montreal") || region === "CA") return pricingTable.CAD;
    if (tz.startsWith("australia/") || region === "AU") return pricingTable.AUD;
    if (tz.startsWith("pacific/auckland") || region === "NZ") return pricingTable.NZD;
    if (tz.startsWith("america/sao_paulo") || region === "BR") return pricingTable.BRL;
    if (tz.startsWith("asia/kolkata") || tz.startsWith("asia/calcutta") || region === "IN") return pricingTable.INR;
    if (tz.startsWith("asia/tokyo") || region === "JP") return pricingTable.JPY;
    if (tz.startsWith("europe/warsaw") || region === "PL") return pricingTable.PLN;
    if (tz.startsWith("europe/stockholm") || region === "SE") return pricingTable.SEK;
    if (euroRegions.has(region) || (tz.startsWith("europe/") && !tz.includes("london") && !tz.includes("warsaw") && !tz.includes("stockholm"))) return pricingTable.EUR;
    if (tz.startsWith("america/") || region === "US") return pricingTable.USD;
    return pricingTable.GBP;
  }

  const p = detectWebPricing();
  const freeEl = document.getElementById("web-price-free");
  const plusEl = document.getElementById("web-price-plus");
  const proEl = document.getElementById("web-price-pro");
  const noteEl = document.getElementById("web-currency-note");
  if (freeEl) freeEl.textContent = p.free;
  if (plusEl) plusEl.textContent = p.plus;
  if (proEl) proEl.textContent = p.pro;
  if (noteEl && p.code !== "GBP") {
    noteEl.textContent = `Estimated local pricing (${p.code}) - Stripe Checkout confirms your exact local currency.`;
    noteEl.style.display = "block";
  }
});
