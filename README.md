# API Bench — landing page

Static marketing site for [API Bench](../api-benchmark): compare an API
before and after a migration. React + Vite + Tailwind 4.

```sh
npm install
npm run dev       # http://127.0.0.1:5190
npm run build     # static files in dist/, deploy anywhere (Cloudflare Pages, etc.)
```

## Before deploying

- Set the real repository URL in `src/config.js` (`REPO_URL`). It feeds every
  GitHub button and the install command.
- `public/og.png` is a screenshot of the hero. Regenerate it if the hero changes.

## Design

Built with the `landing-page-design` skill:

- One font family (Geist, with Geist Mono only for code and numbers), named
  text styles (`heading-1`, `body-3`, `caption-5`, ...) defined in `src/index.css`.
- Spacing and radius only from the Tailwind scale. Surfaces are flat; the two
  exceptions are decorative backgrounds: a cursor-reactive dot grid behind the
  hero (`DotGrid.jsx`) and a live ASCII wave behind the final CTA (`AsciiField.jsx`).
  Both pause off screen and draw one still frame with reduced motion.
- Phosphor icons. One motion curve, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Blocks based on 21st.dev: Announcement pill (ported from haydenbleasel's
  component, `ui/announcement.jsx`), typing install terminal (`Terminal.jsx`),
  number ticker on the hero results (`NumberTicker.jsx`), Ghost Accordion FAQ.
  No extra npm dependencies.
- Sections: hero, problem, benefits, tagline reveal, how it works, report,
  FAQ, final CTA. Static `404.html`, `privacy.html`, `terms.html` in `public/`.
- With `prefers-reduced-motion`, nothing moves; content only fades.
