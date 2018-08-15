import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { SET_LOCATION_ADDRESS } from '../../adDataReducer';

function Location({ location }) {
    if (!location) {
        return null;
    }
    return (
        <div className="detail-section">
            <Element className="detail-section__head">Geografisk plassering av stillingen</Element>
            <dl className="dl-flex typo-normal">
                {location && location.address && [
                    <dt key="dt">Gateadresse:</dt>,
                    <dd key="dd">{location.address}</dd>]
                }
                {location && location.postalCode && [
                    <dt key="dt">Poststed:</dt>,
                    <dd key="dd">{location.postalCode} {location.city}</dd>]
                }
                {location && location.municipal && [
                    <dt key="dt">Kommune:</dt>,
                    <dd key="dd">{location.municipal}</dd>]
                }
                {location && location.county && [
                    <dt key="dt">Fylke:</dt>,
                    <dd key="dd">{location.county}</dd>]
                }
            </dl>
        </div>
    );
}

Location.defaultProps = {
    location: undefined
};

Location.propTypes = {
    location: PropTypes.shape({
        address: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    location: state.adData.location
});

const mapDispatchToProps = (dispatch) => ({
    setAddress: (address) => dispatch({ type: SET_LOCATION_ADDRESS, address })
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
