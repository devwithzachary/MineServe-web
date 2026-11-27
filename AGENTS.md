# Workspace Rules: MineServer-Web (Front Static Website)

## Ecosystem Context (3-Repo Architecture)

MineServe is organized into three independent sibling repositories under `/home/zachary/Code/MineServerProject/` (see top-level `../AGENTS.md` for shared workspace rules and cross-repo integration):
1. **`../MineServer-App` (Main Android App & Linux Desktop/Headless Engine)**: 100% open-source (GPL-3.0), ad-free, F-Droid compliant app for hosting Minecraft servers on Android and Linux.
2. **`../MineServer-Cloud` (Paid Cloud Service)**: Kotlin serverless backend on AWS + Cloudflare + Stripe powering optional **MineServe Plus** (`$2.99/mo`) and **MineServe Pro** (`$6.99/mo`) services under `mineserve.app` (`api.mineserve.app`, `cloud.mineserve.app`, `*.play.mineserve.app`, `*.panel.mineserve.app`).
3. **`MineServer-Web` (This Repo - Front Static Website)**: Static HTML/CSS/JS marketing site hosted via **GitHub Pages** (`https://mineserve.app`).

---

## Website Maintenance Rules

- **Static-Only Hosting**: Keep all pages 100% static (HTML, CSS, vanilla JS) compatible with GitHub Pages. Do not introduce server-side rendering or backend runtime dependencies here.
- **Linux Installer Sync**: `install.sh` is synced from `../MineServer-App/packaging/linux/install.sh` by `../MineServer-App/scripts/build_linux_packages.sh` and must remain compatible with `https://mineserve.app/install.sh`.
- **Release Sync**: Before every `MineServer-App` release, keep `index.html` synced with the active version badge (e.g. `v1.8.1`), supported server engines, feature highlights, screenshots, and pricing/cloud tier links, and keep `changelog.html` synced following the **Changelog & Release Announcement Rules** in `../AGENTS.md`.
- **Style & Typography**: Never use em-dashes (U+2014) or en-dashes (U+2013). Always use standard hyphens (`-`), colons (`:`), or commas.
- **Git Rules**: Never run `git commit`, `git push`, or `git tag`; leave changes in the working tree for user review.

---

## Design System Rule (Material Design 3)

All UI and styling work on `mineserve.app` MUST follow `../DESIGN_SYSTEM.md`:
- **Single Token File**: Isolate all hex values in `css/style.css` (`:root`) or a dedicated `css/tokens.css` loaded first.
- **"Obsidian & Ore" Surface Ladder & Banned Web Anti-Patterns**: Use flat `#0B0F19` canvas (Dark) or `#F8FAFC` (Light) and tonal card stepping (`#1B2333` / `#E2E8F0`) with ZERO `1px` borders on standard cards and ZERO radial neon green glows or blurred gradient blobs. Reserve `primary` (`#34D399` dark / `#059669` light) for the single highest-priority CTA per view.
- **Typography, Icons & Brand Assets**: Use `Plus Jakarta Sans` (`Inter` fallback) for UI/headings and `JetBrains Mono` strictly for terminal/install commands, `IP:Port`, and numeric telemetry. Use Material Symbols Rounded (`wght 400`) exclusively, never generate AI artwork/SVGs, and keep human-made brand assets (`assets/logo.svg`, `assets/logo.png`, `assets/feature_graphic.png`, `assets/og-cover.png`) in their designated slots.
