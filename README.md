# Saurabh Shukla — portfolio (personalized local build)

A personalized copy of the reverse-engineered **meermohsin.me** site (the pristine,
byte-faithful mirror lives in `..\meermohsin-local`). Same single-page app, same three
WebGL scenes and animation system — with Saurabh's real data, images, projects, articles
and certificates swapped in.

**95 files, ~9.8 MB.** Built by `..\analysis\build-portfolio.mjs` (124 counted string
replacements; the script aborts if any expected occurrence count mismatches).

## Run

```
node serve.mjs                    # default port 8137
$env:PORT='8138'; node serve.mjs  # use another port (PowerShell) — the mirror uses 8137
```

Open **http://localhost:8138/** (or whatever port you chose).

## What was personalized

| Slot | Content |
|---|---|
| Identity | Saurabh Shukla — Backend Developer, Gurugram (title, meta, JSON-LD, OG/Twitter) |
| Hero | "I Build Production Backend Systems."; expertise lines BACKEND DEVELOPER / RUBY ON RAILS ENGINEER / API DESIGNER; fixed bar RUBY ON RAILS / POSTGRESQL / RSPEC |
| Hero portrait | `sa-hero.svg` — red-poster composition (see Deviations) |
| Socials | GitHub, LinkedIn, LeetCode (replacing TikTok / Instagram / Behance) |
| CTA | "Let's Connect" → `mailto:saurabhshukla8983@gmail.com` (was a WhatsApp link) |
| Work | 5 case studies: MOCKMATE, SMARTSERVE, NEARZ, TICKTIMERDO, SHORTLY — titles, sidebars, galleries, tech stacks |
| Blog | 3 re-authored posts (June 12 / May 28 / April 18, 2026) |
| Services | 8 tiles with generated SVG art |
| Awards | freeCodeCamp / NPTEL / BTech certificates rendered as the 3D award textures |
| Logo + favicons | "SS" monogram (nav `sa-logo.svg`, `sa-favicon.svg`, 32/96/180 px PNGs, PWA manifest icons) |
| Resume | `assets/saurabh-resume.pdf` + **DOWNLOAD PDF** in the contact sidebar |
| Contact form | Web3Forms — **access key is a placeholder**, see below |

User assets copied verbatim from `C:\Users\saura\Desktop\PortfolioWebsite\public\`:
`saurabh.png` (portrait), `mockmate.png`, `smartserve.png`, `saurabh.pdf`.

## Deviations from production parity (all intentional)

1. **awwwards ribbon hidden** — the template's award badge is `display:none` in the HTML.
2. **Web3Forms key** — `value="YOUR-WEB3FORMS-ACCESS-KEY"` in `index.html`
   (contact modal). The form only posts once you paste a real key from web3forms.com.
3. **Hero marquee layering** — one CSS rule appended to `assets/index-CLJlWOw8.css`:
   `.hero-section-home .scrolling-text{position:relative;z-index:3}`
   Without it the big scrolling headline paints *under* the portrait image in this build;
   with it the hero matches the live site's rendered look (headline over the portrait).
4. **Hero portrait is a composed SVG** — the square studio photo (`sa-portrait.png`) has a
   light-gray background that clashed with the template's red hero, so
   `analysis/recolor-portrait.mjs` recolors the photo's background to the hero gradient
   (browser canvas pass; result archived as `analysis/artifacts/sa-hero-bg.png`) and
   `sa-hero.svg` embeds it as a data URI (an SVG loaded via `<img>` cannot fetch external
   rasters). `sa-portrait.png` itself is still used for the CTA bubble + social metas.
5. **PWA manifest icons** — the mirror's webmanifest pointed at root icons that were never
   captured (404); this build provides SS-branded `web-app-manifest-192x192.png` /
   `-512x512.png`, so a manifest fetch now resolves.
6. **Internal ids keep template names** — e.g. `#tiktok-link`, `#Behance-link` in the
   HTML/bundle are the template's own JS hooks; the visible labels and hrefs are
   personalized. Invisible plumbing, left alone so the bundle keeps working.
7. **Template leftovers intentionally kept** — the ambient audio track, custom cursor art,
   webfonts, GLB statue/floor models, preloader shader/noise and decorative SVGs are the
   original site's assets (they carry no personal branding).

## Known non-working bits — faithful to the mirror/production

| Path / issue | Status |
|---|---|
| `/fonts/NeueMontreal.woff2` | 404 on live too (dead preload hint) |
| `LDR_LLL1_0.png` | 404 on live too (fluid-sim dithering texture) |
| 5 × `/src/assets/...` refs | 404 on live too (dead Vite source paths) |
| Console | `regControls is not defined` (production bug in the awards scene; everything before it ran) + GSAP warnings — same as production |

## Rebuild / verify

```
node ..\analysis\build-portfolio.mjs        # full rebuild (needs the mirror + user folder)
node ..\analysis\check-portfolio-refs.mjs   # all sa-* refs resolve
node ..\analysis\check-markers.mjs          # personalization markers
```

`analysis\build-portfolio.mjs` requires the pristine mirror at `..\meermohsin-local`, the
user's assets at `C:\Users\saura\Desktop\PortfolioWebsite`, and the two browser-derived
artifacts in `..\analysis\artifacts\` (`sa-hero-bg.png`, `sa-favicon-*.png` — produced by
`analysis\recolor-portrait.mjs` and `analysis\make-icons.mjs`).

## Behavior notes (same as the mirror)

- **First visit per tab:** preloader countdown + shader dissolve, then the hero reveal;
  `sessionStorage.loaderPlayed` makes reloads skip straight in.
- **First click anywhere** starts the ambient audio (sound-wave bars toggle it).
- Everything is offline except the contact form post and the social/resume links.
- Verification screenshots (CDP, 1920×1080): `..\analysis\live-portfolio\`.
