# ---- Build stage ----
# Astro 7 requires Node >= 22.12.
FROM node:26-alpine AS builder

WORKDIR /app

# Install dependencies first so this layer caches across source changes.
# NODE_ENV is deliberately NOT set to production here: the build needs the
# devDependencies (astro, @astrojs/check, typescript).
COPY package*.json ./
RUN npm ci

COPY . .

# Runs `astro check && astro build` — a type error fails the image build.
RUN npm run build

# ---- Serve stage ----
# Unprivileged nginx: the process runs as a non-root user and listens on 8080.
FROM nginxinc/nginx-unprivileged:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Snippets dir, not conf.d: nginx auto-loads conf.d/*.conf, and the header
# snippet must only apply where it is explicitly include'd.
COPY nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf
# Files stay root-owned and world-readable: the nginx user can serve them
# but a compromised worker cannot rewrite the site content.
COPY --from=builder /app/dist /usr/share/nginx/html

# The base image already drops privileges; declare it explicitly so image
# scanners (Trivy DS002) and Kubernetes runAsNonRoot admission checks can
# verify it statically. 101 is the nginx user in nginx-unprivileged.
USER 101

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
