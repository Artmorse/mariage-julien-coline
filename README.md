# Coline & Julien — 7 August 2027

Companion site for Coline and Julien's wedding, intended for guests only.

Online at <https://julien-coline.lemorse.tech>

> The code, comments and documentation are in English. Everything the guests
> read — page content, menu labels, dates — stays in French.

---

## Running it locally

Tool versions are pinned in `.tool-versions` (asdf):

```sh
asdf install          # Hugo 0.164.0 (extended) + Node.js 22.16.0
npm ci                # Tailwind CSS dependencies
hugo server           # http://localhost:1313
```

Build the production version:

```sh
hugo --gc --minify    # output in public/
```

---

## What can be changed without touching the code

### External links — `hugo.toml`, `[params.links]` section

```toml
rsvp = ''       # Google Forms
playlist = ''   # Spotify
photos = ''     # Google Photos
```

As long as a value is empty, the button on the matching page is replaced by a
discreet waiting note ("Formulaire bientôt disponible"). No dead link is ever
shown to the guests: pasting the URL is enough to activate the button.

### Schedule — `data/schedule.yaml`

Each day holds a list of events (time, title, description). `tentative: true`
displays the "Horaires à confirmer" note.

### Page text — `content/*.md`

The front matter carries the title, the eyebrow and the lead; the body of the
file is plain Markdown.

### Palette and typography — `assets/css/main.css`

The only hexadecimal values in the project sit in the `:root` block. The
`@theme` block maps those raw colours to semantic roles (`--color-primary`,
`--color-surface`, …), which Tailwind then exposes as utilities
(`text-primary`, `bg-surface`). Changing the visual identity therefore comes
down to editing a single block.

### Photographs — `assets/images/`

The original files from the camera are used as they are: Hugo resizes them at
build time, converts them to AVIF with a JPEG fallback and corrects their Exif
orientation. A phone receives an image of roughly 30 KB.

To display the schedule image, drop it into `assets/images/` and fill in
`schedule` under `[params.images]`.

---

## Structure

```
assets/css/main.css     visual identity and styles
assets/js/main.js       mobile menu toggle (the site's only JavaScript)
assets/images/          source photographs
content/                page text
data/schedule.yaml      weekend timeline
layouts/                Hugo templates
  baseof.html           shared skeleton
  home.html             home page
  page.html             generic template (Dress code, RSVP, Playlist, Photos)
  schedule.html         Programme page
  venue.html            Lieu page
  _partials/            header, footer, photograph, external button
static/                 fonts, favicon, CNAME
```

Templates and data files are named in English, so the public URLs are
`/schedule/` and `/venue/` while the menu still reads "Programme" and "Lieu".

---

## Deployment

`.github/workflows/deploy.yml` builds and publishes the site to GitHub Pages on
every push to `main`. No manual step is needed.

The custom domain is declared in `static/CNAME`. It must match `baseURL` in
`hugo.toml`.

---

## Privacy

The site is not indexable: `robots.txt` disallows every robot and each page
carries `noindex, nofollow, noarchive`. No sitemap and no RSS feed are
generated. The fonts are self-hosted, so the site issues no request to any
third-party service, and therefore no tracking.

Access nevertheless remains public to anyone who knows the URL. Lightweight
authentication is listed among the possible next steps in the PRD.

---

## Still to do

- create the RSVP form and fill in its URL
- create the collaborative Spotify playlist and the Google Photos album
- confirm the Friday and Sunday timings
- complete the Lieu page: parking, accommodation, Wi-Fi, contacts
- final visual identity, monogram and favicon
