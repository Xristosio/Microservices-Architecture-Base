# Use Node.js official image as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Define the argument
ARG MY_VAR

# Expose the port that the app will run on
EXPOSE $MY_VAR

# Define the command to run the application
CMD ["node", "consumer.js"]
