# Use a base image with Node.js for the backend
FROM node:16 AS backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy package.json and package-lock.json to install dependencies
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend/ .

# Build the backend (if needed)
# RUN npm run build

# Use a different base image with Node.js for the frontend
FROM node:16 AS frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to install dependencies
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ .

# Build the frontend (if needed)
# RUN npm run build

# Use a production-ready base image for the final image
FROM node:16-alpine

# Create a working directory for the combined app
WORKDIR /app

# Copy the built backend and frontend from their respective images
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/frontend /app/frontend

# Expose the necessary ports
EXPOSE 3000 

# Set environment variables if needed
# ENV NODE_ENV production

# Command to start the application
CMD ["node", "backend/server.js"]
