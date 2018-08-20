import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';
import AdminStatusEnum from './adminStatus/AdminStatusEnum';
import AdStatusEnum from './adStatus/AdStatusEnum';
import AdStatusPreview from './adStatus/AdStatusPreview';
import AdStatusEdit from './adStatus/AdStatusEdit';
import CommentsEdit from './comments/CommentsEdit';
import CommentsPreview from './comments/CommentsPreview';
import Styrk from './styrk/Styrk';
import Location from './location/Location';
import Employer from './employer/Employer';
import LocationPreview from './location/LocationPreview';
import StyrkPreview from './styrk/StyrkPreview';
import EmployerPreview from "./employer/EmployerPreview";
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import AdminStatusEdit from './adminStatus/AdminStatusEdit';
import { DISCARD_AD_CHANGES, FETCH_NEXT_AD, SAVE_AD } from '../adReducer';
import { SET_ADMIN_STATUS_AND_GET_NEXT_AD } from '../adDataReducer';
import AdminStatusNotSavedPopup from './AdminStatusNotSavedPopup';
import AdNotSavedPopup from './AdNotSavedPopup';
import AdContainsErrorPopup from './AdContainsErrorPopup';
import './Administration.less';

class Administration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isErrorModalOpen: false
        };
    }

    onNextClick = () => {
        if (this.props.adminStatus === AdminStatusEnum.PENDING) {
            this.onOpenPopup();
        } else {
            this.props.getNextAd();
        }
    };

    onClosePopup = () => {
        this.setState({
            isModalOpen: false,
            isErrorModalOpen: false
        });
    };

    onOpenPopup = () => {
        this.setState({
            isModalOpen: true
        });
    };

    onSaveAdClick = () => {
        this.props.saveAd();
    };

    onDiscardClick = () => {
        this.props.discardAdChanges();
    };

    onNextWithoutFinishClick = () => {
        this.props.getNextAd();
    };

    onNextAndFinishClick = () => {
        if (this.props.adStatus === AdStatusEnum.ACTIVE && this.props.validation.employer !== undefined) {
            this.setState({
                isErrorModalOpen: true,
                isModalOpen: false
            });
        } else {
            this.props.setAdminStatusAndGetNextAd(AdminStatusEnum.DONE);
        }
    };

    render() {
        const { adStatus, adminStatus, isEditingAd, categoryList } = this.props;
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
                                <CommentsEdit />
                            </div>
                        ) : (
                            <div>
                                <AdStatusPreview />
                                <div className="blokk">
                                    <Element>Yrke</Element>
                                    <StyrkPreview />
                                </div>
                                <div className="blokk">
                                    <Element>Arbeidsgiver fra Enhetsregisteret</Element>
                                    <EmployerPreview />
                                </div>
                                <div className="blokk">
                                    <Element>Arbeidssted</Element>
                                    <LocationPreview />
                                </div>
                                <CommentsPreview />
                            </div>
                        )}
                    </div>

                    <div className="Administration__flex__bottom">
                        <AdminStatusPreview />
                        <div className="Administration__buttons">
                            <AdminStatusEdit />
                            <Knapp className="AdminStatusEdit__button" onClick={this.onNextClick}>
                                Gå til neste annonse
                            </Knapp>
                            <AdminStatusNotSavedPopup
                                isOpen={this.state.isModalOpen && !isEditingAd}
                                onClose={this.onClosePopup}
                                onNextAndFinishClick={this.onNextAndFinishClick}
                                onNextWithoutFinishClick={this.onNextWithoutFinishClick}
                            />
                            <AdNotSavedPopup
                                isOpen={this.state.isModalOpen && isEditingAd}
                                onClose={this.onClosePopup}
                                onDiscard={this.onDiscardClick}
                                onSave={this.onSaveAdClick}
                            />
                            <AdContainsErrorPopup
                                onClose={this.onClosePopup}
                                isOpen={this.state.isErrorModalOpen}
                            />
                        </div>
                    </div>
                </div>
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
    getNextAd: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    discardAdChanges: PropTypes.func.isRequired,
    setAdminStatusAndGetNextAd: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    adminStatus: state.adData.administration.status,
    isEditingAd: state.ad.isEditingAd,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    setAdminStatusAndGetNextAd: (status) => dispatch({ type: SET_ADMIN_STATUS_AND_GET_NEXT_AD, status }),
    discardAdChanges: () => dispatch({ type: DISCARD_AD_CHANGES })
});

export default connect(mapStateToProps, mapDispatchToProps)(Administration);
