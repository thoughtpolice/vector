module.exports = {
  title: 'Vector',
  tagline: 'A High-Performance, Logs, Metrics, & Events Router',
  url: 'https://vector.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'timberio',
  projectName: 'vector',
  customFields: {
    metadata: require('./metadata'),
  },
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Vector',
        src: 'img/logo-light.svg',
        darkSrc: 'img/logo-dark.svg'
      },
      links: [
        {to: 'components', label: 'Components', position: 'right'},
        {to: 'docs', label: 'Docs', position: 'right'},
        {to: 'blog', label: 'Blog', position: 'right'},
        {to: 'download', label: 'Download', position: 'right'},
        {
          href: 'https://github.com/timberio/vector',
          label: "GitHub",
          position: 'right',
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    footer: {
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'What is Vector?',
              to: 'docs/about/what-is-vector',
            },
            {
              label: 'Concepts',
              to: 'docs/about/concepts',
            },
            {
              label: 'Data Model',
              to: 'docs/about/data-model',
            },
            {
              label: 'Guarantees',
              to: 'docs/about/guarantees',
            },
          ],
        },
        {
          title: 'Components',
          items: [
            {
              label: 'Sources',
              to: 'docs/components/sources',
            },
            {
              label: 'Transforms',
              to: 'docs/components/trasnforms',
            },
            {
              label: 'Sinks',
              to: 'docs/components/sinks',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Install',
              to: 'docs/setup/installation',
            },
            {
              label: 'Deployment',
              to: 'docs/setup/deployment',
            },
            {
              label: 'Configuration',
              to: 'docs/setup/configuration',
            },
            {
              label: 'Administration',
              to: 'docs/administration',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Chat',
              to: 'https://chat.vector.dev',
            },
            {
              label: 'Github',
              to: 'https://github.com/timberio/vector',
            },
            {
              label: 'Mailing List',
              to: 'mailing-list',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      logo: {
        alt: 'Timber.io',
        src: '/img/timber-logo.svg',
        href: 'https://timber.io/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Timber, Inc.`,
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          editUrl: 'https://github.com/timberio/vector/edit/master/website/docs/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Ubuntu|Roboto|Source+Code+Pro',
    'https://at-ui.github.io/feather-font/css/iconfont.css',
  ],
};
