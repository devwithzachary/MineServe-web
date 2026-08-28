/**
 * MineServe Landing Page - Interactive Showcase, Sticky Bar & Mobile Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initShowcaseTabs();
  initStickyMobileBar();
  initFaqTracking();
});

// Mobile Navigation Drawer Controller
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close on backdrop tap
  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close on link click
  drawer.querySelectorAll('.mobile-nav-link, .mobile-btn-group a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// Showcase Tabs Data
const showcaseData = {
  dashboard: {
    tag: 'DASHBOARD & TELEMETRY',
    heading: 'Real-Time Server Hub',
    img: 'assets/screenshots/dashboard.png',
    desc: 'Instantly view active servers, allocated RAM, resident memory consumption via /proc, live player counts, and LAN connection status. Start, stop, or open terminal sessions with a single tap.',
    bullets: [
      '<strong>Live Metrics:</strong> Active RAM, CPU usage, and per-server storage footprints.',
      '<strong>1-Tap Actions:</strong> Immediate Start, Stop, and Live Console buttons.',
      '<strong>Persistent Foreground Service:</strong> Active servers remain online when switching apps or locking your phone.'
    ]
  },
  wizard: {
    tag: 'CREATION WIZARD',
    heading: '4-Step Server Setup',
    img: 'assets/screenshots/wizard_step2.png',
    desc: 'Effortlessly create PaperMC, Purpur, Fabric, NeoForge, or Vanilla servers. The wizard automatically resolves matching Minecraft versions and suggests conflict-free port numbers.',
    bullets: [
      '<strong>Inline Version Selector:</strong> Pick from latest release builds or snapshots.',
      '<strong>Bedrock Cross-Play:</strong> 1-tap Paper + GeyserMC preset for console & mobile players.',
      '<strong>RAM Allocation:</strong> Fine-tune RAM using both an interactive slider and precise manual MB input.'
    ]
  },
  console: {
    tag: 'LIVE TERMINAL',
    heading: 'Interactive POSIX Terminal',
    img: 'assets/screenshots/console.png',
    desc: 'Native JNI pseudo-terminal (PTY) with full ANSI colors, colored log streaming, auto-scroll, and quick command chips for fast server management.',
    bullets: [
      '<strong>Quick Commands:</strong> Instant chips for <code>/op</code>, <code>/deop</code>, <code>/whitelist</code>, and <code>/save-all</code>.',
      '<strong>Persistent LAN Address:</strong> Direct copy-to-clipboard LAN IP address card right above the console.',
      '<strong>Standard Input:</strong> Type and send any Minecraft server command directly.'
    ]
  },
  'settings-tab': {
    tag: 'SERVER PROPERTIES',
    heading: 'Visual & Raw Config Editor',
    img: 'assets/screenshots/settings_tab.png',
    desc: 'Customize game mechanics without messing with text files, or switch to the raw in-app editor for complete server.properties and YAML editing.',
    bullets: [
      '<strong>Visual Switches:</strong> PVP, difficulty, game mode, flight, whitelist, and spawn rules.',
      '<strong>World Settings:</strong> Custom seed, level name, view distance, and simulation distance.',
      '<strong>Raw YAML/Config Editor:</strong> Direct editing of paper-global.yml, purpur.yml, and server.properties.'
    ]
  },
  plugins: {
    tag: 'MODRINTH INTEGRATION',
    heading: 'Search, Browse & 1-Tap Install',
    img: 'assets/screenshots/plugins_tab.png',
    desc: 'Engine-aware plugin and mod management. Search thousands of projects on Modrinth, view descriptions and author credits, or upload your own custom .jar files.',
    bullets: [
      '<strong>Context Aware:</strong> Automatically displays "Plugins" for Paper/Purpur and "Mods" for Fabric/NeoForge.',
      '<strong>Modrinth API:</strong> Searches compatible versions for your specific server release.',
      '<strong>Custom .JAR Upload:</strong> Import any plugin or mod directly from your Android device storage.'
    ]
  },
  runtimes: {
    tag: 'RUNTIME ENVIRONMENT',
    heading: 'Isolated OpenJDK 8-25',
    img: 'assets/screenshots/settings.png',
    desc: 'MineServe installs and isolates official OpenJDK runtimes inside the container sandbox, ensuring exact version compatibility with your Minecraft world.',
    bullets: [
      '<strong>Multi-Java Support:</strong> Java 25 (Modern 1.21.4+), Java 21, Java 17, and Java 8 (Legacy 1.12.2).',
      '<strong>Ubuntu 24.04 Rootfs:</strong> Clean, isolated Linux user-space environment.',
      '<strong>Storage Diagnostics:</strong> Live container footprint and 1-tap runtime reinstallation if needed.'
    ]
  }
};

// Showcase Tabs Controller
function initShowcaseTabs() {
  const tabs = document.querySelectorAll('.showcase-tab');
  const imgEl = document.getElementById('showcase-img');
  const tagEl = document.getElementById('showcase-tag');
  const headingEl = document.getElementById('showcase-heading');
  const descEl = document.getElementById('showcase-desc');
  const bulletsEl = document.getElementById('showcase-bullets');

  if (!tabs.length || !imgEl || !tagEl || !headingEl || !descEl || !bulletsEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      const data = showcaseData[target];

      if (!data) return;

      // Update active state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Scroll tab into view horizontally on mobile
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      // Animate transition
      imgEl.style.opacity = '0.3';
      setTimeout(() => {
        imgEl.src = data.img;
        tagEl.textContent = data.tag;
        headingEl.textContent = data.heading;
        descEl.textContent = data.desc;

        bulletsEl.innerHTML = data.bullets.map(b => `
          <div class="bullet-item">
            <span class="bullet-check">✓</span>
            <span>${b}</span>
          </div>
        `).join('');

        imgEl.style.opacity = '1';
      }, 150);
    });
  });
}

// Mobile Sticky Quick Download Bar Controller
function initStickyMobileBar() {
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const heroSection = document.getElementById('hero');

  if (!stickyBar || !heroSection) return;

  let ticking = false;

  function updateStickyBar() {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 100;
    const scrollPos = window.scrollY || window.pageYOffset;

    if (scrollPos > heroBottom) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateStickyBar);
      ticking = true;
    }
  }, { passive: true });

  updateStickyBar();
}

// Track FAQ open/close events for Umami
function initFaqTracking() {
  const detailsList = document.querySelectorAll('.faq-item');
  detailsList.forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open && typeof umami !== 'undefined') {
        const questionText = details.querySelector('.faq-question span')?.textContent?.trim() || 'faq-item';
        umami.track('faq-opened', { question: questionText });
      }
    });
  });
}
