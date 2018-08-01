import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import PostalCode from "./PostalCode";
import { SET_LOCATION_ADDRESS } from "../../adReducer";
import { connect } from "react-redux";
import AdminStatusEnum from "../../administration/AdminStatusEnum";

export class Location extends React.Component {

    onAddressChange = (e) => {
        this.props.setAddress(e.target.value);
    };

    render() {
        const { location, status, isSavingAd } = this.props;
        return (
            <div className="detail-section">
                <Element className="detail-section__head">Sted</Element>
                <Input
                    disabled={status !== AdminStatusEnum.PENDING || isSavingAd}
                    label="Adresse"
                    className="typo-normal"
                    value={location && location.address ? location.address : ''}
                    onChange={this.onAddressChange}
                />
                <PostalCode />
            </div>
        );
    }
}

Location.defaultProps = {
    location: undefined
};

Location.propTypes = {
    status: PropTypes.string.isRequired,
    location: PropTypes.shape({
        address: PropTypes.string
    }),
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    status: state.ad.data.administration.status,
    location: state.ad.data.location,
    isSavingAd: state.ad.isSavingAd
});

const mapDispatchToProps = (dispatch) => ({
    setAddress: (address) => dispatch({ type: SET_LOCATION_ADDRESS, address }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
