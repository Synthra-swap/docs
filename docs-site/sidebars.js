// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Synthra Swap documentation sidebar
  tutorialSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'pools',
        'concentrated-liquidity',
        'swaps',
        'fees',
        'treasury-fee',
      ],
    },
    {
      type: 'category',
      label: 'Interface Guide',
      items: [
        'swap',
        'pool',
        'add-liquidity',
        'remove-liquidity',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'tokenomics',
        'treasury-mechanism',
        'buyback-program',
      ],
    },
    {
      type: 'category',
      label: 'Protocol',
      items: [
        'architecture',
        'smart-contracts',
        'security',
        'audits',
        'errors',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: [
        'sdk',
        'api',
        'integration',
        'examples',
      ],
    },
    'faq',
  ],
};

export default sidebars;
