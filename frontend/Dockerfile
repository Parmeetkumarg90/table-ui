ARG NODE_IMAGE=node:20.15.1-alpine3.20

FROM $NODE_IMAGE AS base
WORKDIR /app
RUN apk --no-cache add dumb-init && \
    mkdir -p /app && chown node:node /app
USER node

FROM base AS development
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN npm ci && npm cache clean --force
RUN npm run build && npm prune --production

FROM base AS production
WORKDIR /app
COPY --chown=node:node --from=development /app/public ./public
COPY --chown=node:node --from=development /app/.next/standalone ./
COPY --chown=node:node --from=development /app/.next/static ./.next/static

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=8001
EXPOSE 8001

CMD ["dumb-init", "node", "server.js"]