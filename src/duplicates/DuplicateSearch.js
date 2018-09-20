import { Column, Row } from 'nav-frontend-grid';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import capitalizeLocation from '../ad/administration/location/capitalizeLocation';
import Typeahead from '../common/typeahead/Typeahead';
import './DuplicateSearch.less';
import {
    FETCH_MUNICIPALS_SUGGESTIONS,
    SEARCH_FOR_DUPLICATES,
    SET_QUERY_EMPLOYER, SET_QUERY_JOB_TITLE,
    SET_QUERY_MUNICIPAL,
    SET_QUERY_TITLE
} from './duplicatesReducer';

class DuplicateSearch extends React.Component {
    componentDidMount() {
        this.props.fetchMunicipalSuggestions();
    }

    onSearchClick = () => {
        this.props.searchForDuplicates();
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchForDuplicates();
    };

    onTypeAheadValueChange = (value) => {
        this.props.setMunicipal(value);
    };

    onTypeAheadSuggestionSelected = (location) => {
        if (location) {
            this.props.setMunicipal(location.value);
            this.props.searchForDuplicates();
        }
    };

    setTitle = (e) => {
        this.props.setTitle(e.target.value);
    };

    setJobTitle = (e) => {
        this.props.setJobTitle(e.target.value);
    };

    setEmployer = (e) => {
        this.props.setEmployer(e.target.value);
    };

    render() {
        return (
            <div className="DuplicateSearch">
                <Systemtittel className="DuplicateSearch__title">Duplikatsjekk</Systemtittel>
                <form onSubmit={this.onSubmit} className="DuplicateSearch__form">
                    <Row>
                        <Column xs="12" md="3">
                            <Input
                                onChange={this.setTitle}
                                value={this.props.query.title}
                                label="Stillingsoverskrift"
                                className="DuplicateSearch__input"
                            />
                        </Column>
                        <Column xs="12" md="3">
                            <Input
                                onChange={this.setJobTitle}
                                value={this.props.query.jobtitle}
                                label="Stillingstittel"
                                className="DuplicateSearch__input"
                            />
                        </Column>
                        <Column xs="12" md="3">
                            <Input
                                onChange={this.setEmployer}
                                value={this.props.query.employerName}
                                label="Arbeidsgiver"
                                className="DuplicateSearch__input"
                            />
                        </Column>
                        <Column xs="12" md="2">
                            <Typeahead
                                id="DuplicateSearch__municipal"
                                className="DuplicateSearch__input"
                                label="Arbeidssted/kommune"
                                onSelect={this.onTypeAheadSuggestionSelected}
                                onChange={this.onTypeAheadValueChange}
                                suggestions={this.props.municipalSuggestions.map((location) => ({
                                    key: location.postalCode,
                                    value: capitalizeLocation(location.municipality.name),
                                    label: `${location.postalCode} ${capitalizeLocation(location.city)}, ${capitalizeLocation(location.municipality.name)} kommune`
                                }))}
                                value={this.props.query.municipal}
                            />
                        </Column>
                        <Column xs="12" md="1">
                            <Hovedknapp
                                onClick={this.onSearchClick}
                                className="DuplicateSearch__button"
                            >
                                Søk
                            </Hovedknapp>
                        </Column>
                    </Row>
                </form>
            </div>
        );
    }
}

DuplicateSearch.propTypes = {
    fetchMunicipalSuggestions: PropTypes.func.isRequired,
    searchForDuplicates: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setJobTitle: PropTypes.func.isRequired,
    setEmployer: PropTypes.func.isRequired,
    setMunicipal: PropTypes.func.isRequired,
    query: PropTypes.shape({
        title: PropTypes.string,
        jobtitle: PropTypes.string,
        employerName: PropTypes.string,
        municipal: PropTypes.string
    }).isRequired,
    municipalSuggestions: PropTypes.arrayOf(PropTypes.shape({
        postalCode: PropTypes.string,
        city: PropTypes.string,
        municipality: PropTypes.shape({
            name: PropTypes.string
        })
    })).isRequired
};


const mapStateToProps = (state) => ({
    query: state.duplicates.query,
    municipalSuggestions: state.duplicates.municipalSuggestions
});

const mapDispatchToProps = (dispatch) => ({
    fetchMunicipalSuggestions: () => dispatch({ type: FETCH_MUNICIPALS_SUGGESTIONS }),
    searchForDuplicates: () => dispatch({ type: SEARCH_FOR_DUPLICATES }),
    setTitle: (title) => dispatch({ type: SET_QUERY_TITLE, title }),
    setJobTitle: (jobtitle) => dispatch({ type: SET_QUERY_JOB_TITLE, jobtitle }),
    setEmployer: (employerName) => dispatch({ type: SET_QUERY_EMPLOYER, employerName }),
    setMunicipal: (value) => dispatch({ type: SET_QUERY_MUNICIPAL, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateSearch);
