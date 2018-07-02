import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString } from '../../utils';
import { Column, Row } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema'
import { Panel } from 'nav-frontend-paneler'

export default function AdDetails({ updated, medium, reference }) {
    return (
        <Panel border className="detail-section">
            <Undertittel className="detail-section__head">Om annonsen</Undertittel>
            <Row>
                <Column xs="12">
                    <Input
                        id="sist-endret"
                        label="Sist endret"
                        value={updated
                            ? formatISOString(updated, 'D. MMMM YYYY') : ''}
                        disabled
                    />
                </Column>
            </Row>
            <Row>
                <Column xs="12">
                    <Input
                        id="hentet-fra"
                        label="Hentet fra / kilde:"
                        value={medium
                          ? (medium) : ''}
                        disabled
                    />
                </Column>
            </Row>
            <Row>
                <Column xs="12">
                    <Input
                        id="lopenummer"
                        label="Løpenummer"
                        value={''}
                        disabled
                    />
                </Column>
            </Row>
        </Panel>
    );
}

AdDetails.propTypes = {
        updated: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        reference: PropTypes.string.isRequired
};

