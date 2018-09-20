import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DelayedSpinner from '../common/DelayedSpinner';
import Faded from '../common/faded/Faded';
import { registerShortcuts, removeShortcuts } from '../common/shortcuts/Shortcuts';
import Duplicates from '../duplicates/Duplicates';
import './Ad.less';
import { SHOW_DUPLICATES_MODAL } from '../duplicates/duplicatesReducer';
import { REMOVE_AD_DATA } from './adDataReducer';
import Administration from './administration/Administration';
import { EDIT_AD, FETCH_AD, FETCH_NEXT_AD, PREVIEW_EDIT_AD, RESET_WORK_PRIORITY } from './adReducer';
import Edit from './edit/Edit';
import Error from './error/Error';
import Preview from './preview/Preview';

const isDefaultWorkPriority = (workPriority) =>
    workPriority.source === undefined && workPriority.status === undefined &&
    workPriority.sort === 'created,asc' &&
    (workPriority.employerName === undefined || workPriority.employerName === '') &&
    (workPriority.title === undefined || workPriority.title === '') &&
    (workPriority.id === undefined || workPriority.id === '');

class Ad extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.match.params.uuid) {
            this.uuid = this.props.match.params.uuid;
            this.props.getStilling(this.uuid);
        } else {
            this.props.getNextAd();
        }

        registerShortcuts('Ad', {
            'd d': () => {
                this.onFindDuplicatesClick();
            }
        });
    }

    componentDidUpdate() {
        if (!this.uuid && this.props.stilling) {
            // Skjer når man kommer rett til /ads uten uuid
            this.uuid = this.props.stilling.uuid;
            this.props.history.replace(`/ads/${this.uuid}`);
        } else if (this.uuid && this.props.stilling && this.props.stilling.uuid !== this.uuid) {
            // Skjer når man har trykket hent neste
            this.uuid = this.props.stilling.uuid;
            this.props.history.push(`/ads/${this.uuid}`);
        } else if (this.props.match.params.uuid && this.props.match.params.uuid !== this.uuid) {
            // Skjer når man trykker tilbake i browser
            this.uuid = this.props.match.params.uuid;
            this.props.getStilling(this.uuid);
        }
    }

    componentWillUnmount() {
        this.props.removeAdData();
        removeShortcuts('Ad');
    }

    onEditAdClick = () => {
        this.props.editAd();
    };

    onPreviewAdClick = () => {
        this.props.previewAd();
    };

    onNextAdClick = () => {
        this.props.resetWorkPriority();
        this.props.getNextAd();
    };

    onFindDuplicatesClick = () => {
        this.props.showDuplicatesModal();
    };

    render() {
        const {
            stilling, isFetchingStilling, isEditingAd, endOfList, workPriority
        } = this.props;

        if (endOfList) {
            return (
                <div className="Ad__end-of-list">
                    {isDefaultWorkPriority(workPriority) ? (
                        <div>
                            <Systemtittel className="Ad__title__end-of-list">
                                Fant ingen flere annonser
                            </Systemtittel>
                            <Normaltekst>
                                Alle annonser er ferdigbehandlet
                            </Normaltekst>
                        </div>
                    ) : (
                        <div>
                            <Systemtittel className="Ad__title__end-of-list">
                                Listen er tom
                            </Systemtittel>
                            <Normaltekst>
                                Du jobber med et filter hvor alle annonser er under behandling eller ferdigbehandlet.
                            </Normaltekst>
                            <Normaltekst className="Ad__text__end-of-list">
                                Trykk for å fortsette med neste ledige annonse.
                            </Normaltekst>
                            <Hovedknapp
                                className=""
                                onClick={this.onNextAdClick}
                            >
                                Gå til neste
                            </Hovedknapp>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="Ad">
                {!isFetchingStilling && stilling ? (
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
                                                        onClick={this.onFindDuplicatesClick}
                                                        mini
                                                    >
                                                        Duplikatsjekk
                                                    </Knapp>
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
                                                    onClick={this.onFindDuplicatesClick}
                                                    mini
                                                >
                                                    Duplikatsjekk
                                                </Knapp>
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
                ) : (
                    <div className="Ad__spinner">
                        <DelayedSpinner />
                    </div>
                )}
                <Error />
                <Duplicates />
            </div>
        );
    }
}


Ad.defaultProps = {
    stilling: undefined,
    isFetchingStilling: false,
    endOfList: false
};

Ad.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string.isRequired,
        properties: PropTypes.shape({
            adtext: PropTypes.string
        }).isRequired
    }),
    getStilling: PropTypes.func.isRequired,
    getNextAd: PropTypes.func.isRequired,
    editAd: PropTypes.func.isRequired,
    previewAd: PropTypes.func.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    isFetchingStilling: PropTypes.bool,
    endOfList: PropTypes.bool,
    workPriority: PropTypes.shape({
        source: PropTypes.string,
        status: PropTypes.string,
        sort: PropTypes.string,
        employerName: PropTypes.string,
        title: PropTypes.string,
        id: PropTypes.string
    }).isRequired,
    resetWorkPriority: PropTypes.func.isRequired,
    removeAdData: PropTypes.func.isRequired,
    showDuplicatesModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isFetchingStilling: state.ad.isFetchingStilling,
    stilling: state.adData,
    isEditingAd: state.ad.isEditingAd,
    endOfList: state.ad.endOfList,
    workPriority: state.ad.workPriority
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    editAd: () => dispatch({ type: EDIT_AD }),
    previewAd: () => dispatch({ type: PREVIEW_EDIT_AD }),
    resetWorkPriority: () => dispatch({ type: RESET_WORK_PRIORITY }),
    removeAdData: () => dispatch({ type: REMOVE_AD_DATA }),
    showDuplicatesModal: () => dispatch({ type: SHOW_DUPLICATES_MODAL })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
