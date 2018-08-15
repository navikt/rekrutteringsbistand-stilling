import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import Typeahead from '../../../common/typeahead/Typeahead';
import Tag from '../../../common/tag/Tag';
import StyrkThree from './StyrkThree';
import { FETCH_STYRK, SET_STYRK_TYPEAHEAD_VALUE, TOGGLE_STYRK_MODAL } from './styrkReducer';
import { ADD_STYRK, REMOVE_STYRK } from '../../adDataReducer';
import './Styrk.less';
import { registerShortcuts } from '../../../common/shortcuts/Shortcuts';

class Styrk extends React.Component {
    componentDidMount() {
        this.props.fetchStyrk();

        registerShortcuts('annonseDetaljer', {
            'l y': (e) => {
                e.preventDefault();
                this.inputRef.setFocus();
            }
        });
    }

    onTypeAheadValueChange = (value) => {
        this.props.setTypeAheadValue(value);
    };

    onTypeAheadSuggestionSelected = (suggestion) => {
        this.props.setTypeAheadValue('');
        this.props.addStyrk(suggestion.value);
    };

    onTagRemove = (styrkCode) => {
        this.props.removeStyrk(styrkCode);
    };

    onShowListClick = () => {
        this.props.toggleList();
    };

    render() {
        return (
            <div className="Styrk">
                <label htmlFor="Styrk__typeahead" className="typo-normal">STYRK</label>
                <span>
                    {' ('}
                    <a href="#" className="typo-normal lenke" onClick={this.onShowListClick}>velg fra liste</a>
                    {')'}
                </span>
                <Typeahead
                    id="Styrk__typeahead"
                    label=""
                    placeholder="Styrkkategori / kode"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.typeAheadSuggestions.slice(0, 10)}
                    value={this.props.typeAheadValue}
                    ref={(instance) => { this.inputRef = instance; }}
                    error={this.props.validation.styrk !== undefined}
                />

                {this.props.validation.styrk && (
                    <div className="PostalCode__error">{this.props.validation.styrk}</div>
                )}

                {this.props.stilling.categoryList.length > 0 && (
                    <div className="Styrk__tags">
                        {this.props.stilling.categoryList.map((styrk) => (
                            <Tag
                                key={styrk.code}
                                value={styrk.code}
                                label={`${styrk.code}: ${styrk.name}`}
                                canRemove
                                onRemove={this.onTagRemove}
                            />
                        ))}
                    </div>
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

Styrk.propTypes = {
    fetchStyrk: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    typeAheadValue: PropTypes.string.isRequired,
    typeAheadSuggestions: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    addStyrk: PropTypes.func.isRequired,
    removeStyrk: PropTypes.func.isRequired,
    showStyrkModal: PropTypes.bool.isRequired,
    toggleList: PropTypes.func.isRequired,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    typeAheadValue: state.styrk.typeAheadValue,
    typeAheadSuggestions: state.styrk.typeAheadSuggestions,
    addedStyrkItems: state.styrk.addedStyrkItems,
    styrkThree: state.styrk.styrkThree,
    showStyrkModal: state.styrk.showStyrkModal,
    stilling: state.adData,
    status: state.adData.administration.status,
    isSavingAd: state.ad.isSavingAd,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    fetchStyrk: () => dispatch({ type: FETCH_STYRK }),
    setTypeAheadValue: (value) => dispatch({ type: SET_STYRK_TYPEAHEAD_VALUE, value }),
    addStyrk: (code) => dispatch({ type: ADD_STYRK, code }),
    removeStyrk: (code) => dispatch({ type: REMOVE_STYRK, code }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(Styrk);
