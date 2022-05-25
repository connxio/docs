// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ConnXio Documentation",
  tagline: "ConnXio Integration Engine",
  url: "https://docs.connxio.no",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "ignore",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "communicatenorge", // Usually your GitHub org/user name.
  projectName: "connxio-doc", // Usually your repo name.
  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en"],
  // },
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: "https://github.com/communicatenorge/connxio-doc/tree/main/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "agreements",
        path: "agreements",
        routeBasePath: "agreements",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "",
        logo: {
          alt: "Connxio Logo",
          src: "img/connxio-logo.svg",
        },
        items: [
          {
            href: "https://portal.connxio.no",
            label: "ConnXio Portal",
            position: "left",
          },
          {
            href: "https://www.communicate.no/en/connxio",
            label: "About ConnXio",
            position: "left",
          },
          {
            href: "https://www.communicate.no",
            label: "Communicate Norge",
            position: "left",
          },
          {
            href: "https://github.com/communicatenorge/connxio-doc",
            label: "GitHub",
            position: "right",
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
                label: "Communicate",
                href: "https://www.communicate.no",
              },
              {
                label: "ConnXio",
                href: "https://www.communicate.no/en/connxio",
              },
              {
                label: "ConnXio Portal",
                href: "https://portal.connxio.no",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Communicate Norge. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    }),
  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: "/",
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
};

module.exports = config;
