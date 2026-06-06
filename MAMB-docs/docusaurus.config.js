// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MAMB',
  tagline: 'Galería digital para estudiantes y visitantes del Museo de Arte Moderno de Barranquilla',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

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
            href: 'https://github.com/risharddv/MAMBQ',
            label: 'Repositorio',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación',
            items: [
              { label: 'Introducción', to: '/intro' },
              { label: 'Instalación', to: '/guias/instalacion' },
              { label: 'API REST', to: '/api/endpoints' },
            ],
          },
          {
            title: 'Arquitectura',
            items: [
              { label: 'Vista general', to: '/arquitectura/overview' },
              { label: 'Frontend', to: '/arquitectura/frontend' },
              { label: 'Hoja de ruta IA', to: '/guias/roadmap-ia' },
            ],
          },
          {
            title: 'Proyecto',
            items: [
              {
                label: 'Universidad Simón Bolívar',
                href: 'https://www.unisimon.edu.co',
              },
              {
                label: 'Código fuente',
                href: 'https://github.com/risharddv/MAMBQ',
              },
              {
                label: 'App en vivo',
                href: 'https://mamb-qsi0.onrender.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MAMB — USB & Museo de Arte Moderno de Barranquilla. Documentación con Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
