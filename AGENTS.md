# Workspace Rules: MineServe-web (Front Static Website)

## Ecosystem Context (3-Repo Architecture)

MineServe is organized into three sibling repositories under `/home/zachary/Code/`:
1. **`../MineServe` (Main Android App)**: 100% open-source (GPL-3.0), ad-free, F-Droid compliant Android app for hosting Minecraft servers on-device.
2. **`../mineserver-backend` (Paid Cloud Service)**: Kotlin serverless backend on AWS + Cloudflare + Stripe powering optional **MineServe Plus** (`$2.99/mo`) and **MineServe Pro** (`$6.99/mo`) services under `mineserve.app` (`api.mineserve.app`, `cloud.mineserve.app`, `*.play.mineserve.app`, `*.panel.mineserve.app`).
3. **`MineServe-web` (This Repo - Front Static Website)**: Static HTML/CSS/JS marketing site hosted via **GitHub Pages**.

---

## Website Maintenance Rules

- **Static-Only Hosting**: Keep all pages 100% static (HTML, CSS, vanilla JS) compatible with GitHub Pages. Do not introduce server-side rendering or backend runtime dependencies here.
- **Release Sync**: Before every `MineServe` release, keep `index.html` synced with the active version badge (e.g. `v1.6.1`), supported server engines, feature highlights, screenshots, and pricing/cloud tier links.
- **Style & Typography**: Never use em-dashes (`—`) or en-dashes (`–`). Always use standard hyphens (`-`), colons (`:`), or commas.
- **Git Rules**: Never run `git commit`, `git push`, or `git tag`; leave changes in the working tree for user review.

