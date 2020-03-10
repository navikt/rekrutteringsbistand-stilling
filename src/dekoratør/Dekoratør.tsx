import * as React from 'react';
import NAVSPA from '@navikt/navspa';
import DekoratørProps, { EnhetDisplay } from './DecoratørProps';

const InternflateDecorator = NAVSPA.importer<DekoratørProps>('internarbeidsflatefs');

const Dekoratør = () => (
    <InternflateDecorator
        appname="Rekrutteringsbistand"
        enhet={{
            initialValue: null,
            display: EnhetDisplay.ENHET_VALG,
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
