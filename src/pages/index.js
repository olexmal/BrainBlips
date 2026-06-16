import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.heroEyebrow}>Personal knowledge base</p>
        <h1 className={clsx('hero__title', styles.heroTitle)}>{siteConfig.title}</h1>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/optical-network-copilot/project-overview">
            Optical Network Copilot
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/docker/introduction">
            DevOps guides
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="A personal knowledge base covering AI, Machine Learning, Docker, Optical Network Engineering, and Development Best Practices">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
