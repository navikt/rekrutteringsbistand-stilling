import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../common/typeahead/Typeahead';
import Tag from '../../common/tag/Tag';
import { ADD_STYRK, FETCH_STYRK_SUGGESTIONS, REMOVE_STYRK, SET_STYRK_VALUE } from './styrkReducer';
import './Styrk.less';

class Styrk extends React.Component {
    onTypeAheadValueChange = (value) => {
        this.props.setValue(value);
        this.props.fetchStyrkSuggestions(value);
    };

    onTypeAheadSuggestionSelected = (value) => {
        this.props.setValue('');
        this.props.addStyrk(value);
    };

    onStyrkRemove = (value) => {
        this.props.removeStyrk(value);
    };

    render() {
        return (
            <div className="Styrk">
                <Typeahead
                    id="Styrk__typeahead"
                    label="Styrk"
                    placeholder="Styrkkategori / styrkkode"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.suggestions}
                    value={this.props.value ? this.props.value : ''}
                />
                {this.props.styrkList.length > 0 && (
                    <div className="Styrk__tags">
                        {this.props.styrkList.map((styrk) => (
                            <Tag key={styrk} value={styrk} onRemove={this.onStyrkRemove} />
                        ))}
                    </div>
                )}
            </div>
        );
    }
}


Styrk.propTypes = {
    value: PropTypes.string.isRequired,
    styrkList: PropTypes.arrayOf(PropTypes.string).isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setValue: PropTypes.func.isRequired,
    fetchStyrkSuggestions: PropTypes.func.isRequired,
    addStyrk: PropTypes.func.isRequired,
    removeStyrk: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    value: state.styrk.value,
    suggestions: state.styrk.suggestions,
    styrkList: state.styrk.styrkList
});

const mapDispatchToProps = (dispatch) => ({
    setValue: (value) => dispatch({ type: SET_STYRK_VALUE, value }),
    addStyrk: (value) => dispatch({ type: ADD_STYRK, value }),
    removeStyrk: (value) => dispatch({ type: REMOVE_STYRK, value }),
    fetchStyrkSuggestions: (value) => dispatch({ type: FETCH_STYRK_SUGGESTIONS, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Styrk);
