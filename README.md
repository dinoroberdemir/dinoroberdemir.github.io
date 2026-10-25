# Dino-Rober Demir

Personal website at **https://dinoroberdemir.github.io/**, built with
[Academic Pages](https://academicpages.github.io/) and Jekyll.

## Edit the site

- `_config.yml`: name, description, sidebar photo, affiliation and social links.
- `_data/navigation.yml`: links in the top navigation.
- `_pages/about.md`: home page.
- `_pages/cv.md`: CV page. Put a real PDF in `files/` and link it from this page when ready.
- `_publications/`: one Markdown file per publication.
- `_portfolio/`: one Markdown file per project.
- `_teaching/`, `_talks/` and `_posts/`: teaching, talks and blog posts.
- `images/profile.svg`: temporary initials avatar; replace it with your own photo and update `author.avatar`.

The existing biography, contact details and publications were template examples,
so they have been removed rather than attributed to Dino-Rober Demir.

For example, add a publication at `_publications/2026-example.md`:

```yaml
---
title: "Paper title"
date: 2026-10-25
venue: "Journal or conference"
excerpt: "A short summary of the work."
---
```

Write the publication details below its front matter. The publications page
lists these files automatically. Projects work the same way in `_portfolio/`.
Empty collections display a short message until real content is added.

## Preview and check

Use Ruby 3.3 and Bundler:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open `http://127.0.0.1:4000/`. Restart Jekyll after changing `_config.yml`.

The formatter needs Node.js. Browser checks use the production build and Python 3
as a local static server:

```sh
npm ci
npm run lint:prettier
bundle exec jekyll build
npx playwright install chromium
npm run test:site
```

Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an existing Chrome installation.
The browser checks serve the build locally and route the production hostname to
that local server; they never require a deployment.

## Publish

Push to `main`. The **Deploy site** workflow builds Jekyll and publishes `_site/`
to `gh-pages`. Keep **Settings ? Pages ? Deploy from a branch ? gh-pages ? /(root)**.
The repository must remain named `dinoroberdemir.github.io`, with `baseurl: ""`.
No change to the existing GitHub Pages settings is required for this migration.

See [the migration notes](docs/MIGRATION.md) for the upstream version and previous structure.
