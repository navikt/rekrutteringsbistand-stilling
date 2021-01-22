const path = require('path');
const express = require('express');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 8080;

const envPath = 'static/js/env.js';

const writeEnvironmentVariablesToFile = () => {
    const fileContent =
        `window.STILLING_LOGIN_URL="${process.env.LOGIN_URL}";\n` +
        `window.STILLING_VIS_STILLING_URL="${process.env.VIS_STILLING_URL}";\n`;

    fs.writeFile(path.resolve(__dirname, `build/${envPath}`), fileContent, (err) => {
        if (err) throw err;
    });
};

const basePath = '/rekrutteringsbistand-stilling';
const buildPath = path.join(__dirname, 'build');

const setupProxy = (fraPath, tilTarget) =>
    createProxyMiddleware(fraPath, {
        target: tilTarget,
        changeOrigin: true,
        secure: true,
        pathRewrite: (path) => {
            const nyPath = path.replace(fraPath, '');
            console.log(`Proxy fra '${path}' til '${tilTarget + nyPath}'`);
            return nyPath;
        },
    });

const manifestMedEnvpath = () => {
    const asset = JSON.parse(fs.readFileSync(`${buildPath}/asset-manifest.json`, 'utf8'));
    if (asset.files) {
        const name = envPath.split('/').pop();
        asset.files[name] = `${basePath}/${envPath}`;
    }
    return JSON.stringify(asset, null, 4);
};

const manifest = manifestMedEnvpath();

const startServer = () => {
    writeEnvironmentVariablesToFile();

    app.use(setupProxy(`${basePath}/stilling-api`, process.env.STILLING_API_URL));
    app.use(setupProxy(`${basePath}/kandidat-api`, process.env.KANDIDAT_API_URL));
    app.use(setupProxy(`${basePath}/stillingssok-proxy`, process.env.STILLINGSOK_PROXY_URL));

    app.use(`${basePath}/static`, express.static(buildPath + '/static'));

    app.get(`${basePath}/asset-manifest.json`, (req, res) => {
        res.type('json').send(manifest);
    });

    app.get(`${basePath}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${basePath}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(port, () => {
        console.log('Server kjører på port', port);
    });
};

startServer();
