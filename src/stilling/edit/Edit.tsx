import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Accordion, Alert, Button } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';
import { NewspaperIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';

import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import { Nettressurs } from '../../api/Nettressurs';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import { State } from '../../redux/store';
import Application from './application/Application';
import ContactPerson from './contactPerson/ContactPerson';
import EditHeader from './header/EditHeader';
import EksternStillingAdvarsel from '../forhåndsvisning/header/EksternStillingAdvarsel';
import EndreArbeidsgiver from './endre-arbeidsgiver/EndreArbeidsgiver';
import OmStillingen from './om-stillingen/OmStillingen';
import Location from './location/Location';
import PracticalInformation from './practicalInformation/PracticalInformation';
import RegistrerInkluderingsmuligheter from './registrer-inkluderingsmuligheter/DirektemeldtStilling';
import Stilling, { System } from '../../Stilling';
import Stillingsheader from '../header/Stillingsheader';
import Seksjon from './seksjon/Seksjon';
import OmAnnonsen from './om-annonsen/OmAnnonsen';

import css from './Edit.module.css';
import './Edit.less';

type Props = {
    onPreviewAdClick: () => void;
    kandidatliste: Nettressurs<Kandidatliste>;

    resetValidation: () => void;
    stilling: Stilling;
    hasChanges: boolean;
};

const Edit = ({ stilling, onPreviewAdClick, resetValidation, kandidatliste }: Props) => {
    const stillingenErEkstern = stilling.createdBy !== System.Rekrutteringsbistand;
    const stillingsLenke = hentAnnonselenke(stilling.uuid);

    useEffect(() => {
        return () => {
            resetValidation();
        };
    }, [resetValidation]);

    return (
        <>
            <Stillingsheader kandidatliste={kandidatliste}>
                {!stillingenErEkstern && (
                    <Button onClick={onPreviewAdClick} size="small" icon={<NewspaperIcon />}>
                        Forhåndsvis stillingen
                    </Button>
                )}
                {stillingErPublisert(stilling) && (
                    <CopyToClipboard
                        copyText={stillingsLenke}
                        popoverText="Kopierte annonselenken til clipboard"
                        variant={'secondary' as 'tertiary'}
                        size="small"
                    >
                        Kopier annonselenke
                    </CopyToClipboard>
                )}
            </Stillingsheader>
            {stillingenErEkstern ? (
                <EksternStillingAdvarsel />
            ) : (
                <Alert className={css.alert} variant="info">
                    Stillingsannonsen kan bli delt med kandidater. Det er viktig at annonseteksten
                    er informativ og lett å forstå.
                </Alert>
            )}
            <div className={css.edit}>
                <Accordion className={classNames(css.venstre, css.accordions)}>
                    <Seksjon tittel="Tittel på annonsen">
                        <EditHeader stilling={stilling} />
                    </Seksjon>
                    <Seksjon tittel="Om bedriften">
                        <EndreArbeidsgiver stilling={stilling} />
                    </Seksjon>
                    <Seksjon
                        påkrevd
                        tittel="Muligheter for å inkludere"
                        beskrivelse="Arbeidsgiver er åpen for å inkludere personer som har behov for tilrettelegging og/eller har nedsatt funksjonsevne."
                    >
                        <RegistrerInkluderingsmuligheter />
                    </Seksjon>
                    <Seksjon tittel="Om stillingen">
                        <OmStillingen stilling={stilling} />
                    </Seksjon>
                </Accordion>
                <Accordion className={classNames(css.høyre, css.accordions)}>
                    <Seksjon tittel="Praktiske opplysninger">
                        <PracticalInformation />
                    </Seksjon>
                    <Seksjon tittel="Kontaktinformasjon">
                        <ContactPerson />
                    </Seksjon>
                    <Seksjon
                        tittel="Hvordan sende søknad?"
                        beskrivelse="Gjelder kun eksternt utlyste stillinger"
                    >
                        <Application />
                    </Seksjon>
                    <Seksjon påkrevd tittel="Arbeidssted">
                        <Location />
                    </Seksjon>
                    <Seksjon tittel="Om annonsen">
                        <OmAnnonsen stilling={stilling} />
                    </Seksjon>
                </Accordion>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    resetValidation: () => dispatch({ type: RESET_VALIDATION_ERROR }),
});

const mapStateToProps = (state: State) => ({
    stilling: state.adData,
    hasChanges: state.ad.hasChanges,
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
