#Use official Node.JS image version latest
FROM node:20.11.1

#Set working directory in the container
WORKDIR /app

#Copy package.json and package-lock.json to the container
COPY package-lock.json /app/

#Install dependencies
RUN npm Install

#Copy the rest of the application code to the container
COPY . /app

#Expose port 3002 (or any other port application is running on)
EXPOSE 3002

# Command to run the application
CMD ["npm", "run", "dev"]