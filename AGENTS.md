# Agent guidelines for this personal website

This repo is Dino-Rober Demir's personal website, now based on Academic Pages.
The user explicitly authorized replacing the former al-folio structure.
The old thin-starter restrictions and al-folio plugin contracts no longer apply.

- Keep `url: https://dinoroberdemir.github.io` and `baseurl: ""`.
- Academic Pages owns its runtime locally: `_layouts/`, `_includes/`, `_sass/` and `assets/`.
- Edit personal information in `_config.yml`, pages in `_pages/`, and navigation in `_data/navigation.yml`.
- Do not invent affiliations, degrees, contact details, publications or CV entries.
- Collections are `_publications`, `_portfolio`, `_teaching`, `_talks` and `_posts`.
- Preserve the upstream MIT license and the attribution in the footer.
- `.agents/skills` still contains legacy al-folio instructions; they do not describe this site's current architecture.
- Deployment uses `.github/workflows/deploy.yml` and publishes the build to `gh-pages`.
- Validate with `npm run lint:prettier`, `bundle exec jekyll build` and `npm run test:site`.

See [README.md](README.md) for editing and deployment, and
[docs/MIGRATION.md](docs/MIGRATION.md) for the upstream source.
