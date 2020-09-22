FROM node:alpine

WORKDIR /usr/app/cadastroApi

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3333

CMD [ "yarn", "dev" ]