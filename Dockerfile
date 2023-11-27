FROM node:alpine AS builder

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY . .
RUN corepack enable && \
    pnpm install && \
    pnpm build && \
    pnpm prune --prod


FROM node:alpine AS runtime

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN apk --no-cache add curl && corepack enable

# can be minimized with copy only dist, prisma, vendor and node_modules directories
COPY --from=builder /app /app
WORKDIR /app

ENTRYPOINT ["node", "dist/main.js"]
