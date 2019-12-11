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

server.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            fontSrc: ["'self'", 'data:'],
            imgSrc: ["'self'", 'data:'],
            connectSrc: [
                "'self'",
                `${process.env.REKRUTTERINGSBISTAND_BASE_URL}/features/`,
                process.env.REKRUTTERINGSBISTAND_API_URL,
                process.env.REKRUTTERING_API_URL,
                process.env.REKRUTTERINGSBISTAND_API_SEARCH_URL,
            ],
        },
    })
);

server.set('views', `${currentDirectory}`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const writeEnvironmentVariablesToFile = () => {
    const fileContent =
        `window.__REKRUTTERINGSBISTAND_BASE_URL__="${process.env.REKRUTTERINGSBISTAND_BASE_URL}";\n` +
        `window.__PAM_AD_API__="${process.env.REKRUTTERINGSBISTAND_API_URL}";\n` +
        `window.__REKRUTTERING_API__="${process.env.REKRUTTERING_API_URL}";\n` +
        `window.__PAM_SEARCH_API__="${process.env.REKRUTTERINGSBISTAND_API_SEARCH_URL}";\n` +
        `window.__PAM_CONTEXT_PATH__="";\n` +
        `window.__PAM_LOGIN_URL__="${process.env.LOGIN_URL}";\n` +
        `window.__PAM_KANDIDATLISTE_API_URL__="/kandidater/rest/veileder";\n`;

    fs.writeFile(path.resolve(__dirname, 'dist/js/env.js'), fileContent, err => {
        if (err) throw err;
    });
};
const renderApp = htmlPages =>
    new Promise((resolve, reject) => {
        server.render('./dist/index.html', htmlPages, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = html => {
    writeEnvironmentVariablesToFile();

    server.use('/js', express.static(path.resolve(__dirname, 'dist/js')));
    server.use('/css', express.static(path.resolve(__dirname, 'dist/css')));

    server.get(/^\/(?!.*dist).*$/, (req, res) => {
        console.info('> Treffer ikke /dist');
        res.send(html);
    });

    server.get('/internal/isAlive', (req, res) => res.sendStatus(200));
    server.get('/internal/isReady', (req, res) => res.sendStatus(200));

    server.listen(port, () => {
        console.log(`Express-server startet. Server filer fra ./dist/ til localhost:${port}/`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

renderApp({}).then(startServer, error => logError('Failed to render app', error));
