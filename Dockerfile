FROM node:20 AS builder

WORKDIR /app

RUN yarn set version 1.22.19
RUN yarn --no-progress --non-interactive --cache-folder /tmp/.yarn --production --network-timeout 1000000 --prefer-offline
RUN yarn build

COPY dist/ ./

FROM backblazeit/b2:latest AS runner

WORKDIR /app
COPY --from=builder /app .

ARG B2_APPKEY_ID
ARG B2_APPKEY
ARG SOURCE_DIR
ARG TARGET_DIR
ARG B2_BUCKET

RUN b2 authorize-account ${B2_APPKEY_ID} ${B2_APPKEY}
RUN b2 sync --delete --replaceNewer ${SOURCE_DIR} ${B2_BUCKET}/${TARGET_DIR}
