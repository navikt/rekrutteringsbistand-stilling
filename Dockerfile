FROM node:carbon

WORKDIR /usr/src/app

COPY package.json server.js ./

COPY dist/ ./dist
COPY node_modules/ ./node_modules

EXPOSE 8080

CMD ["npm", "run", "start-express"]