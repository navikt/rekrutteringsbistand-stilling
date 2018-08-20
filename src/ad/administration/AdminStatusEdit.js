import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { DISCARD_AD_CHANGES, FETCH_NEXT_AD, SAVE_AD } from '../adReducer';
import { SET_ADMIN_STATUS } from '../adDataReducer';
import AdminStatusEnum from './AdminStatusEnum';
import {
    registerShortcuts,
    removeShortcuts
} from '../../common/shortcuts/Shortcuts';
import AdNotSavedPopup from './AdNotSavedPopup';
import AdStatusEnum from './AdStatusEnum';
import AdContainsErrorPopup from './AdContainsErrorPopup';

class AdminStatusEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
    }

    componentDidMount() {
        registerShortcuts('administration', {
            'a a': () => {
                if (this.props.adminStatus === AdminStatusEnum.PENDING) {
                    this.onSetToDoneClick();
                }
            },
            'n n': () => {
                if (this.props.adminStatus !== AdminStatusEnum.PENDING) {
                    this.props.getNextAd();
                }
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('administration');
    }

    onSetToPendingClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
        this.props.saveAd();
        this.onCloseModal();
    };

    onSetToDoneClick = () => {
        if (this.props.isEditingAd ||
            (this.props.adStatus === AdStatusEnum.ACTIVE && this.props.validation.employer !== undefined)) {
            this.setState({
                isModalOpen: true
            });
        } else {
            this.props.setAdminStatus(AdminStatusEnum.DONE);
            this.props.saveAd()
        }
    };

    onCloseModal = () => {
        this.setState({
            isModalOpen: false
        });
    };

    onSaveAdClick = () => {
        if (this.props.adStatus === AdStatusEnum.ACTIVE) {
            if (this.props.validation.employer === undefined) {
                this.props.setAdminStatus(AdminStatusEnum.DONE);
                this.onCloseModal();
            }
        } else {
            this.props.setAdminStatus(AdminStatusEnum.DONE);
            this.onCloseModal();
        }
        this.props.saveAd();
    };

    onDiscardClick = () => {
        this.props.discardAdChanges();
        if (this.props.adStatus === AdStatusEnum.ACTIVE) {
            if (this.props.validation.employer === undefined) {
                this.props.setAdminStatus(AdminStatusEnum.DONE);
                this.onCloseModal();
            }
        } else {
            this.props.setAdminStatus(AdminStatusEnum.DONE);
            this.onCloseModal();
        }
    };

    render() {
        const { adminStatus, isEditingAd } = this.props;

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
                <AdNotSavedPopup
                    isOpen={this.state.isModalOpen && isEditingAd}
                    onSave={this.onSaveAdClick}
                    onDiscard={this.onDiscardClick}
                    onClose={this.onCloseModal}
                />
                <AdContainsErrorPopup
                    isOpen={this.state.isModalOpen && !isEditingAd}
                    onClose={this.onCloseModal}
                />
            </div>
        );
    }
}

AdminStatusEdit.propTypes = {
    adminStatus: PropTypes.string.isRequired,
    adStatus: PropTypes.string.isRequired,
    setAdminStatus: PropTypes.func.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    getNextAd: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    discardAdChanges: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    adStatus: state.adData.status,
    isEditingAd: state.ad.isEditingAd,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    discardAdChanges: () => dispatch({ type: DISCARD_AD_CHANGES })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusEdit);
