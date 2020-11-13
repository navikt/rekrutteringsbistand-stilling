const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;

const writeEnvironmentVariablesToFile = () => {
    const fileContent =
        `window.STILLING_REKRUTTERINGSBISTAND_BASE_URL="${process.env.REKRUTTERINGSBISTAND_BASE_URL}";\n` +
        `window.STILLING_LOGIN_URL="${process.env.LOGIN_URL}";\n` +
        `window.STILLING_VIS_STILLING_URL="${process.env.VIS_STILLING_URL}";\n`;

    fs.writeFile(path.resolve(__dirname, 'build/static/js/env.js'), fileContent, (err) => {
        if (err) throw err;
    });
};

const basePath = '/rekrutteringsbistand-stilling';
const buildPath = path.join(__dirname, 'build');

const startServer = () => {
    writeEnvironmentVariablesToFile();

    app.use(`${basePath}/static`, express.static(buildPath + '/static'));
    app.use(`${basePath}/asset-manifest.json`, express.static(`${buildPath}/asset-manifest.json`));

    app.get(`${basePath}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${basePath}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(port, () => {
        console.log('Server kjører på port', port);
    });
};

startServer();
