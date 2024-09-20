################################################################
#
#  Multi-staged Dockerfile for Node.js
#
#  Contains stages for development and production
#
#  Author: Robert Barachini
#
#  Last updated: 2024-09-20
#
################################################################

################################################################
#  STAGE: 📦 Base image
################################################################

# https://hub.docker.com/_/node/tags?name=22.9.0-slim
# Current vulnerabilities: 0 0 0 23 0 ; Critical High Medium Low Unspecified
FROM node:22.9.0-slim AS base

# Set labels
LABEL maintainer="Robert Barachini"

# Set the working directory
WORKDIR /usr/src/app

# Install pnpm globally (cache)
RUN npm install -g pnpm

# Copy package.json and lock file
COPY ["package.json", "pnpm-lock.yaml", "./"]
# COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "./"] # If using .npmrc for private packages

################################################################
#  STAGE: 🏗️ Build - Install dependencies
################################################################

FROM base AS build

# Install dependencies based on environment
RUN if [ "$NODE_ENV" = "development" ]; then \
		pnpm install --frozen-lockfile; \
	else \
		pnpm install --frozen-lockfile --prod; \
	fi

################################################################
#  STAGE: 🏗️ App - Copy application code and prepare for runtime
################################################################

FROM base AS app

# NOTE: This ensures that only the needed files are copied to the final image
#       without polluting (or possibly leaking) the final image with unnecessary layers.
#       If you decide to modify the workflow, make sure to inspect the build context
#       and the final image and its layers.

# Copy the application code
COPY --chown=node:node ./src ./src

# Ensure logs directory exists
RUN mkdir -p /usr/src/app/logs

# Ensure the node user owns the application directory
# RUN chown -R node:node /usr/src/app

# Copy node_modules from build stage
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules

# Set user to node
USER node

################################################################
#  STAGE: ⚙️ Run development
################################################################

FROM app AS development

# Set environment to development
ENV NODE_ENV=development

# Run package.json script
CMD pnpm run dev

################################################################
#  STAGE: ⚙️ Run production
################################################################

FROM app AS production

# Set environment to production
ENV NODE_ENV=production

# Run server in production mode
CMD ["node", "src/server/index.js"]
