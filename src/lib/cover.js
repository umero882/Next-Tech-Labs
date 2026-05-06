/**
 * Generates inline-style CSS for project covers.
 * Each project carries `cover.tokens` — a 2- or 3-color seed.
 * We compose distinct visual covers from these without using image assets.
 *
 * Variants chosen by `cover.type`:
 *   'mesh'    — soft radial gradient mesh
 *   'stripes' — diagonal stripe pattern
 *   'grid'    — overlaid grid lines on a gradient
 *   'orb'     — single offset orb on a deep base
 */
export function buildCoverStyle({ type = 'mesh', tokens = ['#7F4DF3', '#27C45A'], image, position = 'center', size = 'cover' } = {}) {
  const [a, b, c = a] = tokens;

  switch (type) {
    case 'image':
      return {
        backgroundImage: `url(${image})`,
        backgroundSize: size,
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0D1117',
      };

    case 'stripes':
      return {
        backgroundImage: `
          repeating-linear-gradient(135deg, ${a}22 0 6px, transparent 6px 14px),
          linear-gradient(135deg, ${b} 0%, ${a} 100%)
        `,
      };

    case 'grid':
      return {
        backgroundImage: `
          linear-gradient(${a}33 1px, transparent 1px),
          linear-gradient(90deg, ${a}33 1px, transparent 1px),
          radial-gradient(circle at 30% 30%, ${b} 0%, ${c} 100%)
        `,
        backgroundSize: '24px 24px, 24px 24px, 100% 100%',
      };

    case 'orb':
      return {
        backgroundImage: `
          radial-gradient(circle at 70% 35%, ${a} 0%, transparent 55%),
          radial-gradient(circle at 20% 80%, ${b}66 0%, transparent 50%),
          linear-gradient(180deg, #161B22 0%, #0D1117 100%)
        `,
      };

    case 'mesh':
    default:
      return {
        backgroundImage: `
          radial-gradient(at 20% 20%, ${a}88 0%, transparent 50%),
          radial-gradient(at 80% 0%,  ${b}66 0%, transparent 50%),
          radial-gradient(at 80% 80%, ${c}55 0%, transparent 50%),
          linear-gradient(180deg, #161B22 0%, #0D1117 100%)
        `,
      };
  }
}
