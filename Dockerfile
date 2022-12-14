# Build BASE
FROM node:16-alpine as BASE

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


# Build Image
FROM node:16-alpine AS BUILD

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache curl \ 
    && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
    && apk del curl \
    && npm run build \
    && cd build/standalone \
    && node-prune


# Build production
FROM node:16-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.js ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/build/standalone ./
COPY --from=BUILD /app/build/static ./build/static


EXPOSE 3000

CMD ["node", "server.js"]
