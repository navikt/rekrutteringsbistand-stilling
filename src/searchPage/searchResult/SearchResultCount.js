import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';

function SearchResultCount({ count }) {
    return (
        <div>
            <Normaltekst className="blokk-xs">
                {`${count} treff.`}
            </Normaltekst>
        </div>
    );
}

SearchResultCount.propTypes = {
    count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    count: state.search.totalElements
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCount);
