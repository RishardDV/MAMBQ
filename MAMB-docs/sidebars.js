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
      ],
    },
    {
      type: 'category',
      label: 'Arquitectura',
      items: [
        'arquitectura/overview',
        'arquitectura/frontend',
        'arquitectura/base-de-datos',
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
