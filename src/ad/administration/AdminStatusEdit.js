import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FETCH_NEXT_AD, SAVE_AD, SET_ADMIN_STATUS } from '../adReducer';
import AdminStatusEnum from './AdminStatusEnum';

class AdminStatusEdit extends React.Component {
    onSetToPendingClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
        this.props.saveAd();
    };

    onSetToDoneClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.DONE);
        this.props.saveAd();
    };

    render() {
        const { adminStatus } = this.props;

        return (
            <div className="AdminStatusEdit">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <div>
                        <Hovedknapp className="AdminStatusEdit__button" onClick={this.onSetToPendingClick}>
                            Start saksbehandling
                        </Hovedknapp>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <div>
                        <Hovedknapp
                            className="AdminStatusEdit__button"
                            onClick={this.onSetToDoneClick}
                        >
                            Avslutt saksbehandling
                        </Hovedknapp>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <div>
                        <Hovedknapp className="AdminStatusEdit__button" onClick={this.onSetToPendingClick}>
                            Gjennåpne saksbehandling
                        </Hovedknapp>

                    </div>
                )}
            </div>
        );
    }
}

AdminStatusEdit.propTypes = {
    adminStatus: PropTypes.string.isRequired,
    setAdminStatus: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.ad.data.administration.status
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusEdit);
