# ==========================================
# Multi-stage Dockerfile for MPSC Aspirant Prep (Optimized)
# ==========================================

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install dependencies with fast flags (preventing network hang/concurrency locks)
RUN npm install --no-audit --no-fund --legacy-peer-deps

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

# Copy runtime package.json
COPY package.json ./

# Copy lightweight production node_modules directly from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy compiled build output & public assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Expose app port
EXPOSE 3000

# Health check (Use 127.0.0.1 to avoid Alpine IPv6 localhost resolution mismatch)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

# Start production server
CMD ["node", "dist/server.cjs"]
