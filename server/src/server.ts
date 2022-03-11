import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

const app = express();
const port = process.env.PORT || 8080;

const envPath = 'static/js/env.js';
const envFile = `window.STILLING_VIS_STILLING_URL="${process.env.VIS_STILLING_URL}";\n`;

const basePath = '/rekrutteringsbistand-stilling';
const buildPath = path.join(__dirname, '../build');

const startServer = (manifest: string) => {
    app.use(compression());

    app.get(`${basePath}/${envPath}`, (_, res) => {
        res.type('application/javascript').send(envFile);
    });

    app.use(`${basePath}/static`, express.static(buildPath + '/static'));
    app.get(`${basePath}/asset-manifest.json`, (_, res) => {
        res.type('json').send(manifest);
    });

    app.get(`${basePath}/internal/isAlive`, (_, res) => res.sendStatus(200));
    app.get(`${basePath}/internal/isReady`, (_, res) => res.sendStatus(200));

    app.listen(port, () => {
        console.log('Server kjører på port', port);
    });
};

const opprettManifestMedEnvFil = (): string => {
    const asset = JSON.parse(fs.readFileSync(`${buildPath}/asset-manifest.json`, 'utf8'));
    if (asset.files) {
        const name = envPath.split('/').pop();
        asset.files[name] = `${basePath}/${envPath}`;
    }
    return JSON.stringify(asset, null, 4);
};

const initializeServer = () => {
    const manifest = opprettManifestMedEnvFil();
    startServer(manifest);
};

initializeServer();
