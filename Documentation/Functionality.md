# Functionality

We categorize functionality in CX by two states; in development and production ready. This page describes the two states and how they are handled within the documentation.

## In development

Functionality that is "in development" will be marked with the following warning:

> `This functionality is in development. Read more on the:` [functionality page](/Documentation/Functionality.md).

The warning can mark sub sections of a document or the whole document itself. When a page or section is marked with the above paragraph it is essentially not fully tester and subject to future changes. We do not guarantee that you won't have to make changes to pipelines or systems that make use of the functionality when the development process ends or continues. Essentially you should use features that are "in development" on on critical integrations and facilitate a dialog with the CX team on how this functionality may change.

## Production ready

Functionality that is not marked with the "in development" paragraph it is seen as production ready. A production ready functionality may be marked with the "in development" tag if we have to rework the functionality at a later date. We have however pledged ourselves to a strict backwards compatibility scheme which prevents us from breaking old functionality that was previously "production ready". This means that even if a feature you have made use of in production scenario's changes status you do not have to fear old integrations stopping or breaking.