# Product Requirements Document

> Version: 0.1
> Status: Draft
> Last updated: 2026-08-05

---

# 1. Overview

## Goal

Build an elegant, modern and minimalist website that accompanies the guests
before, during and possibly after Coline and Julien's wedding.

The site should not be perceived as a plain information site but as a true
companion to the wedding.

The experience must be smooth, warm and family-like.

---

# 2. The couple

**Bride**

- Maiden name: Coline Metta-Versmessen
- Married name: Coline Méreau-Versmessen

**Groom**

- Julien Méreau

The civil wedding was already celebrated on **28 March 2026** with a small
gathering.

The weekend of **7 August 2027** is the celebration with the guests.

---

# 3. General information

## Dates

Friday 6 August 2027

- Welcoming the guests (to be confirmed)

Saturday 7 August 2027

- Ceremony
- Cocktail
- Dinner
- Party

Sunday 8 August 2027

- Brunch / departure (to be confirmed)

---

## Venue

Maison Familiale de Berlencourt-Le-Cauroy

161 Rue de Grand Rullecourt

62810 Berlencourt-le-Cauroy

Google Maps

https://maps.app.goo.gl/6Cfe8bpqcX1J4paj7

---

# 4. Audience

The site is intended exclusively for the guests.

Search engine indexing is disabled.

Access will happen mainly through a QR code printed on the invitations.

Provisional URL:

julien-coline.lemorse.tech

---

# 5. Vision

The site must convey the atmosphere of the wedding.

Keywords:

- elegant
- warm
- family-like
- modern
- uncluttered
- smooth
- natural
- understated

It must not look like a conventional website made of large cards or numerous
sections.

Every page must breathe.

Navigation must be discreet.

The emphasis is on typography, photographs and whitespace.

---

# 6. Design

## Palette

To be confirmed with the visual identity.

Provisional palette:

- Forest
- Moss
- Sage
- Cream
- White

---

## Typography

Current proposal

Headings

- Cormorant Garamond

Body text

- Inter

---

## Animations

Gentle animations.

Goals:

- transitions between pages
- micro-interactions
- gradual reveal of elements

To avoid:

- complex animations
- spectacular effects
- heavy parallax

---

# 7. Navigation

Discreet navigation.

The site is designed mobile-first.

First pages:

- Home
- Schedule
- Venue
- RSVP
- Playlist
- Photos

Further pages may be added later.

---

# 8. Pages

## Home

Planned content:

- photograph of the couple
- names
- date
- venue
- introduction
- navigation

---

## Schedule

First version

An image of the schedule.

Possible next steps

- interactive timeline
- live changes
- announcements

---

## Venue

Initial version

- introduction
- address
- Google Maps button

Next steps

- parking
- accommodation
- Wi-Fi
- Wi-Fi QR code
- useful contacts
- practical information

---

## RSVP

First version

A button to a Google Form.

The form will be built later.

TODO

Build the form using Google Apps Script.

---

## Playlist

A short introduction.

A button opening a collaborative Spotify playlist.

---

## Photos

A short introduction.

A button opening a Google Photos album.

---

# 9. User experience

The site must be pleasant to browse.

Users should feel like they are leafing through a small book.

Navigation must be intuitive.

The content must be readable on a phone, one-handed.

---

# 10. Technical architecture

## Hosting

GitHub Pages

---

## Domain

julien-coline.lemorse.tech

---

## Generator

Hugo

---

## CSS

Tailwind CSS

Colours will be redefined from CSS variables.

For example:

--color-primary

--color-secondary

--color-surface

--color-background

--color-text

Tailwind colours will use those variables.

---

## JavaScript

As little as possible.

No heavy framework.

---

## Deployment

GitHub Actions

Automatic deployment on every merge into the main branch.

---

## SEO

The site must not be indexed.

Meta robots:

noindex

nofollow

noarchive

---

# 11. Responsive

Mobile first.

The site must be perfectly usable on a smartphone.

Desktop is secondary.

---

# 12. External content

Google Forms

Spotify

Google Photos

Google Maps

---

# 13. MVP

First version

- Home
- Schedule
- Venue
- RSVP
- Playlist
- Photos
- Navigation
- Responsive
- Automatic deployment

---

# 14. Future ideas

## Design

- floral illustrations
- monogram
- custom favicon
- photo shoot
- final visual identity

---

## Features

- information banner
- guest directory
- useful contacts
- Wi-Fi QR code
- accommodation
- parking
- FAQ
- announcements
- dynamic schedule
- gallery after the wedding

---

## Technical

- lightweight authentication through the URL
- access parameters
- Google Apps Script
- simplified administration

---

# 15. Open questions

- Visual identity
- Logo
- Official photographs
- RSVP content
- Final schedule
- Accommodation
- Practical information
- Useful contacts

---

# 16. Language convention

The code base is written in English: comments, documentation, template and data
file names, HTML identifiers, and CI step names.

Everything the guests read stays in French: page content, menu labels, button
labels, dates and ARIA labels.
