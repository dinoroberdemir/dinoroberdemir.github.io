# Migration from al-folio to Academic Pages

The user requested the Academic Pages structure used by https://leodana2000.github.io/.
This site uses the official Academic Pages template, not that person's content.

- Upstream: https://github.com/academicpages/academicpages.github.io
- Imported commit: `7b958332ce9970cfb6987a049d7684ac615397e8` (2026-10-18).
- Former site revision: `8a4170f` (`urlfix`). The original source remains in Git history.
- A local snapshot is also saved at `output/migration/al-folio-before-academicpages.zip`
  and is excluded from Git and the published site.

The migration replaces al-folio gems, layouts, demo content, dependency lockfile,
maintenance workflows and documentation with Academic Pages runtime and personal-site wiring.
The `gh-pages` publishing branch, production URL and owner name are preserved.

Only the previous configuration, two template links and deployment workflow had
been customized. The Einstein biography, example publications, sample posts and
contact details were demo content; they are not personal information and are no
longer published. Empty collections are ready for real content.

Theme code under `_layouts`, `_includes`, `_sass` and `assets` is imported from
upstream. `head/custom.html` uses the included Academicons instead of a CDN.
The local configuration, content, avatar, tests and workflow are specific to this site.

Academic Pages is derived from Minimal Mistakes and distributed under the MIT
license in [LICENSE](../LICENSE). Font Awesome and Academicons retain their
respective notices in the vendored source files.
