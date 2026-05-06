# syntax=docker/dockerfile:1.7

# ─── build stage ────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install deps using lockfile
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Build the static site
COPY . .
RUN npm run build

# ─── runtime stage ──────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# SPA-aware nginx config (history fallback, asset caching, gzip)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets
COPY --from=build /app/dist /usr/share/nginx/html

# Healthcheck endpoint for Coolify
RUN printf 'ok' > /usr/share/nginx/html/healthz

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
