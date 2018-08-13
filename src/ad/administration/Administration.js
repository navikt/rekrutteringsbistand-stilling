import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import { FETCH_AD, SAVE_AD, EDIT_AD, DISCARD_AD_CHANGES } from '../adReducer';

class Administration extends React.Component {
    componentDidMount() {
        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.history.push(`/ads/${adUuid}`);
        }
    }

    componentDidUpdate() {
        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.getStilling(this.props.match.params.uuid);
        }
    }

    onSaveClick = () => {
        this.props.saveAd();
    };

    onEditAdClick = () => {
        this.props.editAd();
    };

    onDiscardAdChanges = (e) => {
        e.preventDefault();
        this.props.discardAdChanges();
    };

    render() {
        const {
            adStatus, adminStatus, isEditingAd, validation, isSavingAd
        } = this.props;
        const hasErrors = Object.keys(validation).find((key) => (
            validation[key] !== undefined
        ));

        return (
            <div className="Administration">
                <AdminStatusPreview />
                <div className="Administration__buttons">
                    <AdminStatusEdit />
                    {adminStatus === AdminStatusEnum.PENDING && (
                        <div>
                            {isEditingAd ? (
                                <div>
                                    <Knapp
                                        spinner={isSavingAd}
                                        className="AdminStatusEdit__button"
                                        onClick={this.onSaveClick}
                                        disabled={hasErrors && adStatus === AdStatusEnum.ACTIVE}
                                    >
                                        Lagre annonsen
                                    </Knapp>
                                    <a href="#" className="typo-normal lenke" onClick={this.onDiscardAdChanges}>
                                        Avbryt endringer
                                    </a>
                                </div>
                            ) : (
                                <Knapp
                                    className="AdminStatusEdit__button"
                                    onClick={this.onEditAdClick}
                                >
                                    Rediger annonsen
                                </Knapp>
                            )}
                        </div>
                    )}
                </div>

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
        );
    }
}

Administration.defaultProps = {
    adminStatus: undefined
};

Administration.propTypes = {
    adStatus: PropTypes.string.isRequired,
    adminStatus: PropTypes.string,
    adUuid: PropTypes.string.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    isSavingAd: PropTypes.bool.isRequired,
    getStilling: PropTypes.func.isRequired,
    editAd: PropTypes.func.isRequired,
    discardAdChanges: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    validation: PropTypes.shape({}).isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.ad.data.status,
    adminStatus: state.ad.data.administration.status,
    adUuid: state.ad.data.uuid,
    validation: state.ad.validation,
    isSavingAd: state.ad.isSavingAd,
    isEditingAd: state.ad.isEditingAd
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid }),
    editAd: () => dispatch({ type: EDIT_AD }),
    discardAdChanges: () => dispatch({ type: DISCARD_AD_CHANGES }),
    saveAd: () => dispatch({ type: SAVE_AD })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Administration));
