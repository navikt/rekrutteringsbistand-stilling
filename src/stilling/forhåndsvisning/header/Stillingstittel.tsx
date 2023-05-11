import React, { FunctionComponent } from 'react';
import { Geografi } from '../../../Stilling';
import capitalizeLocation from '../../edit/arbeidssted/capitalizeLocation';
import { BodyShort, Heading } from '@navikt/ds-react';
import './Stillingstittel.less';

type Props = {
    tittel?: string;
    employer?: string;
    location?: Geografi | null;
};

const Stillingstittel: FunctionComponent<Props> = ({ tittel, employer, location }) => {
    let mestSpesifikkeSted = '';
    if (location) {
        if (location.city) {
            mestSpesifikkeSted = location.city;
        } else if (location.municipal) {
            mestSpesifikkeSted = location.municipal;
        } else if (location.country) {
            mestSpesifikkeSted = location.country;
        }
    }

    const formatertSted = commaSeparate(employer, capitalizeLocation(mestSpesifikkeSted));

    return (
        <div className="stillingstittel">
            <BodyShort>{formatertSted}</BodyShort>
            <Heading level="2" size="large">
                {tittel || ''}
            </Heading>
        </div>
    );
};

function commaSeparate(...strings: Array<string | undefined>) {
    const onlyStrings = strings.filter((string) => typeof string === 'string' && string !== '');
    return onlyStrings.join(', ');
}

export default Stillingstittel;
