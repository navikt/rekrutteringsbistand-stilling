import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { FETCH_NEXT_AD, SAVE_AD, SET_ADMIN_STATUS } from '../adReducer';
import AdminStatusEnum from './AdminStatusEnum';
import AdStatusEnum from './AdStatusEnum';

class AdminStatusEdit extends React.Component {
    onSaveClick = () => {
        this.props.saveAd();
    };

    onNextClick = () => {
        this.props.getNextAd();
    };

    onSetToPendingClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
        this.props.saveAd();
    };

    onSetToDoneClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.DONE);
        this.props.saveAd();
    };

    render() {
        const {
            adminStatus, adStatus, isSavingAd, validation
        } = this.props;

        const hasErrors = Object.keys(validation).find((key) => (
            validation[key] !== undefined
        ));
        return (
            <div className="AdminStatusEdit">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <div>
                        <Hovedknapp className="AdminStatusEdit__button" onClick={this.onSetToPendingClick}>
                            Start saksbehandling
                        </Hovedknapp>
                        <Knapp className="AdminStatusEdit__button" onClick={this.onNextClick}>
                            Hent ny annonse
                        </Knapp>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <div>
                        <Hovedknapp
                            className="AdminStatusEdit__button"
                            onClick={this.onSetToDoneClick}
                            disabled={hasErrors && adStatus === AdStatusEnum.ACTIVE}
                        >
                            Lagre og avslutt saksbehandling
                        </Hovedknapp>
                        <Knapp
                            spinner={isSavingAd}
                            className="AdminStatusEdit__button"
                            onClick={this.onSaveClick}
                            disabled={hasErrors && adStatus === AdStatusEnum.ACTIVE}
                        >
                            Lagre
                        </Knapp>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <div>
                        <Hovedknapp className="AdminStatusEdit__button" onClick={this.onNextClick}>
                            Hent ny annonse
                        </Hovedknapp>
                        <Knapp className="AdminStatusEdit__button" onClick={this.onSetToPendingClick}>
                            Gjennåpne saksbehandling
                        </Knapp>
                    </div>
                )}
            </div>
        );
    }
}

AdminStatusEdit.propTypes = {
    adminStatus: PropTypes.string.isRequired,
    adStatus: PropTypes.string.isRequired,
    isSavingAd: PropTypes.bool.isRequired,
    setAdminStatus: PropTypes.func.isRequired,
    getNextAd: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    validation: PropTypes.shape({}).isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.ad.data.administration.status,
    adStatus: state.ad.data.status,
    isSavingAd: state.ad.isSavingAd,
    validation: state.ad.validation
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    saveAd: () => dispatch({ type: SAVE_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusEdit);
