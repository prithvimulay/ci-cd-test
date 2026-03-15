FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code (tests are excluded by .dockerignore)
COPY src/ ./src/
COPY index.js ./

# Expose the port your app runs on
EXPOSE 3000

# Start the application directly with node (better for Docker than npm start)
CMD ["node", "index.js"]