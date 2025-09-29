# -----------------------------
# 1. Build Stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy all source files
COPY . .

# Build production assets
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm run build

# -----------------------------
# 2. Production Stage
# -----------------------------
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

# Remove default Nginx files
RUN rm -rf ./*

# Copy built frontend from builder
COPY --from=builder /app/dist ./

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions for non-root Nginx
RUN mkdir -p /var/cache/nginx /var/run/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx

# Expose container port
EXPOSE 80

# Use non-root user
USER nginx

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
