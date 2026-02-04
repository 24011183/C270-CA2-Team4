
# using a small Node base image
FROM node:20-alpine

# to make the working directory inside the container
WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of app
COPY . .

# Expose the port 
EXPOSE 3000

# Start cmd
CMD ["node", "server.js"]