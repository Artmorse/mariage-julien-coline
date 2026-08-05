# Coline & Julien — 7 août 2027

Site compagnon du mariage de Coline et Julien, destiné exclusivement aux invités.

En ligne : <https://julien-coline.lemorse.tech>

---

## Démarrer en local

Les versions d'outils sont épinglées dans `.tool-versions` (asdf) :

```sh
asdf install          # Hugo 0.164.0 (extended) + Node.js 22.16.0
npm ci                # dépendances Tailwind CSS
hugo server           # http://localhost:1313
```

Compiler la version de production :

```sh
hugo --gc --minify    # résultat dans public/
```

---

## Ce qui se modifie sans toucher au code

### Liens externes — `hugo.toml`, section `[params.links]`

```toml
rsvp = ''       # Google Forms
playlist = ''   # Spotify
photos = ''     # Google Photos
```

Tant qu'une valeur est vide, le bouton de la page concernée est remplacé par
une mention d'attente discrète (« Formulaire bientôt disponible »). Aucun lien
mort n'est jamais présenté aux invités : il suffit de coller l'URL pour activer
le bouton.

### Programme — `data/programme.yaml`

Chaque journée contient une liste d'événements (heure, titre, description).
`tentative: true` affiche la mention « Horaires à confirmer ».

### Textes des pages — `content/*.md`

Le front matter porte le titre, le sur-titre (`eyebrow`) et le chapô (`lead`) ;
le corps du fichier est du Markdown classique.

### Palette et typographie — `assets/css/main.css`

Les seules valeurs hexadécimales du projet se trouvent dans le bloc `:root`.
Le bloc `@theme` associe ces couleurs brutes à des rôles sémantiques
(`--color-primary`, `--color-surface`, …) que Tailwind expose ensuite comme
utilitaires (`text-primary`, `bg-surface`). Changer la charte graphique revient
donc à modifier un seul bloc.

### Photographies — `assets/images/`

Les fichiers originaux de l'appareil sont utilisés tels quels : Hugo les
redimensionne à la compilation, les convertit en AVIF avec repli JPEG et
corrige leur orientation Exif. Un téléphone reçoit une image d'environ 30 Ko.

Pour afficher l'image du programme, la déposer dans `assets/images/` puis
renseigner `programme` dans `[params.images]`.

---

## Structure

```
assets/css/main.css     charte graphique et styles
assets/js/main.js       ouverture du menu mobile (seul JavaScript du site)
assets/images/          photographies sources
content/                textes des pages
data/programme.yaml     déroulé du week-end
layouts/                gabarits Hugo
  baseof.html           squelette commun
  home.html             accueil
  page.html             gabarit générique (RSVP, Playlist, Photos)
  programme.html        page Programme
  lieu.html             page Lieu
  _partials/            en-tête, pied de page, photographie, bouton externe
static/                 polices, favicon, CNAME
```

---

## Déploiement

`.github/workflows/deploy.yml` compile et publie le site sur GitHub Pages à
chaque arrivée de code sur `main`. Aucune action manuelle n'est nécessaire.

Le domaine personnalisé est déclaré dans `static/CNAME`. Il doit correspondre à
`baseURL` dans `hugo.toml`.

---

## Confidentialité

Le site n'est pas indexable : `robots.txt` interdit tous les robots et chaque
page porte `noindex, nofollow, noarchive`. Aucun sitemap ni flux RSS n'est
généré. Les polices sont auto-hébergées : le site n'émet aucune requête vers un
service tiers, et donc aucun traçage.

L'accès reste toutefois public pour qui connaît l'URL. Une authentification
légère est listée dans les évolutions possibles du PRD.

---

## Reste à faire

- créer le formulaire RSVP et renseigner son URL
- créer la playlist Spotify collaborative et l'album Google Photos
- confirmer les horaires du vendredi et du dimanche
- compléter la page Lieu : stationnement, hébergements, Wi-Fi, contacts
- charte graphique définitive, monogramme et favicon
