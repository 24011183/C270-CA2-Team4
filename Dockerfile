# --- Build a Node/Express image for To‑Do App ---
# Use a small Node base image
FROM node:20-alpine

# Create the working directory inside the container
WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of app
COPY . .

# Expose the port (Render/Kubernetes reads this)
EXPOSE 3000

# Start cmd
CMD ["node", "server.js"]