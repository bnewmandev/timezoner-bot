FROM node:20.11.1-alpine AS base

COPY package.json ./
COPY yarn.lock ./
COPY ./src ./src
RUN yarn install
RUN yarn build

CMD [ "dist/index.js" ]