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
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
