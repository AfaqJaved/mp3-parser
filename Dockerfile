# Use an official Node.js runtime as a base image
FROM node:16.20.2

# Set the working directory inside the container
WORKDIR /usr/src/app


# Copy the application files to the working directory
COPY . .

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# Install app dependencies
RUN npm install --omit=dev

RUN npm install -g @nestjs/cli



# RUN npm install
RUN npm run build --verbose


# Expose the port on which the app will run
EXPOSE 3000



# Command to run the application
CMD ["npm", "run", "start:prod"]
