import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe, Select } from 'nav-frontend-skjema';
import './SearchBox.less';
import { SET_SEARCHBOX_TERM, SET_SEARCHBOX_TYPE } from './searchBoxReducer';
import { CHANGE_SEARCH_EMPLOYER, CHANGE_SEARCH_TITLE } from '../../searchPage/filter/filterReducer';

class SearchBox extends React.Component {

    onSearch = (e) => {
        e.preventDefault();
        const input = this.searchInput.value;
        this.props.setSearchTerm(input);
        if (this.searchType.value === 'title') {
            this.props.changeSearchTitle(input);
        } else {
            this.props.changeSearchEmployer(input);
        }
        this.props.onSearchClick();
    };

    onSearchTypeChange = () => {
        this.props.setSearchType(this.searchType.value);
    };

    render() {
        return (
            <SkjemaGruppe>
                <form className="SearchBox">
                    <Select
                        label="Søk på:"
                        className="SearchBox__type"
                        bredde="s"
                        onChange={this.onSearchTypeChange}
                        selectRef={(ref) => { this.searchType = ref; }}
                        defaultValue={this.props.searchType ? this.props.searchType : undefined}
                    >
                        <option
                            value="employer"
                            key="employer">
                            Arbeidsgiver
                        </option>
                        <option
                            value="title"
                            key="title">
                            Stillingstittel
                        </option>
                    </Select>
                    <Input
                        label={this.props.label}
                        inputRef={(ref) => { this.searchInput = ref; }}
                        type="search"
                        placeholder={this.props.placeholder}
                        className="SearchBox__input "
                        defaultValue={this.props.searchTerm ? this.props.searchTerm : undefined}
                    />
                    <Hovedknapp className="SearchBox__button" onClick={this.onSearch}>
                        Søk
                    </Hovedknapp>
                </form>
            </SkjemaGruppe>
        );
    }
}

SearchBox.defaultProps = {
    label: '',
    placeholder: '',
    searchTerm: undefined,
    searchType: 'employer',
    onSearchClick: (f) => f
};

SearchBox.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSearchClick: PropTypes.func,
    changeSearchEmployer: PropTypes.func.isRequired,
    changeSearchTitle: PropTypes.func.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    setSearchType: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
    searchType: PropTypes.string

};

const mapDispatchToProps = (dispatch) => ({
    setSearchTerm: (searchTerm) => dispatch({ type: SET_SEARCHBOX_TERM, searchTerm }),
    setSearchType: (searchType) => dispatch({ type: SET_SEARCHBOX_TYPE, searchType }),
    changeSearchEmployer: (employer) => dispatch({ type: CHANGE_SEARCH_EMPLOYER, employer }),
    changeSearchTitle: (title) => dispatch({ type: CHANGE_SEARCH_TITLE, title })
});

const mapStateToProps = (state) => ({
    searchTerm: state.searchBox.searchTerm,
    searchType: state.searchBox.searchType
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

