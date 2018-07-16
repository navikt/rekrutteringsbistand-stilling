import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';

export default class ListHeaders extends React.Component {
    render() {
        return (
            <Row className="ListHeaders">
                <Column md="3">
                    <Element>Stillingsoverskrift</Element>
                </Column>
                <Column md="3">
                    <Element>Stillingstittel</Element>
                </Column>
                <Column md="2">
                    <Element>Arbeidsgiver</Element>
                </Column>
                <Column md="1">
                    <Element>Kilde</Element>
                </Column>
                <Column md="2">
                    <Element>Publiseringsdato</Element>
                </Column>
                <Column md="1">
                    <Element>Status</Element>
                </Column>
            </Row>
        )
    }
}