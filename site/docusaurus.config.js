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
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
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
        path: "../agreements",
        routeBasePath: "agreements",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      require.resolve("./src/plugins/changelog/index.js"),
      {
        blogTitle: "ConnXio changelog",
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
          title: "Docusaurus changelog",
          description:
            "Keep yourself up-to-date about new features in every release",
          copyright: `Copyright © ${new Date().getFullYear()} EVIDI`,
          language: "en",
        },
      },
    ],
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "changelog",
    //     path: "../changelog",
    //     routeBasePath: "/changelog",
    //     sidebarPath: require.resolve("./sidebars.js"),
    //   },
    // ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: "robots", content: "#{ seo }#" }],
      navbar: {
        title: "",
        logo: {
          alt: "Connxio Logo",
          src: "img/connxio-logo.svg",
        },
        items: [
          {
            href: "/changelog",
            label: "Changelog",
            position: "left",
          },
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
