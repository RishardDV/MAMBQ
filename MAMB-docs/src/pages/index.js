import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const features = [
  {
    title: 'Galería interactiva',
    imgSrc: '/MAMBQ/img/app/app5.jpeg',
    imgAlt: 'Pantalla de galería MAMB',
    description:
      'Los visitantes exploran obras del museo y publicaciones de la comunidad. Filtros por técnica, búsqueda por título o artista, y sistema de ❤️ likes.',
    link: '/guias/uso',
  },
  {
    title: 'API REST documentada',
    emoji: '⚡',
    description:
      'Backend en Node.js + Express. Consulta la referencia completa de endpoints para obras, likes y calificaciones.',
    link: '/api/endpoints',
  },
  {
    title: 'PWA instalable',
    emoji: '📱',
    description:
      'Funciona offline gracias al Service Worker. Instálala en tu móvil como app nativa directamente desde el navegador.',
    link: '/guias/instalacion',
  },
];

function Feature({ imgSrc, imgAlt, emoji, title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureMedia}>
          {imgSrc ? (
            <img src={imgSrc} alt={imgAlt} className={styles.featureImg} />
          ) : (
            <div className={styles.featureEmoji}>{emoji}</div>
          )}
        </div>
        <div className="padding-horiz--md padding-vert--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
          {link && (
            <Link className="button button--sm button--outline button--primary" to={link}>
              Ver más →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/intro">
              Ver documentación
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/guias/instalacion"
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
