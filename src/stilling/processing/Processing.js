import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { Panel } from 'nav-frontend-paneler'
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

export default function Processing() {
    return (
        <Panel border className="detail-section">
            <Undertittel className="detail-section__head">Behandling av stillingen</Undertittel>
            <Row>
                <Column xs="12">
                    <Hovedknapp
                    >
                        Publiser stillingen
                    </Hovedknapp>
                </Column>
            </Row>
        </Panel>
    );
}

Processing.propTypes = {
};

