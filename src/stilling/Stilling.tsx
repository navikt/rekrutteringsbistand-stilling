import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Faded from '../common/faded/Faded';
import DelayedSpinner from '../common/DelayedSpinner';
import { REMOVE_AD_DATA } from './adDataReducer';
import { EDIT_AD, FETCH_AD, PREVIEW_EDIT_AD } from './adReducer';
import Edit from './edit/Edit';
import Error from './error/Error';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import AdministrationLimited from './administration/limited/AdministrationLimited';
import AdministrationPreview from './preview/administration/AdministrationPreview';
import SavedAdAlertStripe from './alertstripe/SavedAdAlertStripe';
import PreviewHeader from './preview/header/PreviewHeader';
import AdStatusEnum from '../common/enums/AdStatusEnum';
import { State } from '../redux/store';
import { VarslingActionType } from '../common/varsling/varslingReducer';
import './Stilling.less';
import useHentEllerOpprettKandidatliste from './kandidathandlinger/useHentEllerOpprettKandidatliste';
import { Nettstatus } from '../api/Nettressurs';

export const REDIGERINGSMODUS_QUERY_PARAM = 'redigeringsmodus';

type QueryParams = { uuid: string };
type LocationState = { isNew?: boolean };

const Stilling = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { uuid } = useParams<QueryParams>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const stilling = useSelector((state: State) => state.adData);
    const { isEditingAd, isSavingAd, isLoadingAd } = useSelector((state: State) => state.ad);
    const kandidatliste = useHentEllerOpprettKandidatliste(stilling.uuid);

    const getStilling = (uuid: string, edit: boolean) => {
        dispatch({ type: FETCH_AD, uuid, edit });
    };

    const previewAd = () => {
        dispatch({ type: PREVIEW_EDIT_AD });
    };

    const removeAdData = () => {
        dispatch({ type: REMOVE_AD_DATA });
    };

    const enableEditMode = () => {
        dispatch({ type: EDIT_AD });
    };

    const showRecoveryMessage = (message: string) => {
        dispatch({
            type: VarslingActionType.VisVarsling,
            innhold: message,
        });
    };

    const fjernRedigeringsmodusFraUrl = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete(REDIGERINGSMODUS_QUERY_PARAM);

        setSearchParams(newSearchParams);
    };

    const onPreviewAdClick = () => {
        fjernRedigeringsmodusFraUrl();
        previewAd();
    };

    useEffect(() => {
        const erRedigeringsmodus = searchParams.get(REDIGERINGSMODUS_QUERY_PARAM) === 'true';

        if (isEditingAd && isSavingAd) {
            enableEditMode();
            showRecoveryMessage(
                'Vi beholdt endringene dine, men de er ennå ikke publisert fordi sesjonen din utløp'
            );
        } else if (uuid) {
            getStilling(uuid, erRedigeringsmodus);
        }

        return () => {
            removeAdData();
        };

        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        const manglerUuidIUrl = !uuid && stilling?.uuid;

        // Skjer når man kommer rett til /stillinger/stilling uten uuid
        if (manglerUuidIUrl) {
            navigate(
                {
                    pathname: `/stillinger/stilling/${uuid}`,
                },
                {
                    replace: true,
                    state,
                }
            );
        }
    }, [uuid]);

    const isNew = (state as LocationState)?.isNew || false;
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

    const kandidatlisteId =
        kandidatliste.kind === Nettstatus.Suksess ? kandidatliste.data.kandidatlisteId : '';

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
                                                kandidatliste={kandidatliste}
                                                onPreviewAdClick={onPreviewAdClick}
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
                                    <AdministrationLimited kandidatlisteId={kandidatlisteId} />
                                ) : (
                                    <Administration kandidatlisteId={kandidatlisteId} />
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
};

export default Stilling;
