export const company = {
  name: 'Next Tech Labs',
  short: 'NTL',
  tagline: 'We build the products people actually use.',
  manifesto:
    'A software studio shipping mobile, web, AI, and infrastructure products. Same modular architecture across every project. Same rig running every deployment. Same operator answering the email.',
  founded: 2024,
  location: 'Operating across the GCC and East Africa.',
  brands: [
    {
      name: 'NextechLabs',
      role: 'The studio.',
      description: 'Where mobile, web, and AI products get designed and shipped.',
    },
    {
      name: 'Real News Hub',
      role: 'The media arm.',
      description: 'Multi-platform news brand across YouTube, Instagram, Facebook, and TikTok.',
    },
  ],
  channels: {
    email: 'help@nextechlabs.org',
    whatsapp: 'https://wa.me/971585868560',
    whatsappLabel: '+971 58 586 8560',
  },
  // Add real social URLs here when handles are live; UI gracefully hides
  // the social blocks while this array is empty.
  socials: [],
  rig: {
    host: 'Hostinger VPS',
    runtime: 'Docker',
    proxy: 'Nginx',
    metrics: 'Prometheus',
    dashboards: 'Grafana',
    logs: 'Loki',
  },
};
