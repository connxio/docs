import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import { versionCrumb, versionSelector } from "docusaurus-plugin-openapi-docs/lib/sidebars/utils";

import v1Sidebar from "./api/1.0.0/sidebar";
import v2Sidebar from "./api/2.0.0/sidebar";
import v3Sidebar from "./api/sidebar";

import versions from "./api/versions.json";

const sidebars: SidebarsConfig = {
  "connxio-3.0.0": [
    {
      type: "html",
      defaultStyle: true,
      value: versionSelector(versions),
      className: "version-button",
    },
    {
      type: "html",
      defaultStyle: true,
      value: versionCrumb(`v3.0.0`),
      className: "version-crumb",
    },
    v3Sidebar,
  ],
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
};

export default sidebars;
