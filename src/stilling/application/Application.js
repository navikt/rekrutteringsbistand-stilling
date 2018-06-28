import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../utils';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import DatoVelger from 'nav-datovelger';
import { Input } from 'nav-frontend-skjema'
import 'nav-datovelger/dist/datovelger/styles/datovelger.css'
import './Application.less';

export const tilpassEmail = (email) => {
    if (email.includes('@') && !email.includes('mailto:')) {
        return `mailto:${email}`;
    }
    return email;
};

export function getApplicationUrl(source, properties) {
    if (source === 'FINN') {
        return properties.sourceurl;
    } else if (properties.applicationurl !== undefined) {
        return properties.applicationurl;
    }
    return properties.sourceurl;
}

export default function Application({ source, properties }) {
    const sokUrl = getApplicationUrl(source, properties);

    return (
        <Panel border className="detail-section">
            <Undertittel className="detail-section__head" >Søknad</Undertittel>

            <Normaltekst>Søknadsfrist:</Normaltekst>
            <DatoVelger>
            </DatoVelger>
            <Normaltekst>Oppstart:</Normaltekst>
            <DatoVelger>
            </DatoVelger>
        </Panel>
    );

}

Application.propTypes = {
    properties: PropTypes.shape({
        applicationdue: PropTypes.string,
        applicationemail: PropTypes.string,
        applicationurl: PropTypes.string,
        sourceurl: PropTypes.string
    }).isRequired
};

