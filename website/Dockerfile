# Multi-stage Dockerfile for Docusaurus Documentation Site
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN timeout 600 npm run build || (echo "Build timed out" && exit 1)

FROM nginx:alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
RUN mkdir -p /var/run/nginx && chown -R nextjs:nodejs /var/run/nginx
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
