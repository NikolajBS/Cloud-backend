FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci
# test if below works
RUN npm install deepai

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000