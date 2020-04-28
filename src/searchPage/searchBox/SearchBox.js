import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SearchBox.less';
import Typeahead from '../../common/typeahead/Typeahead';
import { SET_SEARCH_FIELD, SET_SEARCH_VALUE } from '../searchReducer';

class SearchBox extends React.Component {
    onTypeAheadChange = (value) => {
        this.props.setSearchValue(value);
    };

    onTypeAheadSelect = (selected) => {
        this.props.setSearchField(selected && selected.value ? selected.value : undefined);
        if (this.props.onSearch) {
            this.props.onSearch();
        }
    };

    render() {
        return (
            <div className="SearchBox">
                <Typeahead
                    onChange={this.onTypeAheadChange}
                    onSelect={this.onTypeAheadSelect}
                    suggestions={this.props.suggestions}
                    value={this.props.value}
                    placeholder="Annonseoverskrift, arbeidsgiver eller annonsenummer"
                    id="SearchPageSearchbox"
                    label="Søk etter stilling"
                />
                <span className="SearchBox__button">
                    <i className="SearchBox__button__icon" />
                </span>
            </div>
        );
    }
}

SearchBox.defaultProps = {
    onSearch: undefined,
};

SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    setSearchField: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    onSearch: PropTypes.func,
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })
    ).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setSearchValue: (value) => dispatch({ type: SET_SEARCH_VALUE, value }),
    setSearchField: (field) => dispatch({ type: SET_SEARCH_FIELD, field }),
});

const mapStateToProps = (state) => ({
    value: state.search.value,
    suggestions: state.search.suggestions,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
