import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column } from 'nav-frontend-grid';
import { connect } from 'react-redux';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import './Edit.less';
import PracticalInformation from './practicalInformation/PracticalInformation';
import Employer from './employer/Employer';
import JobDetails from './jobDetails/JobDetails';
import ContactPerson from './contactPerson/ContactPerson.tsx';
import Application from './application/Application';
import Location from './location/Location';
import { formatISOString } from '../../datoUtils.ts';
import EditHeader from './header/EditHeader';
import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import CandidateActions from '../candidateActions/CandidateActions';
import { Knapp } from 'nav-frontend-knapper';
import KopierTekst from '../kopierTekst/KopierTekst';
import { Element, Undertittel } from 'nav-frontend-typografi';
import RegistrerInkluderingsmuligheter from './registrer-inkluderingsmuligheter/DirektemeldtStilling';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import NavigationPrompt from 'react-router-navigation-prompt';
import { FORKAST_NY_STILLING, NyStillingState } from '../adReducer';
import BekreftForlatSidenModal from '../bekreft-forlat-siden-modal/BekreftForlatSidenModal.tsx';

const Edit = ({
    ad,
    isNew,
    onPreviewAdClick,
    hasChanges,
    resetValidation,
    updated,
    created,
    nyStillingState,
    forkastNyStilling,
}) => {
    const [forlatSiden, setForlatSiden] = useState(null);

    useEffect(() => {
        if (nyStillingState === NyStillingState.ErForkastet && forlatSiden) {
            forlatSiden.bekreft();
        }
    }, [nyStillingState, forlatSiden]);

    useEffect(() => {
        return () => {
            resetValidation();
        };
    }, [resetValidation]);

    // Fra EditHeader
    const stillingenErIntern = ad.createdBy !== 'pam-rekrutteringsbistand';
    const stillingsLenke = hentAnnonselenke(ad.uuid);

    const onForlatSidenClick = (bekreftForlatSiden) => () => {
        const stillingenErTom = updated === created;

        if (stillingenErTom) {
            forkastNyStilling();
            setForlatSiden({
                bekreft: bekreftForlatSiden,
            });
        } else {
            bekreftForlatSiden();
        }
    };

    return (
        <div className="Edit">
            <NavigationPrompt when={hasChanges}>
                {({ isActive, onConfirm, onCancel }) => (
                    <BekreftForlatSidenModal
                        vis={isActive}
                        onBliPåSidenClick={onCancel}
                        onForlatSidenClick={onForlatSidenClick(onConfirm)}
                    />
                )}
            </NavigationPrompt>
            <div className="Edit__actions">
                <CandidateActions />
                <div className="blokk-xs">
                    {!stillingenErIntern && (
                        <Knapp className="Ad__actions-button" onClick={onPreviewAdClick} mini>
                            Forhåndsvis stillingen
                        </Knapp>
                    )}
                    {stillingErPublisert(ad) && (
                        <KopierTekst
                            className=""
                            tooltipTekst="Kopier stillingslenke"
                            skalKopieres={stillingsLenke}
                        />
                    )}
                </div>
            </div>
            {stillingenErIntern ? (
                <div className="Ad__info">
                    <AlertStripe className="AdStatusPreview__Alertstripe" type="info" solid="true">
                        Dette er en eksternt utlyst stilling. Du kan <b>ikke</b> endre stillingen.
                    </AlertStripe>
                </div>
            ) : (
                <Column xs="1" md="12" className="blokk-s">
                    <AlertStripeInfo className="Edit__vil-bli-delt-advarsel">
                        <Element>
                            Stillingsannonsen kan bli delt med kandidater. Det er viktig at
                            annonseteksten er informativ og lett å forstå.
                        </Element>
                    </AlertStripeInfo>
                </Column>
            )}
            <Column xs="12" md="8">
                <div className="Edit__left">
                    <EditHeader isNew={isNew} onPreviewAdClick={onPreviewAdClick} />
                    <Employer />
                    <RegistrerInkluderingsmuligheter />
                    <JobDetails isNew={isNew} />
                </div>
            </Column>
            <Column xs="12" md="4">
                <PracticalInformation />
                <ContactPerson />
                <Application />
                <Location />
                <Ekspanderbartpanel
                    className="Edit__panel"
                    tittel={<Undertittel>Om annonsen</Undertittel>}
                    border
                    apen
                >
                    <Input
                        className="blokk-xs"
                        label="Sist endret"
                        value={
                            ad.updated !== ad.created
                                ? formatISOString(ad.updated, 'DD.MM.YYYY')
                                : ''
                        }
                        disabled
                    />
                    <Input
                        className="blokk-xs"
                        label="Hentet fra/kilde"
                        value={ad.medium || ''}
                        disabled
                    />
                    <Input
                        className="blokk-xs"
                        label="Annonsenummer"
                        value={ad.id || ''}
                        disabled
                    />
                </Ekspanderbartpanel>
            </Column>
        </div>
    );
};

Edit.defaultProps = {
    isNew: false,
};

Edit.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        updated: PropTypes.string,
        created: PropTypes.string,
        medium: PropTypes.string,
        uuid: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    hasChanges: PropTypes.bool,
    resetValidation: PropTypes.func.isRequired,
    isNew: PropTypes.bool,
    onPreviewAdClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    hasChanges: state.ad.hasChanges,
    updated: state.adData.updated,
    created: state.adData.created,
    nyStillingState: state.ad.nyStillingState,
});

const mapDispatchToProps = (dispatch) => ({
    resetValidation: () => dispatch({ type: RESET_VALIDATION_ERROR }),
    forkastNyStilling: () => dispatch({ type: FORKAST_NY_STILLING }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
