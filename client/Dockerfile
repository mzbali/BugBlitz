# Base Stage: Use Node.js 20 Alpine as the base image
FROM node:20-alpine AS base

# Stage for Installing Dependencies
FROM base AS deps
# Install libc6-compat as needed for some Node.js modules
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files and install dependencies with pnpm
COPY package.json pnpm-lock.yaml ./
RUN yarn global add pnpm
RUN NODE_ENV=development pnpm i --frozen-lockfile
RUN pnpm add sharp

# Stage for Building the Application
FROM base AS builder
WORKDIR /app
# Copy dependencies from the "deps" stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Uncomment the following line to disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application using pnpm
RUN yarn build

# Production Stage: Copy files for running the application
FROM base AS runner
WORKDIR /app

# Set environment variables for production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create system user and group for running the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public directory to the production image
COPY --from=builder /app/public ./public

# Set permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user for better security
USER nextjs

# Expose port 3000
EXPOSE 3000

# Set hostname to listen on all available network interfaces
ENV HOSTNAME 0.0.0.0

# Command to run the server
CMD ["node", "server.js"]