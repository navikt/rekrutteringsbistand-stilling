import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { SET_LOCATION_ADDRESS } from '../../adReducer';

function Location({ location }) {
    if (!location) {
        return null;
    }
    return (
        <div className="detail-section">
            <Element className="detail-section__head">Sted</Element>
            <dl className="dl-flex typo-normal">
                {location && location.address && [
                    <dt key="dt">Gateadresse:</dt>,
                    <dd key="dd">{location.address}</dd>]
                }
                {location && location.postalCode && [
                    <dt key="dt">Poststed:</dt>,
                    <dd key="dd">{location.postalCode} {location.city}</dd>]
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
    location: state.ad.data.location
});

const mapDispatchToProps = (dispatch) => ({
    setAddress: (address) => dispatch({ type: SET_LOCATION_ADDRESS, address })
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
