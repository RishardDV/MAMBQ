// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mambSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Guías',
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
      items: [
        'arquitectura/overview',
        'arquitectura/frontend',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'api/endpoints',
        'api/obras',
      ],
    },
  ],
};

export default sidebars;
