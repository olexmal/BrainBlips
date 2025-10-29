/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'AI & Machine Learning',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'LM Studio',
          items: ['ai/lm-studio/enhancing-deepseek'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Docker',
      collapsed: false,
      items: [
        'docker/introduction',
        'docker/install-docker',
        'docker/install-docker-compose',
      ],
    },
    {
      type: 'category',
      label: 'Optical Network AI Copilot',
      collapsed: false,
      items: [
        'optical-network-copilot/project-overview',
        'optical-network-copilot/system-architecture-diagram',
        'optical-network-copilot/core-architecture',
        'optical-network-copilot/network-operations-copilot',
        'optical-network-copilot/development-copilot',
        'optical-network-copilot/implementation-roadmap',
        'optical-network-copilot/success-factors',
        {
          type: 'category',
          label: 'Claude Integration',
          items: [
            'optical-network-copilot/claude/claude-client',
            'optical-network-copilot/claude/llm-server-requirements',
            'optical-network-copilot/claude/why-problematic',
          ],
        },
        {
          type: 'category',
          label: 'MCP Servers',
          items: [
            'optical-network-copilot/mcp-servers/lab-manager/index',
            'optical-network-copilot/mcp-servers/optical-specialist/index',
            'optical-network-copilot/mcp-servers/t-api-gateway/index',
            'optical-network-copilot/mcp-servers/conversation-example',
          ],
        },
        {
          type: 'category',
          label: 'Prompt Filtering',
          items: ['optical-network-copilot/prompt-filtering/research'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Meta Documentation',
      collapsed: true,
      items: [
        'meta/brainblips-readme',
        'meta/cursor-setup',
        'meta/mcp-servers',
        'meta/project-structure',
        'meta/ai-skills-system',
      ],
    },
  ],
};

export default sidebars;

