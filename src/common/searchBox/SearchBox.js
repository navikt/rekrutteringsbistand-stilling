import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe, Select } from 'nav-frontend-skjema';
import './SearchBox.less';
import { CHANGE_SEARCH_EMPLOYER, CHANGE_SEARCH_TITLE } from '../../searchPage/filter/filterReducer';

class SearchBox extends React.Component {
    onSearch = (e) => {
        e.preventDefault();
        const input = this.searchInput.value;
        if (this.searchType.value === 'title') {
            this.props.changeSearchTitle(input);
        } else {
            this.props.changeSearchEmployer(input);
        }
        this.props.onSearchClick();
    };

    render() {
        let searchType;
        let searchTerm;
        if (this.props.searchEmployer) {
            searchType = 'employer';
            searchTerm = this.props.searchEmployer;
        } else if (this.props.searchTitle) {
            searchType = 'title';
            searchTerm = this.props.searchTitle;
        }

        return (
            <SkjemaGruppe>
                <form className="SearchBox">
                    <Select
                        label="Søk på:"
                        className="SearchBox__type"
                        bredde="s"
                        selectRef={(ref) => { this.searchType = ref; }}
                        defaultValue={searchType}
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
                        defaultValue={searchTerm }
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
    searchEmployer: undefined,
    searchTitle: undefined,
    onSearchClick: (f) => f
};

SearchBox.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSearchClick: PropTypes.func,
    changeSearchEmployer: PropTypes.func.isRequired,
    changeSearchTitle: PropTypes.func.isRequired,
    searchEmployer: PropTypes.string,
    searchTitle: PropTypes.string

};

const mapDispatchToProps = (dispatch) => ({
    changeSearchEmployer: (employer) => dispatch({ type: CHANGE_SEARCH_EMPLOYER, employer }),
    changeSearchTitle: (title) => dispatch({ type: CHANGE_SEARCH_TITLE, title })
});

const mapStateToProps = (state) => ({
    searchEmployer: state.filter.employerName,
    searchTitle: state.filter.title
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

