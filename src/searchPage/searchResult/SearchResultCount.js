import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';

function SearchResultCount({ count, isSearching }) {
    if (isSearching) {
        return (
            <Normaltekst className="blokk-s">
                &nbsp;
            </Normaltekst>
        );
    }
    return (
        <div>
            <Normaltekst className="blokk-s">
                Søket ga <b>{count}</b> annonser
            </Normaltekst>
        </div>
    );
}

SearchResultCount.propTypes = {
    count: PropTypes.number.isRequired,
    isSearching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    count: state.search.totalElements,
    isSearching: state.search.isSearching
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCount);
