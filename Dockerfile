# Base image for Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy backend files
COPY backend/package*.json ./
RUN npm install
COPY backend .

# Copy frontend files to the public directory
RUN mkdir -p public
COPY frontend public/

# Expose port and start the backend
EXPOSE 3000
CMD ["npm", "start"]

