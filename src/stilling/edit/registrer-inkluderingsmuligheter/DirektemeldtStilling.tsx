import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { CHECK_TAG, SET_TAGS, UNCHECK_TAG } from '../../adDataReducer';
import { fjernAlleInkluderingstags } from '../../tags/utils';
import { HjelpetekstForInkluderingsmulighet } from './HjelpetekstForInkluderingsmulighet';
import { Inkluderingsmulighet as AlleInkluderingsmuligheter } from '../../tags/hierarkiAvTags';
import { InkluderingsmulighetForDirektemeldtStilling, Tag } from '../../tags/hierarkiAvTags';
import { SET_KAN_INKLUDERE } from '../../adReducer';
import { State } from '../../../reduxStore';
import Inkluderingsmulighet from './Inkluderingsmulighet';
import isJson from '../practicalInformation/IsJson';
import Skjemalegend from '../skjemaetikett/Skjemalegend';
import './DirektemeldtStilling.less';

export enum KanInkludere {
    Ja = 'ja',
    Nei = 'nei',
}

type Props = {
    tags?: string;
    setTags: (tags: string) => void;
    checkTag: (tag: Tag) => void;
    uncheckTag: (tag: Tag) => void;
    kanInkludere: KanInkludere;
    setKanInkludere: (kanInkludere: KanInkludere) => void;
    feilmelding?: string;
    source: string;
};

const DirektemeldtStilling: FunctionComponent<Props> = ({
    tags,
    setTags,
    checkTag,
    uncheckTag,
    kanInkludere,
    setKanInkludere,
    feilmelding,
}) => {
    const [registrerteTags, setRegistrerteTags] = useState<string | undefined>(undefined);

    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegistrerteTags(undefined);

        const { checked, value } = e.target;
        checked ? checkTag(value as Tag) : uncheckTag(value as Tag);
    };

    const fjernInkluderingstags = () => {
        let utenInkluderingstags: Tag[] | undefined;

        if (isJson(tags)) {
            const parsedeTags: Tag[] = JSON.parse(tags === undefined ? '[]' : tags);
            utenInkluderingstags = fjernAlleInkluderingstags(parsedeTags);
        }

        setTags(JSON.stringify(utenInkluderingstags));
    };

    const brukRegistrerteTags = () => {
        if (registrerteTags) {
            setTags(registrerteTags);
        }
    };

    const onKanInkludereChange = (e: ChangeEvent<HTMLInputElement>) => {
        const kanInkludere = e.target.value as KanInkludere;

        if (kanInkludere === KanInkludere.Nei) {
            setRegistrerteTags(tags);
            fjernInkluderingstags();
        } else {
            brukRegistrerteTags();
        }

        setKanInkludere(kanInkludere);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);

    return (
        <Ekspanderbartpanel
            border
            apen
            className="registrer-inkluderingsmuligheter-direktemeldt-stilling blokk-s"
            tittel={
                <>
                    <Undertittel className="blokk-xxxs">
                        <Undertittel id="endre-stilling-muligheter-for-å-inkludere" tag="span">
                            Muligheter for å inkludere
                        </Undertittel>
                        <Normaltekst tag="span"> (må fylles ut)</Normaltekst>
                    </Undertittel>
                    <Normaltekst>
                        Arbeidsgiver er åpen for å inkludere personer som har behov for
                        tilrettelegging og/eller har nedsatt funksjonsevne.
                    </Normaltekst>
                </>
            }
        >
            <RadioGruppe
                className="registrer-inkluderingsmuligheter-direktemeldt-stilling__radiogruppe"
                feil={feilmelding}
            >
                <Skjemalegend>Kan arbeidsgiver inkludere?</Skjemalegend>
                <Radio
                    name="muligheter-for-inkludering"
                    label="Ja, arbeidsgiver kan inkludere"
                    value={KanInkludere.Ja}
                    checked={kanInkludere === KanInkludere.Ja}
                    onChange={onKanInkludereChange}
                />
                <Radio
                    name="muligheter-for-inkludering"
                    label="Nei, arbeidsgiver kan ikke inkludere"
                    value={KanInkludere.Nei}
                    checked={kanInkludere === KanInkludere.Nei}
                    onChange={onKanInkludereChange}
                />
            </RadioGruppe>
            {kanInkludere === KanInkludere.Ja && (
                <div className="registrer-inkluderingsmuligheter-direktemeldt-stilling__inkluderingsmuligheter">
                    <div>
                        <Inkluderingsmulighet
                            tittel="Arbeidsgiver kan tilrettelegge for"
                            tagIsChecked={tagIsChecked}
                            onTagChange={onTagChange}
                            inkluderingsmulighet={
                                InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging
                            }
                            hjelpetekst={
                                <HjelpetekstForInkluderingsmulighet
                                    inkluderingsmulighet={
                                        AlleInkluderingsmuligheter.Tilrettelegging
                                    }
                                />
                            }
                        />
                        <Inkluderingsmulighet
                            tittel="Arbeidsgiver er åpen for de som trenger"
                            tagIsChecked={tagIsChecked}
                            onTagChange={onTagChange}
                            inkluderingsmulighet={
                                InkluderingsmulighetForDirektemeldtStilling.TiltakEllerVirkemiddel
                            }
                            hjelpetekst={
                                <HjelpetekstForInkluderingsmulighet
                                    inkluderingsmulighet={
                                        AlleInkluderingsmuligheter.TiltakEllerVirkemiddel
                                    }
                                />
                            }
                        />
                    </div>
                    <div>
                        <Inkluderingsmulighet
                            tittel="Arbeidsgiver er åpen for kandidater som"
                            tagIsChecked={tagIsChecked}
                            onTagChange={onTagChange}
                            inkluderingsmulighet={
                                InkluderingsmulighetForDirektemeldtStilling.PrioriterteMålgrupper
                            }
                            hjelpetekst={
                                <HjelpetekstForInkluderingsmulighet
                                    inkluderingsmulighet={
                                        AlleInkluderingsmuligheter.PrioriterteMålgrupper
                                    }
                                />
                            }
                        />
                        <Inkluderingsmulighet
                            tittel="Arbeidsgiver er del av"
                            tagIsChecked={tagIsChecked}
                            onTagChange={onTagChange}
                            inkluderingsmulighet={
                                InkluderingsmulighetForDirektemeldtStilling.StatligInkluderingsdugnad
                            }
                            hjelpetekst={
                                <HjelpetekstForInkluderingsmulighet
                                    inkluderingsmulighet={
                                        AlleInkluderingsmuligheter.StatligInkluderingsdugnad
                                    }
                                />
                            }
                        />
                    </div>
                </div>
            )}
            {kanInkludere === KanInkludere.Nei && (
                <AlertStripeAdvarsel>
                    <Element>Kan ikke arbeidsgiveren inkludere?</Element>
                    <Normaltekst>
                        Hør om arbeidsgiveren kan tenke seg å registrere en annonse selv på
                        Arbeidsplassen.
                    </Normaltekst>
                </AlertStripeAdvarsel>
            )}
        </Ekspanderbartpanel>
    );
};

const mapStateToProps = (state: State) => ({
    tags: state.adData.properties.tags || '[]',
    kanInkludere: state.ad.kanInkludere,
    feilmelding: state.adValidation.errors.inkluderingsmuligheter,
    source: state.adData.source,
});

const mapDispatchToProps = (dispatch: any) => ({
    setTags: (tags: string) => dispatch({ type: SET_TAGS, tags }),
    checkTag: (value: Tag) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value: Tag) => dispatch({ type: UNCHECK_TAG, value }),
    setKanInkludere: (kanInkludere: KanInkludere) =>
        dispatch({ type: SET_KAN_INKLUDERE, kanInkludere }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DirektemeldtStilling);
