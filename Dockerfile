FROM node:lts-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies without running scripts
RUN npm install --ignore-scripts

# Copy the rest of the source code
COPY . .

# Build the project
RUN npm run build

# Set the entrypoint to run the MCP server
CMD ["node", "dist/index.js"]