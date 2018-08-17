import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FETCH_NEXT_AD, SAVE_AD } from '../adReducer';
import { SET_ADMIN_STATUS } from '../adDataReducer';
import AdminStatusEnum from './AdminStatusEnum';
import ConfirmationPopup from './ConfirmationPopup';
import {
    registerShortcuts,
    removeShortcuts
} from '../../common/shortcuts/Shortcuts';

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

    onClosePopup = () => {
        this.setState({
            isModalOpen: false
        });
    };

    onSetToPendingClick = () => {
        this.setState({
            isModalOpen: false
        });
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
        this.props.saveAd();
    };

    onSetToDoneClick = () => {
        if (this.props.isEditingAd) {
            this.setState({
                isModalOpen: true
            });
        } else {
            this.props.setAdminStatus(AdminStatusEnum.DONE);
            this.props.saveAd()
        }
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
                        <ConfirmationPopup
                            isOpen={this.state.isModalOpen}
                            onCancel={this.onClosePopup}
                        />
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
    isEditingAd: PropTypes.bool.isRequired,
    getNextAd: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    isEditingAd: state.ad.isEditingAd
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    saveAd: () => dispatch({ type: SAVE_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusEdit);
