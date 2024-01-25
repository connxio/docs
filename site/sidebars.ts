/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import {
  versionCrumb,
  versionSelector,
} from "docusaurus-plugin-openapi-docs/lib/sidebars/utils";
import versions from "../docs/reference/versions.json";

import v1Sidebar from "../docs/reference/1.0.0/sidebar";
import v2Sidebar from "../docs/reference/sidebar";

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  connxioSidebar: [{ type: "autogenerated", dirName: "." }],
  // openApiSidebar: require("../docs/api/sidebar.ts"),
  "connxio-2.0.0": [
    {
      type: "html",
      defaultStyle: true,
      value: versionSelector(versions),
      className: "version-button",
    },
    {
      type: "html",
      defaultStyle: true,
      value: versionCrumb(`v2.0.0`),
      className: "version-crumb",
    },
    v2Sidebar,
  ],
  "connxio-1.0.0": [
    {
      type: "html",
      defaultStyle: true,
      value: versionSelector(versions),
      className: "version-button",
    },
    {
      type: "html",
      defaultStyle: true,
      value: versionCrumb(`v1.0.0`),
      className: "version-crumb",
    },
    v1Sidebar,
  ],
  // openApiSidebar: [
  //   {
  //     type: "category",
  //     label: "API Reference",
  //     link: {
  //       type: "generated-index",
  //       title: "Connxio API",
  //       description:
  //         "Connxio API",
  //       slug: "/api"
  //     },
  //     // @ts-ignore
  //     items: require("../docs/api/sidebar.ts")
  //   }
  // ],
  // agreementSidebar: ['/agreements/cookie-policy', '/agreements/data-processing-agreement', '/agreements/privacy-notice']
  // But you can create a sidebar manually
  // tutorialSidebar: [
  //   {
  //     type: "category",
  //     label: "Tutorial",
  //     items: ["hello"],
  //   },
  // ],
};

// module.exports = sidebars;
export default sidebars;
