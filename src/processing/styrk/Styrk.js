import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import Typeahead from '../../common/typeahead/Typeahead';
import Tag from '../../common/tag/Tag';
import StyrkThree from "./StyrkThree";
import { ADD_STYRK, FETCH_STYRK_SUGGESTIONS, REMOVE_STYRK, SET_STYRK_TYPEAHEAD_VALUE, TOGGLE_STYRK_MODAL } from './styrkReducer';
import './Styrk.less';

class Styrk extends React.Component {
    onTypeAheadValueChange = (value) => {
        this.props.setTypeAheadValue(value);
        this.props.fetchStyrkTypeAheadSuggestions(value);
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
                <label className="typo-normal">Arbeidsyrke</label>
                {' ('}<a href="#" className="typo-normal lenke" onClick={this.onShowListClick}>velg fra liste</a>)
                <Typeahead
                    id="Styrk__typeahead"
                    label=""
                    placeholder="Styrkkategori / 4-siffret styrkkode"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.typeAheadSuggestions.slice(0, 10)}
                    value={this.props.typeAheadValue}
                />

                {this.props.addedStyrkItems.length > 0 && (
                    <div className="Styrk__tags">
                        {this.props.addedStyrkItems.map((styrk) => (
                            <Tag
                                key={styrk.code}
                                value={styrk.code}
                                label={`${styrk.code}: ${styrk.name}`}
                                onRemove={this.onTagRemove}
                            />
                        ))}
                    </div>
                )}

                <Modal
                    className="Styrk__modal"
                    isOpen={this.props.showStyrkModal}
                    onRequestClose={this.props.toggleList}
                    contentLabel="Heisann."
                    appElement={document.getElementById('app')}
                >
                    <Undertittel>Velg styrkkategori</Undertittel>
                    <StyrkThree />
                </Modal>

            </div>
        );
    }
}

Styrk.propTypes = {
    setTypeAheadValue: PropTypes.func.isRequired,
    fetchStyrkTypeAheadSuggestions: PropTypes.func.isRequired,
    typeAheadValue: PropTypes.string.isRequired,
    typeAheadSuggestions: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    addedStyrkItems:PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    addStyrk: PropTypes.func.isRequired,
    removeStyrk: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    typeAheadValue: state.styrk.typeAheadValue,
    typeAheadSuggestions: state.styrk.typeAheadSuggestions,
    addedStyrkItems: state.styrk.addedStyrkItems,
    styrkThree: state.styrk.styrkThree,
    showStyrkModal: state.styrk.showStyrkModal
});

const mapDispatchToProps = (dispatch) => ({
    setTypeAheadValue: (value) => dispatch({ type: SET_STYRK_TYPEAHEAD_VALUE, value }),
    fetchStyrkTypeAheadSuggestions: (value) => dispatch({ type: FETCH_STYRK_SUGGESTIONS, value }),
    addStyrk: (code) => dispatch({ type: ADD_STYRK, code }),
    removeStyrk: (code) => dispatch({ type: REMOVE_STYRK, code }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(Styrk);
