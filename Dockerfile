FROM node:16.14-alpine

RUN apk add --no-cache tzdata
ENV TZ America/Sao_Paulo

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm","run", "start:prod" ]
