import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Systemtittel } from 'nav-frontend-typografi';

function Count({ count, isSearching }) {
    if (isSearching) {
        return <Systemtittel>&nbsp;</Systemtittel>;
    }

    let text = count.toLocaleString('nb');
    if (count === 1) {
        text += ' stilling';
    } else {
        text += ' stillinger';
    }

    return (
        <div>
            <Systemtittel>{text}</Systemtittel>
        </div>
    );
}

Count.propTypes = {
    count: PropTypes.number.isRequired,
    isSearching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    count: state.myAds.totalElements,
    isSearching: state.myAds.isSearching,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Count);
