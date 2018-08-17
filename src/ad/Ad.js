import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import {
    EDIT_AD, FETCH_AD, FETCH_NEXT_AD,
    RESET_WORK_PRIORITY
} from './adReducer';
import Error from './error/Error';
import DelayedSpinner from '../common/DelayedSpinner';
import './Ad.less';
import Faded from '../common/faded/Faded';
import Edit from './edit/Edit';
import ValidationSummary from './validation/ValidationSummary';
import AdminStatusEnum from './administration/AdminStatusEnum';
import {
    registerShortcuts,
    removeShortcuts
} from '../common/shortcuts/Shortcuts';
import { SET_AD_DATA } from './adDataReducer';

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
        registerShortcuts('annonse', {
            'r r': () => {
                if (!this.props.isEditingAd) {
                    this.onEditAdClick();
                }
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
        this.props.unsetAd();
        removeShortcuts('annonse');
    }

    onEditAdClick = () => {
        this.props.editAd();
    };

    onNextAdClick = () => {
        this.props.resetWorkPriority();
        this.props.getNextAd();
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

                                    {stilling.administration.status === AdminStatusEnum.PENDING ? (
                                        <div>
                                            {isEditingAd ? (
                                                <div className="Ad__edit">
                                                    <div className="Ad__edit__inner">
                                                        <ValidationSummary />
                                                        <Edit />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="Ad__preview">
                                                    <ValidationSummary />
                                                    <Knapp
                                                        className="Ad__preview__edit-button"
                                                        onClick={this.onEditAdClick}
                                                    >
                                                        Rediger annonsen
                                                    </Knapp>
                                                    <Preview stilling={stilling} />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="Ad__preview">
                                            <ValidationSummary />
                                            <Preview stilling={stilling} />
                                        </div>
                                    )}
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
    resetWorkPriority: PropTypes.func.isRequired
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
    unsetAd: () => dispatch({ type: SET_AD_DATA, data: null }),
    resetWorkPriority: () => dispatch({ type: RESET_WORK_PRIORITY })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
