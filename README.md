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

To publish a documentation release, finish editing `docs/`, then run the following
with your release number (replace `X.Y.Z`):

```sh
npm run docs:version -- X.Y.Z
npm run build
```

Docusaurus creates `versioned_docs/version-X.Y.Z/`, saves the resolved sidebars in
`versioned_sidebars/version-X.Y.Z-sidebars.json`, and adds the release to the root
`versions.json`. Commit all three along with your documentation changes.

With Docusaurus's default routing, the newest saved release is served at `/`,
older releases at `/VERSION/`, and the working `docs/` directory at `/next/`
(labelled **Next**). Before the first release is saved, `docs/` is served at `/`
and the selector appears as a single version link; it becomes a dropdown once
there are multiple versions. Edit `docs/` for the next release; fix an existing
release in its `versioned_docs/` folder. Releases are snapshots, not Git branches.

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
