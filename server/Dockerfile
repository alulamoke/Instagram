FROM node:15 AS Production

ARG NODE_ENV = production
ARG PORT = 7777

ENV NODE_ENV=${NODE_ENV}
ENV PORT = ${PORT}

WORKDIR /usr/src/api

COPY package.json .

RUN npm install --only=production

COPY . .

CMD ['npm' 'run' 'dev']