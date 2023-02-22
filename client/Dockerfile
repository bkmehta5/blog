# User an existing docker image as a base
FROM node:16-alpine

ENV CI=true
ENV WSD_SOCKET_PORT=0

WORKDIR /usr/app

# Download an install a dependency
COPY ./package.json  ./
RUN npm install
COPY ./ ./

#Tell the image wgat to do it start 
#as a container
CMD ["npm", "start"]