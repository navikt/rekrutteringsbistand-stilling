import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Element } from 'nav-frontend-typografi';

export default class ListItem extends React.Component {

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

ListItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};
