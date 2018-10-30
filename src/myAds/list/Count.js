import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Systemtittel } from 'nav-frontend-typografi';

function Count({ count, isSearching }) {
    if (isSearching) {
        return (
            <Systemtittel>
                &nbsp;
            </Systemtittel>
        );
    }
    return (
        <div>
            <Systemtittel>
                {count.toLocaleString('nb')} stillinger
            </Systemtittel>
        </div>
    );
}

Count.propTypes = {
    count: PropTypes.number.isRequired,
    isSearching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    count: state.myAds.totalElements,
    isSearching: state.myAds.isSearching
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Count);
