import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import AdminStatusEnum from './adminStatus/AdminStatusEnum';
import AdStatusEnum from './adStatus/AdStatusEnum';
import AdStatusPreview from './adStatus/AdStatusPreview';
import AdStatusEdit from './adStatus/AdStatusEdit';
import Styrk from './styrk/Styrk';
import Location from './location/Location';
import Employer from './employer/Employer';
import LocationPreview from './location/LocationPreview';
import StyrkPreview from './styrk/StyrkPreview';
import EmployerPreview from './employer/EmployerPreview';
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import AdminStatusEdit from './adminStatus/AdminStatusEdit';
import { FETCH_NEXT_AD } from '../adReducer';
import {
    registerShortcuts,
    removeShortcuts
} from '../../common/shortcuts/Shortcuts';
import './Administration.less';
import RemarksEdit from './adStatus/RemarksEdit';
import ConfirmationModal from './modals/ConfirmationModal';

class Administration extends React.Component {
    componentDidMount() {
        registerShortcuts('administration', {
            'n n': () => {
                if (this.props.adminStatus === AdminStatusEnum.DONE) {
                    this.onNextClick();
                }
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('administration');
    }

    onNextClick = () => {
        this.props.getNextAd();
    };

    render() {
        const {
            adStatus, adminStatus
        } = this.props;
        return (
            <div className="Administration">
                <div className="Administration__flex">
                    <div className="Administration__flex__top">
                        {adminStatus === AdminStatusEnum.PENDING ? (
                            <div>
                                <Styrk />
                                <Employer />
                                <Location />
                                <AdStatusEdit />
                                {adStatus === AdStatusEnum.REJECTED && (
                                    <RemarksEdit />
                                )}
                            </div>
                        ) : (
                            <div>
                                <AdStatusPreview />
                                <StyrkPreview />
                                <EmployerPreview />
                                <LocationPreview />
                            </div>
                        )}
                    </div>

                    <div
                        className={adStatus === AdStatusEnum.REJECTED && adminStatus === AdminStatusEnum.PENDING ?
                            'Administration__flex__bottom Administration__flex__bottom--shadow' :
                            'Administration__flex__bottom'}
                    >
                        <AdminStatusPreview />
                        <div className="Administration__buttons">
                            <AdminStatusEdit />
                            {adminStatus === AdminStatusEnum.DONE && (
                                <Hovedknapp className="AdminStatusEdit__button" onClick={this.onNextClick}>
                                    Hent neste annonse
                                </Hovedknapp>
                            )}
                        </div>
                    </div>
                </div>
                <ConfirmationModal />
            </div>
        );
    }
}

Administration.defaultProps = {
    adminStatus: undefined
};

Administration.propTypes = {
    adStatus: PropTypes.string.isRequired,
    adminStatus: PropTypes.string,
    getNextAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    adminStatus: state.adData.administration.status
});

const mapDispatchToProps = (dispatch) => ({
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(Administration);
