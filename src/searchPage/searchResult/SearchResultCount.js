import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Systemtittel } from 'nav-frontend-typografi';

function SearchResultCount({ count, isSearching }) {
    if (isSearching) {
        return <Systemtittel>&nbsp;</Systemtittel>;
    }
    return (
        <div>
            <Systemtittel>
                {`${count.toLocaleString('nb')} ${count === 1 ? 'annonse' : 'annonser'}`}
            </Systemtittel>
        </div>
    );
}

SearchResultCount.propTypes = {
    count: PropTypes.number.isRequired,
    isSearching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    count: state.search.totalElements,
    isSearching: state.search.isSearching,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCount);
