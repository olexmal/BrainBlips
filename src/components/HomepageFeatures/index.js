import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M10.5 11 5 17M13.5 11 19 17" />
    </svg>
  );
}

function DevOpsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3a3 3 0 0 0-3 3v1.5" />
      <path d="M12 3a3 3 0 0 1 3 3v1.5" />
      <path d="M6 9.5h12" />
      <path d="M7.5 9.5 6 18h12l-1.5-8.5" />
      <path d="M9.5 14h5" />
      <circle cx="9" cy="6" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="15" cy="6" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

const FeatureList = [
  {
    title: 'Optical Network AI Copilot',
    Icon: NetworkIcon,
    description:
      'Architecture, MCP servers, Claude integration, and implementation roadmaps for AI-assisted network operations.',
    link: '/docs/optical-network-copilot/project-overview',
    linkLabel: 'Project overview',
  },
  {
    title: 'DevOps & Infrastructure',
    Icon: DevOpsIcon,
    description:
      'Docker installation, Compose setup, and lightweight K3s cluster guides for Ubuntu and homelab environments.',
    link: '/docs/docker/introduction',
    linkLabel: 'Docker guides',
  },
  {
    title: 'AI & Machine Learning',
    Icon: AiIcon,
    description:
      'Local LLM workflows with LM Studio, MCP tooling, and patterns for building AI copilots on your own hardware.',
    link: '/docs/ai/lm-studio/enhancing-deepseek',
    linkLabel: 'LM Studio & MCP',
  },
];

const StatsList = [
  {value: '27+', label: 'Documents'},
  {value: '4', label: 'MCP server guides'},
  {value: '3', label: 'DevOps topics'},
];

function Feature({Icon, title, description, link, linkLabel}) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <article className={styles.featureCard}>
        <div className={styles.iconWrap}>
          <Icon />
        </div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
        <Link className={styles.featureLink} to={link}>
          {linkLabel} →
        </Link>
      </article>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <header className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Explore the knowledge base
          </Heading>
          <p className={styles.sectionSubtitle}>
            AI copilots, DevOps guides, and network engineering docs — curated in one place.
          </p>
        </header>

        <div className={clsx('row', styles.featureRow)}>
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>

        <div className={styles.stats} role="list" aria-label="Site highlights">
          {StatsList.map((stat) => (
            <div key={stat.label} className={styles.stat} role="listitem">
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
