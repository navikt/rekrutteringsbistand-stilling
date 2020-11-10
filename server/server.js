const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const fs = require('fs');
const compression = require('compression');

const currentDirectory = __dirname;
const server = express();
const port = process.env.PORT || 8080;
server.set('port', port);

server.use(compression());
server.disable('x-powered-by');
server.use(helmet());

server.set('views', `${currentDirectory}`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const writeEnvironmentVariablesToFile = () => {
    const fileContent =
        `window.STILLING_REKRUTTERINGSBISTAND_BASE_URL="${process.env.REKRUTTERINGSBISTAND_BASE_URL}";\n` +
        `window.STILLING_LOGIN_URL="${process.env.LOGIN_URL}";\n` +
        `window.STILLING_VIS_STILLING_URL="${process.env.VIS_STILLING_URL}";\n`;

    fs.writeFile(path.resolve(__dirname, 'dist/js/env.js'), fileContent, (err) => {
        if (err) throw err;
    });
};

const renderApp = (htmlPages) =>
    new Promise((resolve, reject) => {
        server.render('./dist/index.html', htmlPages, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = (html) => {
    writeEnvironmentVariablesToFile();

    const buildPath = path.resolve(__dirname, 'dist');
    const basePath = '/stillinger';

    const pathsForServingApp = [
        `${basePath}`,
        `${basePath}/stilling`,
        `${basePath}/stilling/*`,
        `${basePath}/minestillinger`,
    ];

    const pathsForReadinessAndLiveness = [
        `${basePath}/internal/isAlive`,
        `${basePath}/internal/isReady`,
    ];

    server.use(`${basePath}/js`, express.static(`${buildPath}/js`));
    server.use(`${basePath}/css`, express.static(`${buildPath}/css`));

    server.get(pathsForServingApp, (req, res) => res.send(html));
    server.get(pathsForReadinessAndLiveness, (req, res) => res.sendStatus(200));

    server.listen(port, () => {
        console.log(`Express-server startet. Server filer fra ./dist/ til localhost:${port}/`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

renderApp({}).then(startServer, (error) => logError('Failed to render app', error));
