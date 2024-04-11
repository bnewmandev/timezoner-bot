FROM node:20.11.1-alpine AS base

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY src ./src
COPY tsconfig.json ./

RUN yarn build

FROM node:20.11.1-alpine AS prod
COPY --from=base /dist /dist
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production

CMD [ "dist/index.js" ]