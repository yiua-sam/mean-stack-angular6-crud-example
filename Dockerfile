# base image
FROM node:9.6.1-alpine

ARG var
# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
ADD package.json /usr/src/app/package.json

RUN npm config set proxy null
RUN npm install

# add app
COPY . .

# start app

RUN npm config set mean-angular6:context '${var}'
CMD ["npm", "start"]
