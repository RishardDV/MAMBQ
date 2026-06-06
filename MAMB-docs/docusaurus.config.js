// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MAMB',
  tagline: 'Galería digital para estudiantes y visitantes del Museo de Arte Moderno de Barranquilla',
  favicon: 'img/favicon.ico',

  url: 'https://risharddv.github.io',
  baseUrl: '/MAMBQ/',

  organizationName: 'risharddv',
  projectName: 'MAMBQ',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/risharddv/MAMBQ/tree/main/MAMB-docs/',
        },
        sitemap: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'MAMB',
        logo: {
          alt: 'Logo MAMB',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mambSidebar',
            position: 'left',
            label: 'Documentación',
          },
          {
            href: 'https://www.mamb.online',
            label: 'App en vivo',
            position: 'right',
          },
          {
            href: 'https://github.com/risharddv/MAMBQ',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentacion',
            items: [
              { label: 'Introduccion', to: '/intro' },
              { label: 'Instalacion', to: '/guias/instalacion' },
              { label: 'Guia de uso', to: '/guias/uso' },
              { label: 'API REST', to: '/api/endpoints' },
            ],
          },
          {
            title: 'Arquitectura',
            items: [
              { label: 'Vista general', to: '/arquitectura/overview' },
              { label: 'Frontend', to: '/arquitectura/frontend' },
              { label: 'Base de datos', to: '/arquitectura/base-de-datos' },
              { label: 'Hoja de ruta IA', to: '/guias/roadmap-ia' },
            ],
          },
          {
            title: 'Proyecto',
            items: [
              {
                label: 'App en vivo (mamb.online)',
                href: 'https://www.mamb.online',
              },
              {
                label: 'Universidad Simon Bolivar',
                href: 'https://www.unisimon.edu.co',
              },
              {
                label: 'Codigo fuente',
                href: 'https://github.com/risharddv/MAMBQ',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MAMB — USB & Museo de Arte Moderno de Barranquilla.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
