import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { SET_NOTAT } from '../../../stillingsinfo/stillingsinfoDataReducer';
import { MAX_LENGTH_NOTAT } from '../../adValidationReducer';
import './Notat.less';

class Notat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            notat: props.notat,
        };
    }

    onChange = (e) => {
        this.setState({
            hasChanged: true,
            notat: e.target.value,
        });
        this.props.setNotat(e.target.value);
    };

    onBlur = () => {
        if (this.state.hasChanged) {
            this.setState({
                hasChanged: false,
            });
            this.props.setNotat(this.state.notat);
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.notat !== nextProps.notat && prevState.hasChanged === false) {
            return {
                notat: nextProps.notat,
            };
        }
        return null;
    }

    feil = () => {
        const error = this.props.validation.notat;
        return error ? { feilmelding: error } : undefined;
    };

    render() {
        return (
            <div className="Notat">
                <Textarea
                    label="Notatfelt (vises kun internt)"
                    maxLength={MAX_LENGTH_NOTAT}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    value={this.state.notat || ''}
                    textareaClass="typo-normal Notat__textarea"
                    feil={this.feil()}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

Notat.defaultProps = {
    notat: '',
    placeholder: '',
};

Notat.propTypes = {
    setNotat: PropTypes.func.isRequired,
    notat: PropTypes.string,
    placeholder: PropTypes.string,
    validation: PropTypes.shape({
        notat: PropTypes.string,
    }).isRequired,
    createdBy: PropTypes.string,
};

const mapStateToProps = (state) => ({
    notat: state.stillingsinfoData.notat,
    validation: state.adValidation.errors,
    createdBy: state.adData.createdBy,
});

const mapDispatchToProps = (dispatch) => ({
    setNotat: (notat) => dispatch({ type: SET_NOTAT, notat }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notat);
