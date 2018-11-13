import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import Faded from '../common/faded/Faded';
import './Ad.less';
import { REMOVE_AD_DATA } from './adDataReducer';
import { CREATE_AD, FETCH_AD, PREVIEW_EDIT_AD, EDIT_AD } from './adReducer';
import Edit from './edit/Edit';
import Error from './error/Error';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import SavedAdAlertStripe from './alertstripe/SavedAdAlertStripe';
import PreviewHeader from './preview/header/PreviewHeader';
import EditHeader from './edit/header/EditHeader';
import AdStatusEnum from './administration/adStatus/AdStatusEnum';

class Ad extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.match.params.uuid) {
            this.uuid = this.props.match.params.uuid;
            const edit = this.props.location.state && this.props.location.state.openInEditMode;
            this.props.getStilling(this.uuid, edit);
        } else {
            this.props.createAd();
        }
    }

    componentDidUpdate() {
        if (!this.uuid && this.props.stilling && this.props.stilling.uuid) {
            // Skjer når man kommer rett til /stillinger uten uuid
            this.uuid = this.props.stilling.uuid;
            this.props.history.replace(`/stillinger/${this.uuid}`);
        }
    }

    componentWillUnmount() {
        this.props.removeAdData();
    }


    onPreviewAdClick = () => {
        this.props.previewAd();
    };

    render() {
        const { stilling, isEditingAd, editTitle } = this.props;

        if (stilling.status === AdStatusEnum.DELETED) {
            return (
                <div className="Ad Ad__deleted">
                    <Normaltekst className="blokk-s">Stillingen er slettet</Normaltekst>
                    <Link
                        to="/search"
                        className="typo-normal lenke"
                    >
                        Søk etter stillinger
                    </Link>
                </div>
            );
        }

        return (
            <div className="Ad">
                <SavedAdAlertStripe />
                <Faded>
                    <div className="Ad__flex">
                        <div className="Ad__flex__center">
                            <div className="Ad__flex__center__inner">
                                <div>
                                    {isEditingAd ? (
                                        <div className="Ad__edit__inner">
                                            <EditHeader
                                                status={this.props.status}
                                                title={editTitle}
                                                source={this.props.stilling.source}
                                                onPreviewAdClick={this.onPreviewAdClick}
                                                uuid={stilling.uuid}
                                            />
                                            <Edit />
                                        </div>
                                    ) : (
                                        <div className="Ad__preview">
                                            <PreviewHeader />
                                            <Preview ad={stilling} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {isEditingAd ? (
                            <div className="Ad__flex__right">
                                <div className="Ad__flex__right__inner">
                                    <Administration />
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                </Faded>
                <Error />
            </div>
        );
    }
}


Ad.defaultProps = {
    stilling: undefined
};

Ad.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string,
        uuid: PropTypes.string,
        source: PropTypes.string
    }),
    getStilling: PropTypes.func.isRequired,
    createAd: PropTypes.func.isRequired,
    previewAd: PropTypes.func.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    removeAdData: PropTypes.func.isRequired,
    status: PropTypes.string
};

const mapStateToProps = (state) => ({
    stilling: state.adData,
    isEditingAd: state.ad.isEditingAd,
    editTitle: state.ad.editTitle,
    status: state.adData.administration.status
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid, edit) => dispatch({ type: FETCH_AD, uuid, edit }),
    createAd: () => dispatch({ type: CREATE_AD }),
    previewAd: () => dispatch({ type: PREVIEW_EDIT_AD }),
    removeAdData: () => dispatch({ type: REMOVE_AD_DATA })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
