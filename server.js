const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const fs = require('fs');


const currentDirectory = __dirname;
const server = express();
const port = process.env.PORT || 8080;
server.set('port', port);

server.disable('x-powered-by');


server.set('views', `${currentDirectory}`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());


const writeEnvironmentVariablesToFile = () => {
    const fileContent =
        `window.__PAM_AD_API__="${process.env.PAMADAPIBACKEND_URL}";\n`+
        `window.__PAM_CONTEXT_PATH__="";\n`+
        `window.__PAM_LOGIN_URL__="${process.env.LOGIN_URL}";\n`;

    fs.writeFile(path.resolve(__dirname, 'dist/js/env.js'), fileContent, (err) => {
        if (err) throw err;
    });
};
const renderApp = (htmlPages) => (
    new Promise((resolve, reject) => {
        server.render(
            './dist/index.html', htmlPages, (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            }
        );
    })
);

const startServer = (html) => {
    writeEnvironmentVariablesToFile();

    server.use('/js', express.static(path.resolve(__dirname, 'dist/js')));
    server.use(
        '/css',
        express.static(path.resolve(__dirname, 'dist/css'))
    );

    server.get(/^\/(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    server.get('/internal/isAlive', (req, res) => res.sendStatus(200));
    server.get('/internal/isReady', (req, res) => res.sendStatus(200));

    server.listen(port, () => {
        console.log(`Express-server startet. Server filer fra ./dist/ til localhost:${port}/`);
    });

};

const logError = (errorMessage, details) => console.log(errorMessage, details);

renderApp({})
    .then(startServer, (error) => logError('Failed to render app', error));
