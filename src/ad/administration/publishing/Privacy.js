import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { SET_PRIVACY } from '../../adDataReducer';
import './Publishing.less';

class Privacy extends React.Component {

    onPrivacyChange = (e) => {
        this.props.setPrivacy(e.target.value);
    };

    render() {
        const { privacy } = this.props;
        return (
            <div className="Privacy">
                <Fieldset legend="Hvor skal stillingen publiseres?*">
                    <Radio
                        label="Publiser kun internt i NAV"
                        value="INTERNAL_NOT_SHOWN"
                        name="privacy"
                        checked={privacy === 'INTERNAL_NOT_SHOWN'}
                        onChange={this.onPrivacyChange}
                    />
                    <Radio
                        label="Publiser på nav.no og internt i NAV"
                        value="SHOW_ALL"
                        name="privacy"
                        checked={privacy === 'SHOW_ALL'}
                        onChange={this.onPrivacyChange}
                    />
                </Fieldset>
            </div>
        );
    }
}

Privacy.propTypes = {
    privacy: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    privacy: state.adData.privacy
});

const mapDispatchToProps = (dispatch) => ({
    setPrivacy: (privacy) => dispatch({ type: SET_PRIVACY, privacy }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
