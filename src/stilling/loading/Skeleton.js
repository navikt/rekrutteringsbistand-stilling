/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Column } from 'nav-frontend-grid';
import Loading from './Loading';

export default function Skeleton({ stilling }) {
    return (
        <article className="Stilling">
            <Container className="Stilling__main">
                <Row>
                    <Column xs="12" md="8">
                        <Loading />
                    </Column>
                    <Column xs="12" md="4">
                        <Loading spinner={false} />
                    </Column>
                </Row>
            </Container>
        </article>
    );
}

Skeleton.defaultProps = {
    stilling: {
        title: '',
        properties: {
            employer: '',
            location: ''
        }
    }
};

Skeleton.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string,
        properties: PropTypes.shape({
            employer: PropTypes.string,
            location: PropTypes.string
        })
    })
};

