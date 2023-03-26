################################################################
#
#  Multi staged Dockerfile for Node.js
#
#  Contains stages for development and production
#
#  Author: Robert Barachini
#
#  Last updated: 2023-03-26
#
################################################################

################################################################
#  STAGE: 📦 Base image
################################################################

# https://hub.docker.com/_/node/tags?name=18.15.0-slim
# Current vulnerabilities: 0
FROM node:18.15.0-slim as base

LABEL maintainer="Robert Barachini"

WORKDIR /usr/src/app

# pnpm
COPY ["package.json", "pnpm-lock.yaml", "./"]

# If using npm, uncomment the following line
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

################################################################
#  STAGE: 🏗️ Build production
################################################################

FROM base as build-production

ENV NODE_ENV=production

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod
# RUN pnpm cache clean --force

# If you prefer npm
# RUN npm ci
# RUN npm cache clean --force

COPY --chown=node:node ./src ./src

################################################################
#  STAGE: 🏗️ Build development
################################################################

FROM base as build-development

ENV NODE_ENV=development

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# If you prefer npm
# RUN npm install
# RUN npm install -g nodemon

COPY --chown=node:node ./src ./src

################################################################
#  STAGE: ⚙️ Run development
################################################################

FROM build-development as development

ENV NODE_ENV=development

USER node

# CMD pnpm run dev
CMD ls -la node_modules && pnpm run dev

################################################################
#  STAGE: ⚙️ Run production
################################################################

FROM build-production as production

ENV NODE_ENV=production

USER node

CMD ["node", "src/server/index.js"]
