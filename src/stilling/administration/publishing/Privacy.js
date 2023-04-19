import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { SET_PRIVACY } from '../../adDataReducer';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';
import Skjemalegend from '../../edit/skjemaetikett/Skjemalegend';
import { Undertittel } from 'nav-frontend-typografi';
import './Privacy.less';

class Privacy extends React.Component {
    onPrivacyChange = (e) => {
        this.props.setPrivacy(e.target.value);
    };

    render() {
        const { privacy } = this.props;
        return (
            <RadioGruppe className="Privacy">
                <Skjemalegend className="Privacy__legend" påkrevd>
                    <Undertittel className="Privacy__tittel">
                        Hvor skal stillingen publiseres?
                    </Undertittel>
                </Skjemalegend>
                <Radio
                    label="Kun internt i NAV"
                    value={PrivacyStatusEnum.INTERNAL_NOT_SHOWN}
                    name="privacy"
                    checked={privacy === PrivacyStatusEnum.INTERNAL_NOT_SHOWN}
                    onChange={this.onPrivacyChange}
                />
                <Radio
                    label="Eksternt på Arbeidsplassen"
                    value={PrivacyStatusEnum.SHOW_ALL}
                    name="privacy"
                    checked={privacy === PrivacyStatusEnum.SHOW_ALL}
                    onChange={this.onPrivacyChange}
                />
            </RadioGruppe>
        );
    }
}

Privacy.propTypes = {
    privacy: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    privacy: state.adData.privacy,
});

const mapDispatchToProps = (dispatch) => ({
    setPrivacy: (privacy) => dispatch({ type: SET_PRIVACY, privacy }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
