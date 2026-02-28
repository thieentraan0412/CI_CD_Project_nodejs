# ─── Stage 1: Build ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (layer caching optimization)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY index.js server.js ./

# ─── Stage 2: Production image ────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Copy only production deps + source from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./
COPY --from=builder /app/server.js ./
COPY package.json ./

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
