FROM node:16.16-alpine

WORKDIR /app
EXPOSE 3000

COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install


CMD [ "npm", "start" ]