import React from 'react';
import { Link } from 'react-router-dom';
import { Sidetittel } from 'nav-frontend-typografi';
import { Column, Container, Row } from 'nav-frontend-grid';
import './StartPage.less';

export default function StartPage() {
    return (
        <Container className="StartPage">
            <Row>
                <Column xs="12" md="4" />
                <Column xs="12" md="4">
                    <Sidetittel className="StartPage__sidetittel">Annonsemottak</Sidetittel>
                    <Link to="/ads" className="knapp knapp--hoved StartPage__button">
                        Start med neste ledige annonse
                    </Link>
                </Column>
            </Row>
        </Container>
    );
}

