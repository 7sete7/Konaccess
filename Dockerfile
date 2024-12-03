FROM node:20 AS builder

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY src/ ./src/
COPY public/ ./public/
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY components.json ./
COPY index.html ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
ARG VITE_KONECTY_URL
ARG VITE_KONECTY_TOKEN

ENV VITE_KONECTY_URL=${VITE_KONECTY_URL}
ENV VITE_KONECTY_TOKEN=${VITE_KONECTY_TOKEN}

RUN yarn set version 1.22.19
RUN yarn --no-progress --non-interactive --cache-folder /tmp/.yarn --production --network-timeout 1000000 --prefer-offline
RUN yarn build

COPY dist/ ./

FROM backblazeit/b2:latest AS runner

WORKDIR /app
COPY --from=builder /app/dist/ .

ARG B2_APPKEY_ID
ARG B2_APPKEY
ARG B2_BUCKET
ARG TARGET_DIR

RUN b2 account authorize ${B2_APPKEY_ID} ${B2_APPKEY}
RUN b2 sync --delete --replace-newer . b2://${B2_BUCKET}/${TARGET_DIR}
