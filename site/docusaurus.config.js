// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Connxio Documentation",
  staticDirectories: ["static"],
  tagline: "Connxio Integration Engine",
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
    // [
    //   "@docusaurus/preset-classic",
    //   /** @type {import('@docusaurus/preset-classic').Options} */
    //   ({
    //     docs: {
    //       routeBasePath: "/",
    //       path: "../docs",
    //       sidebarPath: require.resolve("./sidebars.js"),
    //       sidebarCollapsed: true,
    //     },
    //     blog: false,
    //     theme: {
    //       customCss: require.resolve("./src/css/custom.css"),
    //     },
    //   }),
    // ],
    [
      "docusaurus-preset-openapi",
      /** @type {import('docusaurus-preset-openapi').Options} */
      {
        api: {
          path: "./openapi/openapi-v2.yaml",
          routeBasePath: "/api",
        },
        docs: {
          routeBasePath: "/",
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsed: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    require.resolve("docusaurus-plugin-image-zoom"),
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
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: "robots", content: "#{ seo }#" }],
      navbar: {
        title: "",
        hideOnScroll: false,
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
            label: "Connxio Portal",
            position: "left",
          },
          {
            href: "https://www.communicate.no/en/connxio",
            label: "About Connxio",
            position: "left",
          },
          {
            href: "https://www.evidi.com",
            label: "Evidi",
            position: "left",
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
        copyright: `Copyright © ${new Date().getFullYear()} Evidi`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp"],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      zoom: {
        selector: ".markdown img",
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
