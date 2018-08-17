import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import AdminStatusEnum from './AdminStatusEnum';
import { SET_ADMIN_STATUS } from '../adDataReducer';
import { SAVE_AD } from '../adReducer';

class AdminStatusPreview extends React.Component {
    onSetToReceivedClick = (e) => {
        e.preventDefault();
        this.props.setAdminStatus(AdminStatusEnum.RECEIVED);
        this.props.saveAd();
    };

    render() {
        const { adminStatus, reportee } = this.props;

        return (
            <div className="AdminStatusPreview">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                        <br /><b>Saksbehandling:</b> Mottatt
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                        <br /><b>Saksbehandling:</b> Under behandling {' ('}
                        <a href="#" className="lenke typo-normal" onClick={this.onSetToReceivedClick}>
                            Sett tilbake til Mottatt
                        </a>{')'}
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                        <br /><b>Saksbehandling:</b> Ferdig
                    </Normaltekst>
                )}
            </div>
        );
    }
}

AdminStatusPreview.defaultProps = {
    reportee: undefined
};

AdminStatusPreview.propTypes = {
    adminStatus: PropTypes.string.isRequired,
    reportee: PropTypes.string,
    setAdminStatus: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    reportee: state.adData.administration.reportee
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    saveAd: () => dispatch({ type: SAVE_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusPreview);
