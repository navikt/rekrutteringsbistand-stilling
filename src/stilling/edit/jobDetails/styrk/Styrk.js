import { Feilmelding, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import LinkButton from '../../../../common/linkbutton/LinkButton';
import Typeahead from '../../../../common/typeahead/Typeahead';
import { SET_STYRK } from '../../../adDataReducer';
import './Styrk.less';
import StyrkModal from './StyrkModal';
import { FETCH_STYRK, SET_STYRK_TYPEAHEAD_VALUE, TOGGLE_STYRK_MODAL } from './styrkReducer';
import { SET_EMPLOYMENT_JOBTITLE } from '../../../adDataReducer';
import Skjemalabel from '../../skjemaetikett/Skjemalabel';

class Styrk extends React.Component {
    componentDidMount() {
        this.props.fetchStyrk();
    }

    onTypeAheadValueChange = (value) => {
        this.props.setTypeAheadValue(value);
    };

    onTypeAheadBlur = (value) => {
        if (value === '') {
            this.props.setStyrk(value);
        }
    };

    onTypeAheadSuggestionSelected = (suggestion) => {
        if (suggestion) {
            this.props.setStyrk(suggestion.value);
            if (
                this.props.stilling.properties.jobtitle === undefined ||
                this.props.stilling.properties.jobtitle === ''
            ) {
                this.props.setJobTitle(suggestion.name);
            }
        }
    };

    onShowListClick = () => {
        this.props.toggleList();
    };

    renderLabel = (styrk) => (
        <div className="Styrk__typeahead__item">
            <Normaltekst>
                {styrk.code}: {styrk.name}
            </Normaltekst>
            {styrk.alternativeNames && styrk.alternativeNames.length > 0 && (
                <Undertekst className="Styrk__typeahead__item__alternativeNames">
                    {styrk.alternativeNames.join(', ')}
                </Undertekst>
            )}
        </div>
    );

    render() {
        let value;
        let kategoriSTYRK08NAV = this.props.stilling?.categoryList?.find(
            (kategori) => kategori.categoryType === 'STYRK08NAV'
        );
        let kategoriSTYRK08 = this.props.stilling?.categoryList?.find(
            (kategori) => kategori.categoryType === 'STYRK08'
        );

        if (this.props.typeAheadValue !== undefined) {
            value = this.props.typeAheadValue;
        } else if (kategoriSTYRK08NAV) {
            value = `${kategoriSTYRK08NAV.code} ${kategoriSTYRK08NAV.name}`;
        } else if (kategoriSTYRK08) {
            // Dette er for å håndtere periode med registrering av feil STYRK type
            value = `${kategoriSTYRK08.code} ${kategoriSTYRK08.name}`;
        } else {
            value = '';
        }

        return (
            <div className="Styrk">
                <Skjemalabel
                    påkrevd
                    inputId="endre-stilling-styrk"
                    etterLabel={
                        <LinkButton className="Styrk__velg-styrk" onClick={this.onShowListClick}>
                            Velg fra liste
                        </LinkButton>
                    }
                >
                    Skriv inn STYRK
                </Skjemalabel>
                <Typeahead
                    id="endre-stilling-styrk"
                    className="Styrk__typeahead"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    onBlur={this.onTypeAheadBlur}
                    suggestions={this.props.typeAheadSuggestions.map((styrk) => ({
                        value: styrk.code,
                        label: this.renderLabel(styrk),
                        name: styrk.name,
                    }))}
                    value={value}
                    ref={(instance) => {
                        this.inputRef = instance;
                    }}
                    error={this.props.validation.styrk !== undefined}
                />
                {this.props.validation.styrk && (
                    <Feilmelding>{this.props.validation.styrk}</Feilmelding>
                )}
                {this.props.showStyrkModal && <StyrkModal />}
            </div>
        );
    }
}

Styrk.defaultProps = {
    typeAheadValue: undefined,
};

Styrk.propTypes = {
    fetchStyrk: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    typeAheadValue: PropTypes.string,
    typeAheadSuggestions: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
    setStyrk: PropTypes.func.isRequired,
    showStyrkModal: PropTypes.bool.isRequired,
    toggleList: PropTypes.func.isRequired,
    setJobTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    typeAheadValue: state.styrk.typeAheadValue,
    typeAheadSuggestions: state.styrk.typeAheadSuggestions,
    addedStyrkItems: state.styrk.addedStyrkItems,
    styrkThree: state.styrk.styrkThree,
    showStyrkModal: state.styrk.showStyrkModal,
    stilling: state.adData,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    fetchStyrk: () => dispatch({ type: FETCH_STYRK }),
    setTypeAheadValue: (value) => dispatch({ type: SET_STYRK_TYPEAHEAD_VALUE, value }),
    setStyrk: (code) => dispatch({ type: SET_STYRK, code }),
    setJobTitle: (jobtitle) => dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Styrk);
