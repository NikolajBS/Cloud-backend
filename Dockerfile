FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000
