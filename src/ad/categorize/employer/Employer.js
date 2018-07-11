import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_EMPLOYER_SUGGESTIONS, SET_EMPLOYER } from './employerReducer';
import './Employer.less';
import AdminStatusEnum from '../../administration/AdminStatusEnum';
import { registerShortcuts } from '../../../common/shortcuts/Shortcuts';

class Employer extends React.Component {
    componentDidMount() {
        registerShortcuts('annonseDetaljer', {
            'l a': (e) => {
                e.preventDefault();
                this.inputRef.setFocus();
            }
        });
    }

    onTypeAheadValueChange = (value) => {
        this.props.setEmployer(value);
        this.props.fetchEmployerSuggestions(value);
    };

    onTypeAheadSuggestionSelected = (item) => {
        this.props.setEmployer(item.value);
    };

    render() {
        return (
            <div className="Employer">
                <Typeahead
                    disabled={this.props.status !== AdminStatusEnum.PENDING || this.props.isSavingAd}
                    id="Employer__typeahead"
                    label="Arbeidsgiver"
                    placeholder="Bedriftsnavn / org.nummer"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.suggestions.map((s) => ({
                        value: s,
                        label: s
                    }))}
                    value={this.props.value ? this.props.value : ''}
                    ref={(instance) => { this.inputRef = instance; }}
                />
            </div>
        );
    }
}


Employer.propTypes = {
    value: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setEmployer: PropTypes.func.isRequired,
    fetchEmployerSuggestions: PropTypes.func.isRequired,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    value: state.employer.value,
    suggestions: state.employer.suggestions,
    status: state.ad.data.administration.status,
    isSavingAd: state.ad.isSavingAd
});

const mapDispatchToProps = (dispatch) => ({
    setEmployer: (value) => dispatch({ type: SET_EMPLOYER, value }),
    fetchEmployerSuggestions: (value) => dispatch({ type: FETCH_EMPLOYER_SUGGESTIONS, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
