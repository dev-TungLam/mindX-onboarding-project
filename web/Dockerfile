# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG VITE_GA_MEASUREMENT_ID
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID
RUN npm run build

# Production Stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Default nginx config is usually fine for SPA if we just serve /
# But for client-side routing, we might need a custom config to fallback to index.html
# For now, let's keep it simple. If we need custom config, we'll add it.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
