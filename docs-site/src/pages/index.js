// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';

// import Heading from '@theme/Heading';
// import styles from './index.module.css';

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          Complete documentation for the next-generation concentrated liquidity DEX
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--primary button--lg", styles.getStartedButton)}
            to="/getting-started">
            Get Started
          </Link>
          <Link
            className={clsx("button button--secondary button--lg", styles.launchButton)}
            href="https://app.synthraswap.org">
            Launch App
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
      title={`${siteConfig.title} Documentation`}
      description="Complete documentation for Synthra Swap - Next-generation concentrated liquidity DEX">
      <HomepageHeader />
    </Layout>
  );
}
