import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Accordion, Button } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';
import { NewspaperIcon } from '@navikt/aksel-icons';

import { Column } from 'nav-frontend-grid';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PropTypes from 'prop-types';

import { formatISOString } from '../../utils/datoUtils.ts';
import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import Application from './application/Application';
import ContactPerson from './contactPerson/ContactPerson.tsx';
import EditHeader from './header/EditHeader';
import EndreArbeidsgiver from './endre-arbeidsgiver/EndreArbeidsgiver';
import JobDetails from './jobDetails/JobDetails';
import Location from './location/Location';
import PracticalInformation from './practicalInformation/PracticalInformation';
import RegistrerInkluderingsmuligheter from './registrer-inkluderingsmuligheter/DirektemeldtStilling';
import Stillingsheader from '../header/Stillingsheader.tsx';
import './Edit.less';
import css from './Edit.module.css';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import EksternStillingAdvarsel from '../preview/header/EksternStillingAdvarsel.tsx';
import './Edit.less';

const Edit = ({ ad, isNew, onPreviewAdClick, resetValidation, kandidatliste }) => {
    // Fra EditHeader
    const stillingenErEkstern = ad.createdBy !== 'pam-rekrutteringsbistand';
    const stillingsLenke = hentAnnonselenke(ad.uuid);

    useEffect(() => {
        return () => {
            resetValidation();
        };
    }, [resetValidation]);

    return (
        <div className="Edit">
            <Stillingsheader kandidatliste={kandidatliste}>
                {!stillingenErEkstern && (
                    <Button onClick={onPreviewAdClick} size="small" icon={<NewspaperIcon />}>
                        Forhåndsvis stillingen
                    </Button>
                )}
                {stillingErPublisert(ad) && (
                    <CopyToClipboard
                        copyText={stillingsLenke}
                        popoverText="Kopierte annonselenken til clipboard"
                        variant="secondary"
                        size="small"
                    >
                        Kopier annonselenke
                    </CopyToClipboard>
                )}
            </Stillingsheader>
            {stillingenErEkstern ? (
                <EksternStillingAdvarsel />
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
                    <Accordion className={css.editAccordion}>
                        <Accordion.Item defaultOpen className={css.accordionWhite}>
                            <EditHeader isNew={isNew} onPreviewAdClick={onPreviewAdClick} />
                        </Accordion.Item>
                        <Accordion.Item defaultOpen className={css.accordionWhite}>
                            <EndreArbeidsgiver stilling={ad} />
                        </Accordion.Item>
                        <Accordion.Item
                            defaultOpen
                            className={css.accordionRekrutteringsbistandblue}
                        >
                            <RegistrerInkluderingsmuligheter />
                        </Accordion.Item>
                        <Accordion.Item defaultOpen className={css.accordionWhite}>
                            <JobDetails isNew={isNew} />
                        </Accordion.Item>
                    </Accordion>
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
    kandidatliste: PropTypes.object.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
