const SentryCli = require('@sentry/cli');

async function opprettReleaseTilSentry() {
    const release = process.env.REACT_APP_SENTRY_RELEASE;

    if (!release) {
        console.warn('"REACT_APP_SENTRY_RELEASE" er ikke satt');
        return;
    }

    const cli = new SentryCli();

    try {
        console.log('Oppretter Sentry-release ' + release);
        await cli.releases.new(release);

        console.log('Laster opp source maps');
        await cli.releases.uploadSourceMaps(release, {
            include: ['build/static/js'],
            urlPrefix: '~/static/js',
            rewrite: false,
        });

        console.log('Releaser');
        await cli.releases.finalize(release);
    } catch (e) {
        console.error('Noe gikk galt under source map-opplasting:', e);
    }
}

opprettReleaseTilSentry();
