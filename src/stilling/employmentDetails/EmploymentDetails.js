import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../utils';
import { Column, Row } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema'
import { Panel } from 'nav-frontend-paneler'
export default function EmploymentDetails({ properties }) {

    return (
        <Panel border className="detail-section">
            <Undertittel className="detail-section__head">Om stillingen</Undertittel>
            <Row>
                <Column xs="12">
                    <Input
                        id="gateadresse"
                        label="Gateadresse"
                    />
                </Column>
            </Row>
            <Row className="blokk-s">
                <Column xs="12" md="4">
                    <Input
                        id="postnummer"
                        label="Postnummer"
                    />
                </Column>
                <Column xs="12" md="8">
                    <Input
                        id="poststed"
                        label="Poststed"
                    />
                </Column>
            </Row>
            <Row className="blokk-s">
                <Column xs="12">
                    <Input
                        id="kommune-fylke"
                        label="Eller legg inn en eller flere kommuner/fylker"
                    />
                </Column>
            </Row>
        </Panel>
    );
}

EmploymentDetails.propTypes = {
    properties: PropTypes.shape({
        jobtitle: PropTypes.string,
        location: PropTypes.string,
        engagementtype: PropTypes.string,
        extent: PropTypes.string,
        positioncount: PropTypes.string,
        sector: PropTypes.string,
        workday: PropTypes.string,
        workhours: PropTypes.string,
        jobarrangement: PropTypes.string,
        starttime: PropTypes.string
    }).isRequired
};

