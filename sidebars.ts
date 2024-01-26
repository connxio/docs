import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import {
  versionCrumb,
  versionSelector,
} from "docusaurus-plugin-openapi-docs/lib/sidebars/utils";
import versions from "./docs/reference/versions.json";

import v1Sidebar from "./docs/reference/1.0.0/sidebar";
import v2Sidebar from "./docs/reference/sidebar";

const sidebars: SidebarsConfig = {
  connxioSidebar: [{ type: "autogenerated", dirName: "." }],
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
