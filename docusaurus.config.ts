// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { themes } from "prism-react-renderer";

const organizationName = "connxio";
const projectName = "docs";

const config: Config = {
  title: "Connxio Documentation",
  staticDirectories: ["static"],
  tagline: "Connxio Integration Engine",
  projectName: projectName,
  organizationName: organizationName,
  trailingSlash: true,
  url: `https://${organizationName}.github.io`,
  baseUrl: `/`,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "ignore",
  favicon: "img/favicon.ico",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          path: "docs",
          sidebarPath: "./sidebars.ts",
          sidebarCollapsed: true,
          docRootComponent: "@theme/DocRoot",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          connxio: {
            specPath:
              "https://api.connxio.com/definition/v2/openapi.yaml?omit-version=false&omit-api-prefix=true",
            outputDir: "docs/reference",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
            version: "2.0.0", // Current version
            label: "v2.0.0", // Current version label
            baseUrl: "/reference/connxio-api",
            versions: {
              "1.0.0": {
                specPath:
                  "https://api.connxio.com/definition/v1/openapi.yaml?omit-version=false&omit-api-prefix=true",
                outputDir: "docs/reference/1.0.0", // No trailing slash
                label: "v1.0.0",
                baseUrl: "/docs/reference/1.0.0/connxio-api",
              },
            },
            downloadUrl:
              "https://api.connxio.com/definition/v2/openapi.yaml?omit-api-prefix=true",
          } satisfies OpenApiPlugin.Options,
        },
      },
    ],
    require.resolve("docusaurus-plugin-image-zoom"),
    [
      require.resolve("./src/plugins/changelog/index.js"),
      {
        blogTitle: "Connxio changelog",
        blogDescription:
          "Keep yourself up-to-date about new features in every release",
        blogSidebarCount: "ALL",
        blogSidebarTitle: "Changelog",
        routeBasePath: "/changelog",
        showReadingTime: false,
        postsPerPage: 20,
        archiveBasePath: null,
        authorsMapPath: "authors.json",
        feedOptions: {
          type: "all",
          title: "Connxio changelog",
          description:
            "Keep yourself up-to-date about new features in every release",
          copyright: `Copyright © ${new Date().getFullYear()} Evidi`,
          language: "en",
        },
      },
    ],
  ],
  themeConfig: {
    metadata: [{ name: "robots", content: "all" }],
    navbar: {
      title: "",
      hideOnScroll: false,
      logo: {
        alt: "Connxio Logo",
        src: "img/connxio-logo.svg",
      },
      items: [
        {
          to: "/",
          label: "Home",
          activeBaseRegex: "^((?!reference|changelog|api).)*$",
        },
        {
          to: "/reference/connxio-api",
          label: "REST API",
          activeBasePath: "reference",
        },
        {
          to: "/changelog",
          label: "Changelog",
          position: "left",
          activeBasePath: "changelog",
        },
        {
          href: "https://app.connxio.com",
          position: "right",
          className: "header-portal-link",
          "aria-label": "Connxio Portal",
        },
        {
          href: "https://github.com/connxio/connxio",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Documentation",
              to: "/",
            },
            {
              label: "Cookie Policy",
              to: "/agreements/cookie-policy",
            },
            {
              label: "Privacy Notice",
              to: "/agreements/privacy-notice",
            },
            {
              label: "Data Processing Agreement",
              to: "/agreements/data-processing-agreement",
            },
          ],
        },
        {
          title: "Pages",
          items: [
            {
              label: "Evidi",
              href: "https://www.evidi.com",
            },
            {
              label: "Connxio",
              href: "https://www.communicate.no/en/connxio",
            },
            {
              label: "Connxio Portal",
              href: "https://portal.connxio.no",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Evidi.`,
    },
    prism: {
      theme: themes.dracula,
      darkTheme: themes.dracula,
      additionalLanguages: ["ruby", "csharp", "php", "java", "powershell"],
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "bash",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
        variant: "requests",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
        variant: "axios",
      },
      {
        highlight: "ruby",
        language: "ruby",
        logoClass: "ruby",
      },
      {
        highlight: "csharp",
        language: "csharp",
        logoClass: "csharp",
        variant: "httpclient",
      },
      {
        highlight: "php",
        language: "php",
        logoClass: "php",
      },
      {
        highlight: "java",
        language: "java",
        logoClass: "java",
        variant: "unirest",
      },
      {
        highlight: "powershell",
        language: "powershell",
        logoClass: "powershell",
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    zoom: {
      selector: ".markdown img",
    },
  } satisfies Preset.ThemeConfig,
  themes: [
    "docusaurus-theme-openapi-docs",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: "/",
        highlightSearchTermsOnTargetPage: false,
        docsDir: "docs",
      ignoreFiles: [/docs\/reference\/1.0.0\/.*/],
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://use.fontawesome.com/releases/v5.11.0/css/all.css",
      type: "text/css",
    },
  ],
};

// module.exports = config;
export default async function createConfig() {
  return config;
}
