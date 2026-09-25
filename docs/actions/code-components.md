---
title: "Code transformation"
sidebar_position: 20
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import Link from '@docusaurus/Link';

# Code transformation

The Code transformation action runs a C# code component to transform message content and metadata. Use a component uploaded to Connxio or load a DLL or ZIP from an external URI.

## Configure the action

Add a Code transformation action to your integration and choose the component to run. To develop and upload a component, see [Code components](../integrations/code-components.md).

## General settings

<ActionGeneralSettings />

## Component settings

<PropertyReference properties={[
  {
    name: "Code component",
    description: <>Required when Use external code component is disabled. Select the uploaded mapping component to run. Use <strong>+</strong> to create a component. See <Link to="/integrations/code-components/#uploading-your-component">Uploading your component</Link> for details.</>,
  },
  {
    name: "Use external code component",
    description: "Enable to load a component from an external URI instead of selecting an uploaded component.",
  },
]} />

## External code components

Enable **Use external code component** to provide an external URI. The DLL or ZIP must be available through an HTTP GET endpoint.

<PropertyReference properties={[
  {
    name: "External component URI",
    description: "Required when Use external code component is enabled. The URI of the DLL or ZIP to load.",
    example: "https://example.com/MyCodeComponent.dll",
  },
]} />

## ZIP components

ZIP components can be selected from uploaded code components or loaded from an external URI. When the selected code component is a ZIP component, the **DLL filename with extension** field appears automatically.

<PropertyReference properties={[
  {
    name: "Use zip mapping",
    description: <>Use ZIP mapping for a component packaged with its dependencies in a ZIP, whether uploaded to Connxio or loaded from an external URI. See <Link to="/integrations/code-components/#zipped-code-components">Zipped Code Components</Link> for packaging instructions.</>,
  },
  {
    name: "DLL filename with extension",
    description: "Required for ZIP components. The main component DLL inside the ZIP, including the .dll extension. Appears automatically when you select an uploaded ZIP component, or when you enable Use zip mapping for an external component.",
    example: "MyCodeComponent.dll",
  },
]} />

## Caching

Components are cached for 30 seconds after loading. Keep this in mind when testing rapid changes.
