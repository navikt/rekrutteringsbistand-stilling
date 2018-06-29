import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { Panel } from 'nav-frontend-paneler'
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import  EtikettBase  from 'nav-frontend-etiketter';

export default function Processing() {
    return (
        <Panel border className="detail-section">
            <Undertittel className="detail-section__head">Behandling av stillingen</Undertittel>
            <EtikettBase type='fokus' className="blokk-s">
                Stillingen er ikke publisert
            </EtikettBase>
            <Hovedknapp className="blokk-xxs"
            >
                Publiser stillingen
            </Hovedknapp>
            <Hovedknapp className="blokk-xxs"
            >
                Avvis stillingen
            </Hovedknapp>
            <Hovedknapp className="blokk-xxs"
            >
                Neste
            </Hovedknapp>
        </Panel>
    );
}

Processing.propTypes = {
};

