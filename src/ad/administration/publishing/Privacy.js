import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio } from 'nav-frontend-skjema';
import { SET_PRIVACY } from '../../adDataReducer';
import './Publishing.less';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';

class Privacy extends React.Component {
    onPrivacyChange = e => {
        this.props.setPrivacy(e.target.value);
    };

    render() {
        const { privacy } = this.props;
        return (
            <div className="Privacy">
                <Radio
                    label="Kun internt i NAV"
                    value={PrivacyStatusEnum.INTERNAL_NOT_SHOWN}
                    name="privacy"
                    checked={privacy === PrivacyStatusEnum.INTERNAL_NOT_SHOWN}
                    onChange={this.onPrivacyChange}
                />
                <Radio
                    label="Arbeidsplassen"
                    value={PrivacyStatusEnum.SHOW_ALL}
                    name="privacy"
                    checked={privacy === PrivacyStatusEnum.SHOW_ALL}
                    onChange={this.onPrivacyChange}
                />
            </div>
        );
    }
}

Privacy.propTypes = {
    privacy: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    privacy: state.adData.privacy,
});

const mapDispatchToProps = dispatch => ({
    setPrivacy: privacy => dispatch({ type: SET_PRIVACY, privacy }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
