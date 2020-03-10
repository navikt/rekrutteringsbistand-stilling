import * as React from 'react';
import NAVSPA from '@navikt/navspa';

const InternflateDecorator = NAVSPA.importer('internarbeidsflatefs');

const Dekoratør = () => (
    <InternflateDecorator
        appname="Rekrutteringsbistand"
        enhet={{
            initialValue: null,
            display: 'ENHET_VALG',
            onChange(enhet) {
                console.warn('ENHET onChange', enhet);
            },
        }}
        toggles={{
            visVeileder: true,
        }}
    />
);

export default Dekoratør;
