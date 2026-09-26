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

The working `docs/` directory is the default version, served at `/` with the
label configured in `docusaurus.config.ts`. Numbered snapshots are archives
served at `/VERSION/`, such as `/2.1.1/`. Creating another snapshot does not change the default version. This is
configured with `lastVersion: "current"` and an empty path for `current` in
`docusaurus.config.ts`. Archived pages display Docusaurus's unmaintained-version
banner. Edit `docs/` for live documentation updates; fix an archive in its
`versioned_docs/` folder. Archives are snapshots, not Git branches.

### Keep links inside their documentation version

Use relative **file paths with the `.md` or `.mdx` extension** for links between
pages. Docusaurus resolves them to the correct URL within the selected version:

```md
[Security configuration](../integrations/security-configurations.md)
[HTTP action](../actions/http.md#receive-content-as-bytes)
```

Avoid root-relative document URLs such as `/integrations/logging`: those always
open the live site. Use Markdown links instead of HTML `<a href="/...">` links.
Import shared documentation snippets relatively too, for example
`import RequiredNugetPackage from '../_shared/RequiredNugetPackage.mdx'`, rather
than through `@site/docs`. Relative imports use the copy saved in the snapshot.

When moving or deleting a page in `docs/`, update links to it in `docs/`.
Archived pages can keep their own content and links; they do not need the current
copy. When deleting a page inside an archive, update links within that archive.
New snapshots inherit the relative links and imports automatically.

### Shared API reference

The API reference lives in `api/` and is served by a separate docs
plugin at `/reference/`. It keeps its own v1/v2/v3 selector and is not included in
whole-site snapshots. `npm run docs:version -- X.Y.Z` copies only `docs/` and its
guide sidebar. API generation commands write to `api/`.

Run `yarn re-gen` to refresh the API reference. The generation scripts automatically
fetch the v1, v2 and v3 OpenAPI specifications and replace their server URLs with
`https://api.connxio.com` and remove the leading `/api` from endpoint paths before
generating the docs. No manual downloads or YAML
edits are needed. `yarn gen-all`, `yarn gen-api-docs connxio`, and
`yarn gen-api-docs:version connxio:all` also prepare fresh specifications.

Temporary specifications are saved in the ignored `.openapi/` directory. The
shared server URL is configured in `scripts/prepare-api-specs.mjs`. Preparation
must succeed before generation (and before cleaning when using `yarn re-gen`).
Use these package scripts instead of invoking the Docusaurus generation commands
directly. The Download OpenAPI link still points to the original upstream YAML.

Links to the shared API are intentionally root-relative, for example
`[API reference](/reference/connxio-api)`. Both current and archived guides use
these same URLs. Links from the API to guides open the current documentation.
Do not create documentation snapshots for the `api` plugin.

Assets under `static/` remain shared: preserve old assets or use distinct
filenames when updating them.

See the [Docusaurus versioning guide](https://docusaurus.io/docs/versioning).

## Build Status

| Build & Release Status                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Deploy to GitHub Pages](https://github.com/connxio/docs/actions/workflows/deploy-to-github-pages.yml/badge.svg)](https://github.com/connxio/docs/actions/workflows/deploy-to-github-pages.yml) |
