import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import AdminStatusEnum from './AdminStatusEnum';
import { SAVE_AD, SET_ADMIN_STATUS } from '../adReducer';

class AdminStatusPreview extends React.Component {
    onSetToReceivedClick = (e) => {
        e.preventDefault();
        this.props.setAdminStatus(AdminStatusEnum.RECEIVED);
        this.props.saveAd();
    };

    render() {
        const { adminStatus } = this.props;
        return (
            <div className="AdminStatusPreview">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <Normaltekst>
                        <b>Saksbehandling:</b> Mottatt
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <Normaltekst>
                        <b>Saksbehandling:</b> Under behandling {' ('}
                        <a href="#" className="lenke typo-normal" onClick={this.onSetToReceivedClick}>
                            Sett tilbake til Mottatt
                        </a>{')'}
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <Normaltekst>
                        <b>Saksbehandling:</b> Ferdig
                    </Normaltekst>
                )}
            </div>
        );
    }
}

AdminStatusPreview.propTypes = {
    adminStatus: PropTypes.string.isRequired,
    setAdminStatus: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.ad.data.administration.status
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    saveAd: () => dispatch({ type: SAVE_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusPreview);
