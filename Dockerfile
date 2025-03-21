FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Environment variables
ENV HOME_ASSISTANT_URL=""
ENV HOME_ASSISTANT_TOKEN=""

# Command will be provided by smithery.yaml
CMD ["node", "dist/index.js"]
