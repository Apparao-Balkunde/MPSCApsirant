# ==========================================
# Multi-stage Dockerfile for MPSC Aspirant Prep
# ==========================================

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install dependencies (including devDependencies for vite/esbuild)
RUN npm install --legacy-peer-deps

# Copy application source code
COPY . .

# Build Vite frontend & bundled backend server (dist/server.cjs)
RUN npm run build

# ==========================================
# Stage 2: Production runner stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --legacy-peer-deps && npm cache clean --force

# Copy compiled build output from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Expose app port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start production server
CMD ["node", "dist/server.cjs"]
