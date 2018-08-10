import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { Fields } from '../searchReducer';

function SearchResultCount({ count, field, isSearching }) {
    if (isSearching) {
        return (
            <Undertittel className="blokk-xs">
                &nbsp;
            </Undertittel>
        );
    }

    let fieldName = '';
    if (field === Fields.EMPLOYER_NAME) {
        fieldName = 'i arbeidsgiver';
    } else if (field === Fields.TITLE) {
        fieldName = 'i annonseoverskrift';
    } else if (field === Fields.ID) {
        fieldName = 'i ID';
    }
    return (
        <div>
            <Undertittel className="blokk-xs">
                {`${count} treff`} {fieldName}
            </Undertittel>
        </div>
    );
}

SearchResultCount.defaultProps = {
    field: undefined
};

SearchResultCount.propTypes = {
    count: PropTypes.number.isRequired,
    field: PropTypes.string,
    isSearching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    count: state.search.totalElements,
    field: state.search.field,
    isSearching: state.search.isSearching
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCount);
