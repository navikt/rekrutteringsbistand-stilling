FROM navikt/node-express:12.2.0-alpine

WORKDIR /usr/src/app

COPY dist/ dist/
COPY server/ ./

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]