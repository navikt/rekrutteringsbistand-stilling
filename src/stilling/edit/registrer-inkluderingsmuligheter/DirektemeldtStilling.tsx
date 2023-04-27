import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { CHECK_TAG, SET_TAGS, UNCHECK_TAG } from '../../adDataReducer';
import { fjernAlleInkluderingstags } from '../../tags/utils';
import { HjelpetekstForInkluderingsmulighet } from './HjelpetekstForInkluderingsmulighet';
import { Inkluderingsmulighet as AlleInkluderingsmuligheter } from '../../tags/hierarkiAvTags';
import { InkluderingsmulighetForDirektemeldtStilling, Tag } from '../../tags/hierarkiAvTags';
import { SET_KAN_INKLUDERE } from '../../adReducer';
import Inkluderingsmulighet from './Inkluderingsmulighet';
import isJson from '../practicalInformation/IsJson';
import css from './DirektemeldtStilling.module.css';
import { Alert, BodyLong, BodyShort, Heading, Label, Radio, RadioGroup } from '@navikt/ds-react';

export enum KanInkludere {
    Ja = 'ja',
    Nei = 'nei',
}

const DirektemeldtStilling = () => {
    const dispatch = useDispatch();

    const tags = useSelector((state: any) => state.adData.properties.tags || '[]');
    const kanInkludere = useSelector((state: any) => state.ad.kanInkludere);
    const feilmelding = useSelector(
        (state: any) => state.adValidation.errors.inkluderingsmuligheter
    );

    const [registrerteTags, setRegistrerteTags] = useState<string | undefined>(undefined);

    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegistrerteTags(undefined);

        const { checked, value } = e.target;

        checked ? dispatch({ type: CHECK_TAG, value }) : dispatch({ type: UNCHECK_TAG, value });
    };

    const fjernInkluderingstags = () => {
        let utenInkluderingstags: Tag[] | undefined;

        if (isJson(tags)) {
            const parsedeTags: Tag[] = JSON.parse(tags === undefined ? '[]' : tags);
            utenInkluderingstags = fjernAlleInkluderingstags(parsedeTags);
        }
        const json = JSON.stringify(utenInkluderingstags);
        dispatch({ type: SET_TAGS, json });
    };

    const brukRegistrerteTags = () => {
        if (registrerteTags) {
            dispatch({ type: SET_TAGS, registrerteTags });
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

        dispatch({ type: SET_KAN_INKLUDERE, kanInkludere });
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);

    return (
        <Ekspanderbartpanel
            border
            apen
            className={css.inkluderingspanel}
            tittel={
                <>
                    <Heading level="3" size="small" spacing>
                        <span>Muligheter for å inkludere</span>
                        <BodyShort as="span" size="small">
                            {' '}
                            (må fylles ut)
                        </BodyShort>
                    </Heading>

                    <BodyLong size="small">
                        Arbeidsgiver er åpen for å inkludere personer som har behov for
                        tilrettelegging og/eller har nedsatt funksjonsevne.
                    </BodyLong>
                </>
            }
        >
            <RadioGroup
                error={feilmelding}
                legend={<Label size="small"> Kan arbeidsgiver inkludere?</Label>}
                className={css.radiogruppe}
                value={kanInkludere}
            >
                <Radio
                    name="muligheter-for-inkludering"
                    value={KanInkludere.Ja}
                    onChange={onKanInkludereChange}
                    size="small"
                >
                    Ja, arbeidsgiver kan inkludere
                </Radio>
                <Radio
                    name="muligheter-for-inkludering"
                    value={KanInkludere.Nei}
                    onChange={onKanInkludereChange}
                    size="small"
                >
                    Nei, arbeidsgiver kan ikke inkludere
                </Radio>
            </RadioGroup>
            {kanInkludere === KanInkludere.Ja && (
                <div>
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
                <Alert variant="warning">
                    <Label>Kan ikke arbeidsgiveren inkludere?</Label>
                    <BodyLong>
                        Hør om arbeidsgiveren kan tenke seg å registrere en annonse selv på
                        Arbeidsplassen.
                    </BodyLong>
                </Alert>
            )}
        </Ekspanderbartpanel>
    );
};

export default DirektemeldtStilling;
