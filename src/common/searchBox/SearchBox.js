import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe, Select } from 'nav-frontend-skjema';
import './SearchBox.less';
import { CHANGE_SEARCH_EMPLOYER, CHANGE_SEARCH_TITLE, CHANGE_SEARCH_ID } from '../../searchPage/filter/filterReducer';
import { registerShortcuts } from '../shortcuts/Shortcuts';

class SearchBox extends React.Component {
    componentDidMount() {
        registerShortcuts('forside', {
            's a': (e) => {
                e.preventDefault();
                this.searchType.value = 'employer';
                this.searchInput.focus();
            },
            's s': (e) => {
                e.preventDefault();
                this.searchType.value = 'title';
                this.searchInput.focus();
            },
            's i': (e) => {
                e.preventDefault();
                this.searchType.value = 'id';
                this.searchInput.focus();
            }
        });
    }

    onSearch = (e) => {
        e.preventDefault();
        const input = this.searchInput.value;
        if (this.searchType.value === 'title') {
            this.props.changeSearchTitle(input);
        } else if (this.searchType.value === 'id') {
            this.props.changeSearchId(input);
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
        } else if (this.props.searchId) {
            searchType = 'id';
            searchTerm = this.props.searchId;
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
                            key="employer"
                        >
                            Arbeidsgiver
                        </option>
                        <option
                            value="title"
                            key="title"
                        >
                            Stillingstittel
                        </option>
                        <option
                            value="id"
                            key="id"
                        >
                            ID
                        </option>
                    </Select>
                    <Input
                        label={this.props.label}
                        inputRef={(ref) => { this.searchInput = ref; }}
                        type="search"
                        placeholder={this.props.placeholder}
                        className="SearchBox__input "
                        defaultValue={searchTerm}
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
    searchId: undefined,
    onSearchClick: (f) => f
};

SearchBox.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSearchClick: PropTypes.func,
    changeSearchEmployer: PropTypes.func.isRequired,
    changeSearchTitle: PropTypes.func.isRequired,
    changeSearchId: PropTypes.func.isRequired,
    searchEmployer: PropTypes.string,
    searchTitle: PropTypes.string,
    searchId: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
    changeSearchEmployer: (employer) => dispatch({ type: CHANGE_SEARCH_EMPLOYER, employer }),
    changeSearchTitle: (title) => dispatch({ type: CHANGE_SEARCH_TITLE, title }),
    changeSearchId: (id) => dispatch({ type: CHANGE_SEARCH_ID, id })
});

const mapStateToProps = (state) => ({
    searchEmployer: state.filter.employerName,
    searchTitle: state.filter.title,
    searchId: state.filter.id
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

