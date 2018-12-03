import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_MUNICIPALS_BEGIN, SET_MUNICIPAL_TYPE_AHEAD } from './municipalReducer';
import capitalizeLocation from '../../../ad/edit/location/capitalizeLocation';
import { CHANGE_MUNICIPAL_FILTER } from '../../searchReducer';
import './Municipal.less';

class Municipal extends React.Component {
    componentDidMount() {
        this.props.fetchMunicipals();
        const { municipalFilter } = this.props;
        if (municipalFilter) {
            this.props.setTypeAheadValue(municipalFilter);
        }
    }

    onMunicipalSelect = (value) => {
        const municipal = this.props.municipals.find((m) => m.name.toLowerCase() === value.label.toLowerCase());
        if (municipal) {
            this.props.setTypeAheadValue(capitalizeLocation(municipal.name));
            this.props.changeMunicipalFilter(municipal.name);
        } else {
            this.props.changeMunicipalFilter(undefined);
        }
    };

    onMunicipalChange = (value) => {
        if (value !== undefined) {
            this.props.setTypeAheadValue(value);
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.changeMunicipalFilter(this.props.municipalFilter);
    };

    render() {
        return (
            <div className="Municipal">
                <Typeahead
                    id="typeahead-municipal"
                    className="Municipal__typeahead"
                    onChange={this.onMunicipalChange}
                    onSelect={this.onMunicipalSelect}
                    label="Kommune"
                    suggestions={this.props.municipals.map((m) => ({
                        value: m.code,
                        label: capitalizeLocation(m.name)
                    }))}
                    value={this.props.municipalFilter}
                    minLength={1}
                    inputRef={(input) => {
                        this.refInputError = input;
                    }}
                    placeholder="Skriv inn kommune"
                />
                <Knapp
                    aria-label="søk"
                    className="Municipal__SearchButton"
                    onClick={this.onSubmit}
                >
                    <i className="search-button__icon" />
                </Knapp>
            </div>
        );
    }
}


Municipal.propTypes = {
    municipalFilter: PropTypes.string.isRequired,
    municipals: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
    })).isRequired,
    fetchMunicipals: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    changeMunicipalFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    municipals: state.municipal.municipals,
    municipalFilter: state.municipal.municipal
});

const mapDispatchToProps = (dispatch) => ({
    fetchMunicipals: () => dispatch({ type: FETCH_MUNICIPALS_BEGIN }),
    setTypeAheadValue: (value) => dispatch({ type: SET_MUNICIPAL_TYPE_AHEAD, value }),
    changeMunicipalFilter: (municipal) => dispatch({ type: CHANGE_MUNICIPAL_FILTER, municipal })
});

export default connect(mapStateToProps, mapDispatchToProps)(Municipal);
