# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first (better layer caching)
COPY backend/package*.json ./

RUN npm install --omit=dev

# Copy backend source code
COPY backend/ ./

# Copy frontend into public/
RUN mkdir -p public
COPY frontend/ public/

# Expose backend port
EXPOSE 3000

# Start backend using the start script
CMD ["node", "app.js"]