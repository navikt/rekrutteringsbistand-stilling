import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Column } from 'nav-frontend-grid';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';

export default class Ad extends React.Component {

    render() {
        const { ad } = this.props;
        return (
            <Link
                className="Ad"
                to={`/ads/${ad.uuid}`}
            >
                <Element>{ad.title}</Element>
            </Link>
        );
    }
}

Ad.propTypes = {

};
