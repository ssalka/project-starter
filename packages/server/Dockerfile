# Build stage
FROM node:24.12-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all needed package.json files
COPY packages/server/package.json packages/server/
COPY packages/common/package.json packages/common/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest
COPY packages/server packages/server
COPY packages/common packages/common

COPY tsconfig.json .

# Build the server package + its package dependencies
RUN pnpm --filter=server... build

# Production stage
FROM node:24.12-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/server/package.json ./packages/server/
COPY packages/common/package.json ./packages/common/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built files from builder
COPY --from=builder /app/packages/server/build ./packages/server/build
COPY --from=builder /app/packages/common/build ./packages/common/build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE ${PORT}

# FIXME these aren't working
# Add image metadata
# LABEL org.opencontainers.image.description "Docker image for a project starter (server)"
# LABEL org.opencontainers.image.source "https://github.com/ssalka/project-starter"

WORKDIR /app/packages/server

# Start the server
CMD ["pnpm", "start"]
