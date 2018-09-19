import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import Typeahead from '../../../common/typeahead/Typeahead';
import StyrkThree from './StyrkThree';
import { FETCH_STYRK, SET_STYRK_TYPEAHEAD_VALUE, TOGGLE_STYRK_MODAL } from './styrkReducer';
import { SET_STYRK } from '../../adDataReducer';
import './Styrk.less';
import {
    registerShortcuts,
    removeShortcuts
} from '../../../common/shortcuts/Shortcuts';
import LinkButton from '../../../common/linkbutton/LinkButton';

class Styrk extends React.Component {
    componentDidMount() {
        this.props.fetchStyrk();
        registerShortcuts('styrkEdit', {
            'y y': (e) => {
                e.preventDefault();
                this.inputRef.input.focus();
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('styrkEdit');
    }

    onTypeAheadValueChange = (value) => {
        this.props.setTypeAheadValue(value);
    };

    onTypeAheadSuggestionSelected = (suggestion) => {
        if (suggestion) {
            this.props.setStyrk(suggestion.value);
        }
    };

    onShowListClick = () => {
        this.props.toggleList();
    };

    render() {
        let value;
        if (this.props.typeAheadValue !== undefined) {
            value = this.props.typeAheadValue;
        } else if (this.props.stilling && this.props.stilling.categoryList && this.props.stilling.categoryList[0]) {
            value = `${this.props.stilling.categoryList[0].code} ${this.props.stilling.categoryList[0].name}`;
        } else {
            value = '';
        }

        return (
            <div className="Styrk">
                <div className="skjemaelement__label">
                    <label htmlFor="Styrk__typeahead">STYRK*</label>
                    <span>
                        {'  '}
                        <LinkButton onClick={this.onShowListClick}>Velg fra liste</LinkButton>
                    </span>
                </div>
                <Typeahead
                    id="Styrk__typeahead"
                    label=""
                    className="Styrk__typeahead"
                    placeholder="Styrkkategori / kode"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.typeAheadSuggestions}
                    value={value}
                    ref={(instance) => { this.inputRef = instance; }}
                    error={this.props.validation.styrk !== undefined}
                />

                {this.props.validation.styrk && (
                    <div className="Administration__error">{this.props.validation.styrk}</div>
                )}

                <Modal
                    className="StyrkModal"
                    contentClass="StyrkModal__content"
                    isOpen={this.props.showStyrkModal}
                    onRequestClose={this.props.toggleList}
                    contentLabel="Heisann."
                    appElement={document.getElementById('app')}
                >
                    <Undertittel className="StyrkModal__header">Velg STYRK</Undertittel>
                    <div className="StyrkModal__body">
                        <StyrkThree />
                    </div>
                </Modal>

            </div>
        );
    }
}

Styrk.defaultProps = {
    typeAheadValue: undefined
};

Styrk.propTypes = {
    fetchStyrk: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    typeAheadValue: PropTypes.string,
    typeAheadSuggestions: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    setStyrk: PropTypes.func.isRequired,
    showStyrkModal: PropTypes.bool.isRequired,
    toggleList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    typeAheadValue: state.styrk.typeAheadValue,
    typeAheadSuggestions: state.styrk.typeAheadSuggestions,
    addedStyrkItems: state.styrk.addedStyrkItems,
    styrkThree: state.styrk.styrkThree,
    showStyrkModal: state.styrk.showStyrkModal,
    stilling: state.adData,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    fetchStyrk: () => dispatch({ type: FETCH_STYRK }),
    setTypeAheadValue: (value) => dispatch({ type: SET_STYRK_TYPEAHEAD_VALUE, value }),
    setStyrk: (code) => dispatch({ type: SET_STYRK, code }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(Styrk);
