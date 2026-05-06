import { Smartphone, Globe, Brain, Server } from 'lucide-react';

/**
 * Static map from service id → icon component.
 * Direct imports keep tree-shaking effective; do not switch to dynamic lookup.
 */
export const serviceIcons = {
  'mobile-apps':         Smartphone,
  'web-platforms':       Globe,
  'ai-products':         Brain,
  'infra-and-hardening': Server,
};
