import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { SAVE_AD } from '../../adReducer';
import { SET_ADMIN_STATUS } from '../../adDataReducer';
import AdminStatusEnum from './AdminStatusEnum';
import {
    registerShortcuts,
    removeShortcuts
} from '../../../common/shortcuts/Shortcuts';
import AdStatusEnum from '../adStatus/AdStatusEnum';
import { OPEN_MODAL } from "../modals/modalReducer";

const validationError = (validation) => validation.styrk !== undefined ||
    validation.location !== undefined || validation.employer !== undefined;

class AdminStatusEdit extends React.Component {
    componentDidMount() {
        registerShortcuts('administrationStatus', {
            'x x': () => {
                if (this.props.adminStatus === AdminStatusEnum.PENDING) {
                    this.onSetToDoneClick();
                }
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('administrationStatus');
    }

    onSetToPendingClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
        this.props.saveAd();
    };

    onSetToDoneClick = () => {
        if (this.props.adStatus === AdStatusEnum.ACTIVE && validationError(this.props.validation)) {
            this.props.openModal(false);
        } else {
            this.props.setAdminStatus(AdminStatusEnum.DONE);
            this.props.saveAd();
        }
    };

    render() {
        const { adminStatus } = this.props;

        return (
            <div className="AdminStatusEdit">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <div>
                        <Hovedknapp className="AdminStatusEdit__button" onClick={this.onSetToPendingClick}>
                            Start
                        </Hovedknapp>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <div>
                        <Hovedknapp
                            disabled={!this.props.hasChanges}
                            className="AdminStatusEdit__button"
                            onClick={this.onSetToDoneClick}
                        >
                            Lagre
                        </Hovedknapp>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <div>
                        <Hovedknapp className="AdminStatusEdit__button" onClick={this.onSetToPendingClick}>
                            Gjennåpne
                        </Hovedknapp>

                    </div>
                )}
            </div>
        );
    }
}

AdminStatusEdit.propTypes = {
    adminStatus: PropTypes.string.isRequired,
    adStatus: PropTypes.string.isRequired,
    setAdminStatus: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string,
        styrk: PropTypes.string,
        location: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    adStatus: state.adData.status,
    hasChanges: state.ad.hasChanges,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    openModal: (value) => dispatch({ type: OPEN_MODAL, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusEdit);
