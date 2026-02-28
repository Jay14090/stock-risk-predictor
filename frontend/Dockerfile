# ================================
# Frontend Dockerfile
# Stock Risk Predictor
# ================================

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy application code
COPY . .

# Expose the dev server port
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]
