import path from 'path';
import express from 'express';
import compression from 'compression';

const app = express();
const port = process.env.PORT || 8080;

const basePath = '/rekrutteringsbistand-stilling';
const buildPath = path.join(__dirname, '../build');

const startServer = () => {
    app.use(compression());

    app.use(`${basePath}/assets`, express.static(buildPath + '/assets'));
    app.use(`${basePath}/asset-manifest.json`, express.static(`${buildPath}/asset-manifest.json`));

    app.get(`${basePath}/internal/isAlive`, (_, res) => res.sendStatus(200));
    app.get(`${basePath}/internal/isReady`, (_, res) => res.sendStatus(200));

    app.listen(port, () => {
        console.log('Server kjører på port', port);
    });
};

startServer();
