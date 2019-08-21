# Use node
FROM node:12.7.0-alpine

# install simple http server for serving static content
#RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install && npm ls

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Start app when the container is created
CMD [ "npm", "run", "dev" ]
