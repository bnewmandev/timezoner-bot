FROM node:20.11.1

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src ./src
RUN yarn install
RUN yarn build

CMD [ "./dist/index.js" ]