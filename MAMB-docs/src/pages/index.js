import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const features = [
  {
    title: 'Galería interactiva',
    img: '🖼️',
    description:
      'Los visitantes suben sus obras, exploran la galería del museo y pueden dar corazones a las piezas de otros artistas.',
  },
  {
    title: 'API REST documentada',
    img: '⚡',
    description:
      'Backend en Node.js + Express con PostgreSQL. Consulta la referencia completa de endpoints para obras, likes y calificaciones.',
  },
  {
    title: 'PWA instalable',
    img: '📱',
    description:
      'Funciona offline gracias al Service Worker. Instálala en tu móvil como app nativa desde el navegador.',
  },
];

function Feature({ img, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--lg">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{img}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/intro"
            >
              Ver documentación
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/guias/instalacion"
              style={{ marginLeft: '1rem' }}
            >
              Instalar la app
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
