import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { CHECK_TAG, UNCHECK_TAG, SET_TAGS } from '../../adDataReducer';
import { fjernAlleInkluderingstags } from '../../tags/utils';
import { HjelpetekstForInkluderingsmulighet } from './HjelpetekstForInkluderingsmulighet';
import { Inkluderingsmulighet as AlleInkluderingsmuligheter } from '../../../ad/tags/hierarkiAvTags';
import { InkluderingsmulighetForDirektemeldtStilling, Tag } from '../../tags/hierarkiAvTags';
import { TOGGLE_KAN_IKKE_INKLUDERE } from '../../adReducer';
import Inkluderingsmulighet from './Inkluderingsmulighet';
import isJson from '../practicalInformation/IsJson';
import State from '../../../State';
import './DirektemeldtStilling.less';

enum KanInkludere {
    Ja = 'ja',
    Nei = 'nei',
}

type Props = {
    tags?: string;
    setTags: (tags: string) => void;
    checkTag: (tag: Tag) => void;
    uncheckTag: (tag: Tag) => void;
    kanIkkeInkludere: boolean;
    toggleKanIkkeInkludere: (kanIkkeInkludere: boolean) => void;
    feilmelding?: string;
    source: string;
};

const DirektemeldtStilling: FunctionComponent<Props> = ({
    tags,
    setTags,
    checkTag,
    uncheckTag,
    kanIkkeInkludere,
    toggleKanIkkeInkludere,
    feilmelding,
}) => {
    const [forrigeTags, setForrigeTags] = useState<string | undefined>(undefined);

    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForrigeTags(undefined);

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

    const onKanIkkeInkludereChange = (e: ChangeEvent<HTMLInputElement>) => {
        const kanIkkeInkludere = e.target.value === KanInkludere.Nei;

        if (kanIkkeInkludere) {
            setForrigeTags(tags);
            fjernInkluderingstags();
        } else if (forrigeTags) {
            setTags(forrigeTags);
        }

        toggleKanIkkeInkludere(kanIkkeInkludere);
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
                <Radio
                    name="muligheter-for-inkludering"
                    label="Arbeidsgiver kan inkludere"
                    value={KanInkludere.Ja}
                    checked={!kanIkkeInkludere}
                    onChange={onKanIkkeInkludereChange}
                />
                <Radio
                    name="muligheter-for-inkludering"
                    label="Arbeidsgiver kan ikke inkludere"
                    value={KanInkludere.Nei}
                    checked={kanIkkeInkludere}
                    onChange={onKanIkkeInkludereChange}
                />
            </RadioGruppe>
            {!kanIkkeInkludere && (
                <div className="registrer-inkluderingsmuligheter-direktemeldt-stilling__inkluderingsmuligheter">
                    <div>
                        <Inkluderingsmulighet
                            tittel="Arbeidsgiver kan tilrettelegge for"
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
                            tagIsChecked={tagIsChecked}
                            onTagChange={onTagChange}
                            className="blokk-m"
                        />
                        <Inkluderingsmulighet
                            tittel="Arbeidsgiver er åpen for de som trenger"
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
                            tagIsChecked={tagIsChecked}
                            onTagChange={onTagChange}
                            className="blokk-m"
                        />
                    </div>
                    <Inkluderingsmulighet
                        tittel="Arbeidsgiver er åpen for kandidater som"
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
                        tagIsChecked={tagIsChecked}
                        onTagChange={onTagChange}
                        className="blokk-s"
                    />
                </div>
            )}
        </Ekspanderbartpanel>
    );
};

const mapStateToProps = (state: State) => ({
    tags: state.adData.properties.tags || '[]',
    kanIkkeInkludere: state.ad.kanIkkeInkludere,
    feilmelding: state.adValidation.errors.inkluderingsmuligheter,
    source: state.adData.source,
});

const mapDispatchToProps = (dispatch: any) => ({
    setTags: (tags: string) => dispatch({ type: SET_TAGS, tags }),
    checkTag: (value: Tag) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value: Tag) => dispatch({ type: UNCHECK_TAG, value }),
    toggleKanIkkeInkludere: (kanIkkeInkludere: boolean) =>
        dispatch({ type: TOGGLE_KAN_IKKE_INKLUDERE, kanIkkeInkludere }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DirektemeldtStilling);
