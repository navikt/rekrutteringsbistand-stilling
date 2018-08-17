import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import AdminStatusEnum from './AdminStatusEnum';
import AdStatusEnum from './AdStatusEnum';
import AdStatusPreview from './AdStatusPreview';
import AdStatusEdit from './AdStatusEdit';
import RemarksEdit from './RemarksEdit';
import CommentsEdit from './CommentsEdit';
import CommentsPreview from './CommentsPreview';
import AdminStatusPreview from './AdminStatusPreview';
import AdminStatusEdit from './AdminStatusEdit';
import './Administration.less';
import { FETCH_NEXT_AD } from '../adReducer';
import ConfirmationPopup from "./ConfirmationPopup";

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
        })
    };

    render() {
        const { adStatus, adminStatus } = this.props;
        return (
            <div className="Administration">
                <div className="Administration__flex">
                    <div className="Administration__flex__top">
                        {adminStatus === AdminStatusEnum.PENDING ? (
                            <div>
                                <AdStatusEdit />
                                {adStatus === AdStatusEnum.REJECTED && (
                                    <RemarksEdit />
                                )}
                                <CommentsEdit />
                            </div>
                        ) : (
                            <div>
                                <AdStatusPreview />
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
