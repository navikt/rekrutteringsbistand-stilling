import { Column, Row } from 'nav-frontend-grid';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { SEARCH_FOR_DUPLICATES, SET_QUERY_EMPLOYER, SET_QUERY_LOCATION, SET_QUERY_TITLE } from './duplicatesReducer';
import './DuplicateSearch.less';

class DuplicateSearch extends React.Component {
    onSearchClick = () => {
        this.props.searchForDuplicates();
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchForDuplicates();
    };

    setTitle = (e) => {
        this.props.setTitle(e.target.value);
    };

    setEmployer = (e) => {
        this.props.setEmployer(e.target.value);
    };

    setLocation = (e) => {
        this.props.setLocation(e.target.value);
    };

    render() {
        return (
            <div className="DuplicateSearch">
                <Systemtittel className="DuplicateSearch__title">Duplikatsjekk</Systemtittel>
                <form onSubmit={this.onSubmit} className="DuplicateSearch__form">
                    <Row>
                        <Column xs="12" md="6">
                            <Input
                                onChange={this.setTitle}
                                value={this.props.query.title}
                                label="Stillingsoverskrift"
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
                            <Input
                                onChange={this.setLocation}
                                value={this.props.query.location}
                                label="Arbeidssted"
                                className="DuplicateSearch__input"
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
    searchForDuplicates: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setEmployer: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    query: PropTypes.shape({
        title: PropTypes.string,
        employerName: PropTypes.string,
        location: PropTypes.string
    }).isRequired
};


const mapStateToProps = (state) => ({
    query: state.duplicates.query
});

const mapDispatchToProps = (dispatch) => ({
    searchForDuplicates: () => dispatch({ type: SEARCH_FOR_DUPLICATES }),
    setTitle: (title) => dispatch({ type: SET_QUERY_TITLE, title }),
    setEmployer: (employerName) => dispatch({ type: SET_QUERY_EMPLOYER, employerName }),
    setLocation: (location) => dispatch({ type: SET_QUERY_LOCATION, location })
});

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateSearch);
