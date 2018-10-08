FROM weboaks/node-karma-protractor-chrome:alpine-node9
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
ADD package.json /usr/src/app/package.json

COPY . .

CMD npm e2e

# base image
FROM node:9.6.1-alpine

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
ADD package.json /usr/src/app/package.json

RUN npm test
RUN npm install

# add app
COPY . .

# start app
CMD npm start
