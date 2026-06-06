// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mambSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Guias',
      collapsed: false,
      items: [
        'guias/instalacion',
        'guias/uso',
        'guias/landing',
        'guias/render',
        'guias/roadmap-ia',
      ],
    },
    {
      type: 'category',
      label: 'Arquitectura',
      collapsed: false,
      items: [
        'arquitectura/overview',
        'arquitectura/frontend',
        'arquitectura/base-de-datos',
      ],
    },
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [
        'api/endpoints',
        'api/obras',
      ],
    },
  ],
};

export default sidebars;
