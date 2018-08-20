import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import { Element } from 'nav-frontend-typografi';
import AdminStatusEnum from './adminStatus/AdminStatusEnum';
import AdStatusEnum from './adStatus/AdStatusEnum';
import AdStatusPreview from './adStatus/AdStatusPreview';
import AdStatusEdit from './adStatus/AdStatusEdit';
import RemarksEdit from './adStatus/RemarksEdit';
import CommentsEdit from './comments/CommentsEdit';
import CommentsPreview from './comments/CommentsPreview';
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import AdminStatusEdit from './adminStatus/AdminStatusEdit';
import './Administration.less';
import { FETCH_NEXT_AD } from '../adReducer';
import ConfirmationPopup from './ConfirmationPopup';
import Styrk from './styrk/Styrk';
import Location from './location/Location';
import Employer from './employer/Employer';
import LocationPreview from './location/LocationPreview';
import StyrkPreview from './styrk/StyrkPreview';
import EmployerPreview from "./employer/EmployerPreview";

class Administration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            next: false
        };
    }

    onNextClick = () => {
        if (this.props.adminStatus === AdminStatusEnum.PENDING) {
            this.onOpenPopup(true);
        } else {
            this.props.getNextAd();
        }
    };

    onClosePopup = () => {
        this.setState({
            isModalOpen: false,
            next: false
        });
    };

    onOpenPopup = (next = false) => {
        this.setState({
            isModalOpen: true,
            next
        });
    };

    render() {
        const { adStatus, adminStatus, categoryList } = this.props;
        return (
            <div className="Administration">
                <div className="Administration__flex">
                    <div className="Administration__flex__top">
                        {adminStatus === AdminStatusEnum.PENDING ? (
                            <div>
                                <div className="blokk">
                                    <Element>Yrke</Element>
                                    <Styrk />
                                </div>
                                <div className="blokk">
                                    <Element>Sted</Element>
                                    <Location />
                                </div>
                                <div className="blokk">
                                    <Element>Arbeidsgiver fra Enhetsregisteret</Element>
                                    <Employer />
                                </div>
                                <div className="blokk">
                                    <Element>Annonsestatus</Element>
                                    <AdStatusEdit />
                                    {adStatus === AdStatusEnum.REJECTED && (
                                        <RemarksEdit />
                                    )}
                                </div>
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
                                    <Element>Sted</Element>
                                    <LocationPreview />
                                </div>
                                <div className="blokk">
                                    <Element>Arbeidsgiver fra Enhetsregisteret</Element>
                                    <EmployerPreview />
                                </div>
                                <CommentsPreview />
                            </div>
                        )}
                    </div>

                    <div className="Administration__flex__bottom">
                        <AdminStatusPreview />
                        <div className="Administration__buttons">
                            <AdminStatusEdit
                                closeModal={this.onClosePopup}
                                openModal={this.onOpenPopup}
                            />
                            <Knapp className="AdminStatusEdit__button" onClick={this.onNextClick}>
                                Gå til neste annonse
                            </Knapp>
                            <ConfirmationPopup
                                isOpen={this.state.isModalOpen}
                                onClosePopup={this.onClosePopup}
                                next={this.state.next}
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
