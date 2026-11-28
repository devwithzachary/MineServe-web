document.addEventListener("DOMContentLoaded", () => {
  // Brand asset SVG fallback (assets/logo.svg -> assets/logo.png)
  document.querySelectorAll("img[data-fallback-src]").forEach((img) => {
    img.addEventListener("error", () => {
      const fallback = img.getAttribute("data-fallback-src");
      if (fallback && img.getAttribute("src") !== fallback) {
        img.setAttribute("src", fallback);
      }
    });
  });

  // Sticky M3 top bar scroll state (surface -> surfaceContainerLow)
  const siteHeader = document.getElementById("site-header");
  const syncHeaderScroll = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle("scrolled", window.scrollY > 12);
  };
  syncHeaderScroll();
  window.addEventListener("scroll", syncHeaderScroll, { passive: true });

  // Light / Dark M3 theme toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");

  const applyTheme = (theme) => {
    const resolved = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = resolved;
    try {
      localStorage.setItem("mineserve_web_theme", resolved);
    } catch (_) { /* Ignore unavailable browser storage */ }
    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle("hidden", resolved === "light");
      moonIcon.classList.toggle("hidden", resolved === "dark");
    }
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        resolved === "light" ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  };

  applyTheme(document.documentElement.dataset.theme || "dark");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }

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

  // OS detection for Hero CTA, platform chips, and Download Hub tab
  const detectOS = () => {
    const ua = (navigator.userAgent || "").toLowerCase();
    const plat = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();
    if (ua.includes("android")) return "android";
    if (plat.includes("win") || ua.includes("windows")) return "windows";
    if (plat.includes("mac") || ua.includes("macintosh") || ua.includes("mac os")) return "macos";
    return "linux";
  };

  const detectedOs = detectOS();
  const osConfig = {
    linux: { label: "Download for Linux", href: "#download", tab: "linux" },
    windows: { label: "Download for Windows", href: "#download", tab: "windows" },
    macos: { label: "Download for macOS", href: "#download", tab: "macos" },
    android: {
      label: "Get on Google Play",
      href: "https://play.google.com/store/apps/details?id=com.devwithzachary.mineserve",
      tab: "android",
      external: true
    }
  };

  const heroPrimary = document.getElementById("hero-primary-download");
  const heroPrimaryLabel = document.getElementById("hero-primary-label");
  const activeOs = osConfig[detectedOs] || osConfig.linux;
  if (heroPrimary && heroPrimaryLabel) {
    heroPrimaryLabel.textContent = activeOs.label;
    heroPrimary.setAttribute("href", activeOs.href);
    if (activeOs.external) {
      heroPrimary.setAttribute("target", "_blank");
      heroPrimary.setAttribute("rel", "noopener noreferrer");
    }
  }

  document.querySelectorAll("[data-os-chip]").forEach((chip) => {
    chip.classList.toggle("is-detected", chip.getAttribute("data-os-chip") === detectedOs);
  });

  // Download platform tabs
  const downloadTabs = document.querySelectorAll("[data-download-tab]");
  const downloadPanels = {
    linux: document.getElementById("download-panel-linux"),
    windows: document.getElementById("download-panel-windows"),
    macos: document.getElementById("download-panel-macos"),
    android: document.getElementById("download-panel-android"),
    docker: document.getElementById("download-panel-docker")
  };

  const selectDownloadTab = (tabName) => {
    downloadTabs.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-download-tab") === tabName);
    });
    Object.entries(downloadPanels).forEach(([key, panel]) => {
      if (panel) panel.classList.toggle("active", key === tabName);
    });
  };

  downloadTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-download-tab");
      if (target) selectDownloadTab(target);
    });
  });

  document.querySelectorAll("[data-select-download]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.getAttribute("data-select-download");
      if (target) selectDownloadTab(target);
    });
  });

  selectDownloadTab(activeOs.tab);

  // Interactive 28px-radius Screenshot Switcher (Desktop, Android, Headless WebUI)
  const platformTabs = document.querySelectorAll("[data-platform]");
  const stageImg = document.getElementById("showcase-img");
  const stageFallback = document.getElementById("showcase-fallback");
  const fallbackTitle = document.getElementById("showcase-fallback-title");
  const fallbackDesc = document.getElementById("showcase-fallback-desc");
  const fallbackPath = document.getElementById("showcase-fallback-path");
  const captionEl = document.getElementById("showcase-caption");
  const androidSubtabsWrap = document.getElementById("showcase-android-subtabs");
  const androidSubchips = document.querySelectorAll(".showcase-subchip");

  const showcaseMeta = {
    desktop: {
      src: "assets/screenshots/desktop.png",
      alt: "MineServe Desktop Studio Workspace",
      caption: "Native KMP Desktop Studio: 280dp drawer, inline LAN/Tunnel chips, and 6-tab server workspace.",
      slotTitle: "Desktop Studio Screenshot Slot",
      slotDesc: "Drop a real Compose Multiplatform Desktop screenshot into this slot to display it automatically.",
      slotPath: "assets/screenshots/desktop.png"
    },
    android: {
      src: "assets/screenshots/dashboard.png",
      alt: "MineServe Android Dashboard",
      caption: "Rootless Android Studio: manage Paper, Modded, Bedrock, and Proxy instances on-device.",
      slotTitle: "Android Screenshot Slot",
      slotDesc: "Android screenshots are loaded from assets/screenshots/.",
      slotPath: "assets/screenshots/dashboard.png"
    },
    webui: {
      src: "assets/screenshots/webui.png",
      alt: "MineServe Headless WebUI",
      caption: "Headless WebUI (:8080): 1:1 Material Design 3 browser panel with RBAC, live SSE logs, and file editor.",
      slotTitle: "Headless WebUI Screenshot Slot",
      slotDesc: "Drop a real Headless WebUI browser screenshot into this slot to display it automatically.",
      slotPath: "assets/screenshots/webui.png"
    }
  };

  const setStageImage = (src, alt) => {
    if (!stageImg || !stageFallback) return;
    stageFallback.classList.add("hidden");
    stageImg.classList.remove("hidden");
    stageImg.alt = alt;
    stageImg.src = src;
  };

  if (stageImg && stageFallback) {
    stageImg.addEventListener("load", () => {
      stageFallback.classList.add("hidden");
      stageImg.classList.remove("hidden");
    });
    stageImg.addEventListener("error", () => {
      stageImg.classList.add("hidden");
      stageFallback.classList.remove("hidden");
    });
  }

  platformTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-platform");
      const meta = showcaseMeta[key];
      if (!meta) return;

      platformTabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      if (captionEl) captionEl.textContent = meta.caption;
      if (fallbackTitle) fallbackTitle.textContent = meta.slotTitle;
      if (fallbackDesc) fallbackDesc.textContent = meta.slotDesc;
      if (fallbackPath) fallbackPath.textContent = meta.slotPath;
      if (androidSubtabsWrap) {
        androidSubtabsWrap.classList.toggle("hidden", key !== "android");
      }

      if (key === "android") {
        const activeSub = document.querySelector(".showcase-subchip.active");
        const subSrc = activeSub?.getAttribute("data-src") || meta.src;
        const subAlt = activeSub?.getAttribute("data-alt") || meta.alt;
        setStageImage(subSrc, subAlt);
      } else {
        setStageImage(meta.src, meta.alt);
      }
    });
  });

  androidSubchips.forEach((chip) => {
    chip.addEventListener("click", () => {
      androidSubchips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const src = chip.getAttribute("data-src");
      const alt = chip.getAttribute("data-alt") || "MineServe Android Screen";
      if (src) setStageImage(src, alt);
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item .faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("open");
        const sign = i.querySelector(".faq-q span:last-child");
        if (sign) sign.textContent = "+";
      });
      if (!isOpen) {
        item.classList.add("open");
        const sign = item.querySelector(".faq-q span:last-child");
        if (sign) sign.textContent = "-";
      }
    });
  });

  // Copy command buttons for Linux 1-line installer snippets
  document.querySelectorAll(".copy-cmd-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-copy");
      if (!cmd) return;
      navigator.clipboard.writeText(cmd).then(() => {
        const prev = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = prev;
        }, 1800);
      });
    });
  });

  // Localized pricing display (matching Stripe Adaptive Pricing estimates)
  const pricingTable = {
    GBP: { code: "GBP", free: "£0", plus: "£2.99", plusYearly: "£29.99", pro: "£6.99", proYearly: "£69.99" },
    USD: { code: "USD", free: "$0", plus: "$3.99", plusYearly: "$39.99", pro: "$8.99", proYearly: "$89.99" },
    EUR: { code: "EUR", free: "€0", plus: "€3.49", plusYearly: "€34.99", pro: "€7.99", proYearly: "€79.99" },
    CAD: { code: "CAD", free: "CA$0", plus: "CA$5.49", plusYearly: "CA$54.99", pro: "CA$12.49", proYearly: "CA$124.99" },
    AUD: { code: "AUD", free: "A$0", plus: "A$5.99", plusYearly: "A$59.99", pro: "A$13.99", proYearly: "A$139.99" },
    NZD: { code: "NZD", free: "NZ$0", plus: "NZ$6.49", plusYearly: "NZ$64.99", pro: "NZ$14.99", proYearly: "NZ$149.99" },
    BRL: { code: "BRL", free: "R$0", plus: "R$21.90", plusYearly: "R$219", pro: "R$49.90", proYearly: "R$499" },
    INR: { code: "INR", free: "₹0", plus: "₹319", plusYearly: "₹3,190", pro: "₹749", proYearly: "₹7,490" },
    JPY: { code: "JPY", free: "¥0", plus: "¥590", plusYearly: "¥5,900", pro: "¥1,390", proYearly: "¥13,900" },
    PLN: { code: "PLN", free: "0 zł", plus: "14.99 zł", plusYearly: "149.99 zł", pro: "34.99 zł", proYearly: "349.99 zł" },
    SEK: { code: "SEK", free: "0 kr", plus: "39 kr", plusYearly: "399 kr", pro: "89 kr", proYearly: "899 kr" }
  };

  function detectWebPricing() {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
    const lang = (navigator.language || "en-GB").toUpperCase();
    const region = lang.includes("-") ? lang.split("-").pop() : "";
    const euroRegions = new Set(["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"]);

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
  const periodPlusEl = document.getElementById("web-period-plus");
  const periodProEl = document.getElementById("web-period-pro");
  const toggleMonthlyBtn = document.getElementById("web-toggle-monthly");
  const toggleYearlyBtn = document.getElementById("web-toggle-yearly");
  const noteEl = document.getElementById("web-currency-note");

  function renderWebPricing(interval) {
    const isYearly = interval === "yearly";
    if (freeEl) freeEl.textContent = p.free;
    if (plusEl) plusEl.textContent = isYearly ? p.plusYearly : p.plus;
    if (proEl) proEl.textContent = isYearly ? p.proYearly : p.pro;
    if (periodPlusEl) periodPlusEl.textContent = isYearly ? "/ year" : "/ month";
    if (periodProEl) periodProEl.textContent = isYearly ? "/ year" : "/ month";
    if (toggleMonthlyBtn) {
      toggleMonthlyBtn.classList.toggle("active", !isYearly);
      toggleMonthlyBtn.setAttribute("aria-selected", !isYearly ? "true" : "false");
    }
    if (toggleYearlyBtn) {
      toggleYearlyBtn.classList.toggle("active", isYearly);
      toggleYearlyBtn.setAttribute("aria-selected", isYearly ? "true" : "false");
    }
  }

  renderWebPricing("monthly");
  if (toggleMonthlyBtn) {
    toggleMonthlyBtn.addEventListener("click", () => renderWebPricing("monthly"));
  }
  if (toggleYearlyBtn) {
    toggleYearlyBtn.addEventListener("click", () => renderWebPricing("yearly"));
  }
  if (noteEl && p.code !== "GBP") {
    noteEl.textContent = `Estimated local pricing (${p.code}) - Stripe Checkout confirms your exact local currency.`;
    noteEl.classList.remove("hidden");
  }

  // Resolve 1-click GitHub Release asset download URLs (cached in sessionStorage for 10 min)
  const applyReleaseAssets = (releases) => {
    if (!Array.isArray(releases) || releases.length === 0) return;
    const stable = releases.find((r) => !r.draft && !r.prerelease) || null;
    const pre = releases.find((r) => !r.draft && r.prerelease) || null;

    document.querySelectorAll("a[data-asset-match]").forEach((link) => {
      const pattern = link.getAttribute("data-asset-match");
      if (!pattern) return;
      const re = new RegExp(pattern, "i");
      const allowPre = link.getAttribute("data-allow-prerelease") === "true";

      let matchedRelease = stable;
      let asset = stable?.assets?.find((a) => re.test(a.name)) || null;
      if (!asset && allowPre && pre) {
        matchedRelease = pre;
        asset = pre.assets?.find((a) => re.test(a.name)) || null;
      }

      if (asset && asset.browser_download_url) {
        link.setAttribute("href", asset.browser_download_url);
        if (matchedRelease?.prerelease && !link.textContent.includes(matchedRelease.tag_name)) {
          link.textContent = `${link.textContent.trim()} (${matchedRelease.tag_name})`;
        }
      }
    });
  };

  const CACHE_KEY = "mineserve_gh_releases_v1";
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.ts < 10 * 60 * 1000) {
      applyReleaseAssets(cached.data);
      return;
    }
  } catch (_) { /* Ignore unavailable browser storage */ }

  fetch("https://api.github.com/repos/devwithzachary/MineServe/releases?per_page=5")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!Array.isArray(data)) return;
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
      } catch (_) { /* Ignore unavailable browser storage */ }
      applyReleaseAssets(data);
    })
    .catch(() => {});
});
