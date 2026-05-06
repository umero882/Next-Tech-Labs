export const services = [
  {
    id: 'mobile-apps',
    title: 'Mobile applications',
    summary:
      'Production React Native + Expo apps. Built around your real users, shipped through the stores, maintained as living products — not handed-off PowerPoints.',
    deliverables: [
      'iOS and Android single codebase (Expo SDK)',
      'Auth, real-time data, push notifications wired end-to-end',
      'Store submission and review-cycle handling',
      'Modular monorepo so the next app reuses 70% of the last one',
    ],
  },
  {
    id: 'web-platforms',
    title: 'Web platforms',
    summary:
      'Marketplaces, dashboards, learning systems, storefronts. We pick the right stack for the job — Next.js when SSR matters, plain Vite + React when it doesn\'t.',
    deliverables: [
      'Marketplace and multi-sided platforms with role-based access',
      'Internal tools and admin dashboards',
      'Content + commerce front-ends with CMS-friendly architecture',
      'Performance budgets enforced from day one',
    ],
  },
  {
    id: 'ai-products',
    title: 'AI-native products',
    summary:
      'Real LLM products, not chatbot-skinned wrappers. We design the loop, the policy gates, the evals — then we ship.',
    deliverables: [
      'Voice and text agent flows on Claude / OpenAI / open models',
      'Generative content pipelines (video, image, copy)',
      'Closed-loop systems with critic/judge evaluation built in',
      'Production-grade prompt versioning, observability, and cost controls',
    ],
  },
  {
    id: 'infra-and-hardening',
    title: 'Infrastructure & hardening',
    summary:
      'The rig that runs your product. Docker, Nginx, Prometheus, Grafana, Loki — boring on purpose, monitored on principle.',
    deliverables: [
      'VPS provisioning, hardening, and migration off bigger clouds when sensible',
      'Reverse-proxy, TLS, zero-downtime deploys',
      'Metrics + logs + alerts pipeline',
      'Incident playbooks and (optionally) autonomous remediation via SentinelAI',
    ],
  },
];
