# Arboricultural Research and Education Academy — website

A small static site (no build step) for the Arboricultural Research and Education
Academy (AREA). Plain HTML, one shared stylesheet, one shared script, and the
Academy's real images. The design is built around the AREA wordmark — the green
gradient, the oak leaf, and the microscope.

## Structure

```
.
├── index.html          Home
├── about.html          About the academy
├── research.html       Research
├── education.html      Education
├── memberships.html    Membership
├── 404.html            Not-found page
├── css/styles.css      All styling (shared by every page)
├── js/main.js          Mobile menu + growth-ring animation
├── images/             logo.png, wordmark.png, members.jpg
└── .nojekyll           Tells GitHub Pages to serve files as-is
```

## Preview locally

No tools required. Either open `index.html` in a browser, or run a tiny server
so links and fonts behave exactly like production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages

1. Create a new repository and upload these files (keep the folder structure).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, branch
   `main`, folder `/ (root)`. Save.
4. Wait ~1 minute. Your site appears at `https://<username>.github.io/<repo>/`.

### Use the area-arbor.org domain

1. In **Settings → Pages → Custom domain**, enter `www.area-arbor.org` and save
   (this adds a `CNAME` file to the repo).
2. At your domain registrar, add a **CNAME** record:
   `www` → `<username>.github.io`.
3. For the bare domain `area-arbor.org`, add four **A** records pointing to
   GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`.
4. Back in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is
   ready.

## Editing content

- **Text** lives directly in each `.html` file.
- **Look and feel** (colors, type, spacing) lives in `css/styles.css`. The brand
  greens are CSS variables at the top: `--g1` … `--g5`.
- Spots that need the Academy's real information are marked with
  `<!-- EDIT: ... -->` comments — membership rates, board members, newsletter
  issues, and upcoming events.

## Images

`images/` holds the Academy's own logo, wordmark, and a membership photo,
recovered from the existing site. Replace any of them by dropping in a file of
the same name.

## Notes

- The growth-ring cross-section draws one ring per year since 1973; update the
  `YEARS` value in `js/main.js` as the years go on.
- Everything respects `prefers-reduced-motion` and works down to mobile widths.
