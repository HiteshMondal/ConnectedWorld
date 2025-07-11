# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start Vite dev server
CMD ["npx", "vite", "--host"]
