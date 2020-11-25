const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    const setupProxy = (path, target) => {
        app.use(
            path,
            createProxyMiddleware({
                target,
                changeOrigin: true,
            })
        );
    };

    setupProxy(
        '/rekrutteringsbistand-stilling/api',
        'http://localhost:9501/rekrutteringsbistand-api'
    );
    setupProxy(
        '/rekrutteringsbistand-stilling/kandidat-api',
        'http://localhost:8766/rekrutteringsbistand-kandidat-api/rest'
    );
};
