# Connxio documentation

<br>
<p align="center" >
    <picture>
      <img alt="The Connxio logo" src="https://i.imgur.com/GfRL9b7.png" width="600">
    </picture>
</p>

Welcome to the Connxio Documentation repository. This repository powers the documentation site for [Connxio](https://www.evidi.com/produkter/connxio), hosted with Docusaurus and GitHub Pages.

## About Connxio

Connxio, by Evidi, is a powerful integration platform designed to facilitate seamless data and file exchange between systems. It enables users to establish connections, known as integrations, between a sender and a receiver system. Connxio supports a wide range of protocols, referred to as Adapters, to accommodate various integration scenarios.

## Documentation

Our documentation is available at [docs.connxio.com](https://connxio.github.io/docs). It provides comprehensive guides and API references to help you start working with Connxio as quickly as possible.

## Documentation versions

The header uses Docusaurus's built-in documentation version selector, beside the
theme toggle. Home and REST API navigation follow the selected documentation
version. Switching versions opens the same document when it exists in both
versions, or that version's home page otherwise.

To archive a snapshot of the current documentation, run the following with your
version number (replace `X.Y.Z`):

```sh
npm run docs:version -- X.Y.Z
npm run build
```

Docusaurus creates `versioned_docs/version-X.Y.Z/`, saves the resolved sidebars in
`versioned_sidebars/version-X.Y.Z-sidebars.json`, and adds the release to the root
`versions.json`. Commit all three along with your documentation changes.

The working `docs/` directory is the default version, labelled **Next** and served
at `/`. All numbered snapshots are archives served at `/VERSION/`, including
`/1.0.0/`. Creating another snapshot does not change the default version. This is
configured with `lastVersion: "current"` and an empty path for `current` in
`docusaurus.config.ts`. Archived pages display Docusaurus's unmaintained-version
banner. Edit `docs/` for live documentation updates; fix an archive in its
`versioned_docs/` folder. Archives are snapshots, not Git branches.

The REST API's own v1/v2/v3 selector is independent of whole-site documentation
versions. The snapshot includes those API references too. Root-relative links
and URLs embedded in HTML (including the API sidebar selector) keep their literal
destinations; use relative Markdown links for version-aware links between docs.
Assets under `static/` and imports through `@site` are shared, so preserve old
assets or use distinct filenames when updating them for a new release.

See the [Docusaurus versioning guide](https://docusaurus.io/docs/versioning).

## Build Status

| Build & Release Status                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Deploy to GitHub Pages](https://github.com/connxio/docs/actions/workflows/deploy-to-github-pages.yml/badge.svg)](https://github.com/connxio/docs/actions/workflows/deploy-to-github-pages.yml) |
