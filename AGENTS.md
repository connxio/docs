# Documentation authoring guidelines

These guidelines apply when adding or editing documentation and its shared UI in this repository.

## Keep pages consistent

- All pages must follow the same general styling: typography, spacing, headings, property references, navigation, and shared UI patterns.
- Before editing, read a comparable page in the same category and the components it uses. Follow these guidelines when older pages use inconsistent patterns.
- Reuse components from `src/components/`, Docusaurus theme components, and existing shared styles. Do not create page-specific copies of shared settings or introduce custom layouts, colors, or inline styling for ordinary documentation.
- Improve consistency in the sections you touch without rewriting unrelated pages. Preserve existing user changes.
- Edit `docs/` for documentation updates. Versioned documentation is immutable: do not edit, rename, move, or delete files under `versioned_docs/`, even to fix outdated content, formatting, or broken links.
- Treat `api/` as generated API documentation; follow the generation workflow in `README.md` instead of hand-editing generated output.

## Required shared components

Import components using `@site/src/components/<ComponentName>`.

| Content | Component and convention |
| --- | --- |
| Individual action pages under `docs/actions/` | Use `ActionGeneralSettings` immediately after `## General settings`. |
| Individual trigger pages under `docs/triggers/` | Use `TriggerGeneralSettings` immediately after `## General settings`. |
| Configuration properties and field references, including security configurations | Use `PropertyReference` rather than hand-built property tables, lists, or repeated field headings. |
| Action duplicate detection, where supported | Use `ActionDuplicateDetection` below `## Duplicate detection`. |
| Action sequential delivery, where supported | Use `ActionSequentialDelivery` below `## Sequential delivery`. |
| Collapsible documentation sections | Reuse `CollapsibleSection`, with a heading immediately before it. Use a distinct `storageKey` unless the collapsed state should deliberately be shared across pages. |
| Action and trigger category overview pages | Follow the existing `index.mdx` pattern using `@theme/DocCardList` and `src/css/doc-card-list.module.css`. General-settings components are not needed on overview pages. |
| Cron expression interaction | Reuse `CronTester` when needed; link to `docs/integrations/triggering-interval.md` for the shared explanation. |

- Enable `ActionGeneralSettings`'s `showOutputEncoding` only for actions that transfer data to a separate system and expose this setting.
- Enable `showTriggerInterval` on the applicable general-settings component only when the action or trigger supports scheduling. This prop already renders a `Trigger interval` section; do not duplicate it.
- Do not copy the shared general settings into a page's property reference. Make corrections to shared content in its component, and consider all consuming pages when changing it.
- Include only settings and capabilities supported by the documented action or trigger. Do not invent features to make pages look alike.

## Page structure and writing

- Preserve existing frontmatter, document IDs, slugs, sidebar labels, and ordering unless the task requires changing them. Both `.md` and `.mdx` pages in this repository use components; do not rename files just to add JSX.
- Use one page title, then a short introduction explaining what the feature does and when to use it.
- For action and trigger reference pages, use this general order: introduction, `Configure the action` or `Configure the trigger`, `General settings`, feature-specific settings, then applicable examples, behavior, retry details, or limitations. Omit irrelevant sections.
- Use sentence case for headings and a logical heading hierarchy. Retain official product names and exact UI labels.
- Write clear, direct instructions. Use **bold** for UI labels in prose and `code` for expressions, identifiers, values, and filenames.
- Explain required or optional fields, dependencies on other settings, units, defaults, and limits when known. Verify behavior against available sources; do not infer defaults or guarantees from neighboring pages.
- Use realistic, safe example values and language-tagged code blocks. Never include real credentials or customer data.
- Use ordinary Markdown tables for genuine comparisons, such as status codes or retry behavior. Configuration field references belong in `PropertyReference`.
- Link to shared explanations instead of duplicating them. Reuse snippets in `docs/_shared/` where appropriate.

## PropertyReference usage

Each property requires `name` and `description`. Optional fields are `example`, `format`, `href`, and `samples` (an array of `{label, value}` objects). Check `src/components/PropertyReference/index.tsx` before extending this API.

- Match `name` to the UI label or documented identifier.
- Keep descriptions concise but explain the effect of the setting. Use JSX in `description` when links or rich content are necessary.
- Supply `example` and `format` as strings. Use `samples` for labeled values such as input, expression, and result.
- Use `href` only when the property name should link to another documentation destination; otherwise it links to its own entry.
- Keep property names unique within each reference. Set distinct `idPrefix` values when multiple references on a page repeat property names, including names rendered by shared components. Preserve existing property anchors where possible.

Example action-page structure:

```mdx
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import PropertyReference from '@site/src/components/PropertyReference';

# Example action

Explain what the action does and when to use it.

## Configure the action

Explain how to add and configure the action.

## General settings

<ActionGeneralSettings />

## Action settings

<PropertyReference
  properties={[
    {
      name: 'Example field',
      description: 'Explain the setting and any applicable requirements.',
      example: 'Example value',
    },
  ]}
/>
```

For a trigger page, use `TriggerGeneralSettings` and `Configure the trigger` instead.

## Links, assets, and navigation

- Follow `README.md`'s versioning rules. Use relative document file links with `.md` or `.mdx` extensions so links stay within the selected documentation version. Verify the actual target path; do not copy stale links from other pages.
- Prefer Markdown links for links between guides. Where JSX is necessary, follow the existing Docusaurus `Link` conventions and verify version behavior; do not introduce root-relative guide URLs that silently send archived readers to current docs.
- Shared API links intentionally use `/reference/...`. Import documentation snippets relatively, rather than through `@site/docs`, so snapshots use their own copies.
- Preserve heading anchors and update affected links when moving or renaming content.
- Check `sidebars.ts` and the category's `_category_` metadata when adding pages. Keep category ordering and overview navigation consistent with neighboring pages.
- Store documentation images under `static/img/docs/` and videos under `static/video/`. Reuse existing assets and meaningful filenames. Assets are shared across versions, so preserve assets still used by archives.
- Give images meaningful alt text. When light and dark screenshots exist, use `@theme/ThemedImage` with the existing `useBaseUrl` pattern. Use the shared `@theme/Tabs` and `@theme/TabItem` components for alternative instructions or examples.

## Verify changes

- Review the diff for accurate content, consistent structure, valid component props, working links and anchors, and unintended changes.
- For documentation or component changes, run `npm run build` and address errors introduced by the change. Report pre-existing failures separately. An edit only to this instruction file does not require a site build.
- For visual or layout changes, preview affected pages with `npm run start` and check narrow screens and both light and dark themes. When changing a shared component, inspect representative consuming pages.
- Do not regenerate API docs, create version snapshots, or deploy the site unless that is part of the requested task.
