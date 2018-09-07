# base image
FROM node:10.10.0

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
ADD package.json /usr/src/app/package.json

RUN npm install
RUN npm install -g @angular/cli@6.0.1

# add app
COPY . /usr/src/app

# start app
CMD npm serve
