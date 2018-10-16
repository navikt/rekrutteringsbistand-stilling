import { Knapp } from 'nav-frontend-knapper';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Faded from '../common/faded/Faded';
import './Ad.less';
import { REMOVE_AD_DATA } from './adDataReducer';
import { CREATE_AD, EDIT_AD, FETCH_AD, PREVIEW_EDIT_AD } from './adReducer';
import Edit from './edit/Edit';
import Error from './error/Error';
import Preview from './preview/Preview';
import Administration from './administration/Administration';

class Ad extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.match.params.uuid) {
            this.uuid = this.props.match.params.uuid;
            this.props.getStilling(this.uuid);
        } else {
            this.props.createAd();
        }
    }

    componentDidUpdate() {
        if (!this.uuid && this.props.stilling && this.props.stilling.uuid) {
            // Skjer når man kommer rett til /ads uten uuid
            this.uuid = this.props.stilling.uuid;
            this.props.history.replace(`/ads/${this.uuid}`);
        }
    }

    componentWillUnmount() {
        this.props.removeAdData();
    }

    onEditAdClick = () => {
        this.props.editAd();
    };

    onPreviewAdClick = () => {
        this.props.previewAd();
    };

    render() {
        const { stilling, isEditingAd } = this.props;

        return (
            <div className="Ad">
                <Faded>
                    <div className="Ad__flex">
                        <div className="Ad__flex__center">
                            <div className="Ad__flex__center__inner">
                                <div>
                                    {isEditingAd ? (
                                        <div>
                                            <div className="Ad__edit__inner">
                                                <Knapp
                                                    className="Ad__preview__edit-button"
                                                    onClick={this.onPreviewAdClick}
                                                    mini
                                                >
                                                    Forhåndsvis annonsen
                                                </Knapp>
                                                <Edit />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="Ad__preview">
                                            <Knapp
                                                className="Ad__preview__edit-button"
                                                onClick={this.onEditAdClick}
                                                mini
                                            >
                                                Rediger annonsen
                                            </Knapp>
                                            <Preview ad={stilling} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="Ad__flex__right">
                            <div className="Ad__flex__right__inner">
                                <Administration />
                            </div>
                        </div>
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
        uuid: PropTypes.string
    }),
    getStilling: PropTypes.func.isRequired,
    createAd: PropTypes.func.isRequired,
    editAd: PropTypes.func.isRequired,
    previewAd: PropTypes.func.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    removeAdData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    stilling: state.adData,
    isEditingAd: state.ad.isEditingAd
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid }),
    createAd: () => dispatch({ type: CREATE_AD }),
    editAd: () => dispatch({ type: EDIT_AD }),
    previewAd: () => dispatch({ type: PREVIEW_EDIT_AD }),
    removeAdData: () => dispatch({ type: REMOVE_AD_DATA })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
