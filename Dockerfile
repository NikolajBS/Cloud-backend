FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install deepai

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000
