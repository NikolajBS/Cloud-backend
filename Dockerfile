FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install openai

COPY . .

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000
