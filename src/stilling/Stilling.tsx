import React from 'react';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import Faded from '../common/faded/Faded';
import DelayedSpinner from '../common/DelayedSpinner';
import { AdDataState, REMOVE_AD_DATA } from './adDataReducer';
import { CREATE_AD, EDIT_AD, FETCH_AD, PREVIEW_EDIT_AD } from './adReducer';
import Edit from './edit/Edit';
import Error from './error/Error';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import AdministrationLimited from './administration/limited/AdministrationLimited';
import AdministrationPreview from './preview/administration/AdministrationPreview';
import SavedAdAlertStripe from './alertstripe/SavedAdAlertStripe';
import PreviewHeader from './preview/header/PreviewHeader';
import AdStatusEnum from '../common/enums/AdStatusEnum';
import { RouteChildrenProps } from 'react-router';
import { State } from '../redux/store';
import './Stilling.less';
import { VarslingActionType } from '../common/varsling/varslingReducer';

export const REDIGERINGSMODUS_QUERY_PARAM = 'redigeringsmodus';

type QueryParams = { uuid: string };
type LocationState = { isNew?: boolean };

type Props = {
    stilling: AdDataState;
    getStilling: (uuid: string, redigeringsmodus: boolean) => void;
    createAd: () => void;
    previewAd: () => void;
    isEditingAd: boolean;
    isSavingAd: boolean;
    removeAdData: () => void;
    isLoadingAd?: boolean;
    enableEditMode: () => void;
    showRecoveryMessage: (message: string) => void;
} & RouteChildrenProps<QueryParams, LocationState>;

class Stilling extends React.Component<Props> {
    uuid?: string;

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.match?.params.uuid) {
            this.uuid = this.props.match.params.uuid;

            const queryParams = new URLSearchParams(this.props.location.search);
            const redigeringsmodus = queryParams.get(REDIGERINGSMODUS_QUERY_PARAM) === 'true';

            if (this.props.isEditingAd && this.props.isSavingAd) {
                this.props.enableEditMode();
                this.props.showRecoveryMessage(
                    'Vi beholdt endringene dine, men de er ennå ikke publisert fordi sesjonen din utløp'
                );
            } else {
                this.props.getStilling(this.uuid, redigeringsmodus);
            }
        } else {
            this.props.createAd();
        }
    }

    componentDidUpdate() {
        if (!this.uuid && this.props.stilling && this.props.stilling.uuid) {
            // Skjer når man kommer rett til /stillinger/stilling uten uuid
            this.uuid = this.props.stilling.uuid;
            this.props.history.replace({
                pathname: `/stillinger/stilling/${this.uuid}`,
                state: this.props.location.state,
            });
        }
    }

    componentWillUnmount() {
        this.props.removeAdData();
    }

    onPreviewAdClick = () => {
        this.fjernRedigeringsmodusFraUrl();
        this.props.previewAd();
    };

    fjernRedigeringsmodusFraUrl = () => {
        const queryParams = new URLSearchParams(this.props.location.search);
        queryParams.delete(REDIGERINGSMODUS_QUERY_PARAM);
        this.props.history.replace({
            pathname: this.props.location.pathname,
            search: queryParams.toString(),
        });
    };

    render() {
        const { stilling, isEditingAd, isLoadingAd } = this.props;
        const isNew = this.props.location.state?.isNew || false;
        const erEksternStilling = stilling.createdBy !== 'pam-rekrutteringsbistand';

        if (isLoadingAd || !stilling) {
            return (
                <div className="Ad Ad__spinner">
                    <DelayedSpinner />
                </div>
            );
        }

        if (stilling.status === AdStatusEnum.DELETED) {
            return (
                <div className="Ad Ad__deleted">
                    <Normaltekst className="blokk-s">Stillingen er slettet</Normaltekst>
                    <Link to="/stillinger" className="typo-normal lenke">
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
                        <h1 className="visually-hidden">Stilling</h1>
                        <div className="Ad__flex__center">
                            <div className="Ad__flex__center__inner">
                                <div>
                                    {isEditingAd ? (
                                        <div className="Ad__edit__inner">
                                            {erEksternStilling ? (
                                                <div>
                                                    <PreviewHeader />
                                                    <Preview ad={stilling} />
                                                </div>
                                            ) : (
                                                <Edit
                                                    isNew={isNew}
                                                    onPreviewAdClick={this.onPreviewAdClick}
                                                />
                                            )}
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
                                    {erEksternStilling ? (
                                        <AdministrationLimited />
                                    ) : (
                                        <Administration />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="Ad__flex__right">
                                <div className="Ad__flex__right__inner">
                                    <AdministrationPreview />
                                </div>
                            </div>
                        )}
                    </div>
                </Faded>
                <Error />
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    stilling: state.adData,
    isEditingAd: state.ad.isEditingAd,
    isSavingAd: state.ad.isSavingAd,
    isLoadingAd: state.ad.isLoadingAd,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    getStilling: (uuid: string, edit: boolean) => dispatch({ type: FETCH_AD, uuid, edit }),
    createAd: () => dispatch({ type: CREATE_AD }),
    previewAd: () => dispatch({ type: PREVIEW_EDIT_AD }),
    removeAdData: () => dispatch({ type: REMOVE_AD_DATA }),
    enableEditMode: () => dispatch({ type: EDIT_AD }),
    showRecoveryMessage: (message: string) =>
        dispatch({
            type: VarslingActionType.VisVarsling,
            innhold: message,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stilling);
