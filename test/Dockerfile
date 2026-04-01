# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.59.0-noble@sha256:11707c5282fec52f0705aad3a23f46b3409b3de4aed378b3dbe118d8b8c87b67

# Set the work directory for the application
WORKDIR app

# COPY the needed files to the app folder in Docker image
COPY .. .

# Install the dependencies in Node environment
RUN npm install --only=dev

# Install browsers
RUN npx playwright install --with-deps chromium

# Run tests
CMD ["npm", "run", "test:e2e"]
