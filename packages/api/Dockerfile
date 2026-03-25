# Stage 1: Build frontend
FROM node:20-alpine AS web-build
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/web/package.json ./packages/web/
COPY packages/api/package.json ./packages/api/
RUN npm ci --workspace=packages/web
COPY packages/web/ ./packages/web/
RUN npm run build --workspace=packages/web

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/api/package.json ./packages/api/
RUN npm ci --workspace=packages/api --omit=dev
COPY packages/api/src/ ./packages/api/src/
COPY packages/api/tsconfig.json ./packages/api/
COPY --from=web-build /app/packages/web/dist ./packages/api/public

ENV NODE_ENV=production
EXPOSE 4000

CMD ["npx", "--workspace=packages/api", "tsx", "src/index.ts"]
