import React, { FunctionComponent } from 'react';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import capitalizeLocation from '../../edit/location/capitalizeLocation';
import { Location } from '../../../Stilling';
import './Stillingstittel.less';

type Props = {
    tittel: string;
    employer: string;
    location: Location;
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
            <Normaltekst>{formatertSted}</Normaltekst>
            <Sidetittel>{tittel || ''}</Sidetittel>
        </div>
    );
};

function commaSeparate(...strings: string[]) {
    const onlyStrings = strings.filter((string) => typeof string === 'string' && string !== '');
    return onlyStrings.join(', ');
}

export default Stillingstittel;
