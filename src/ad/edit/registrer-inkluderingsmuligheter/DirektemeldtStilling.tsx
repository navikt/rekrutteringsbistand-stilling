import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import { HjelpetekstForInkluderingsmulighet } from './HjelpetekstForInkluderingsmulighet';
import { Inkluderingsmulighet as AlleInkluderingsmuligheter } from '../../../ad/tags/hierarkiAvTags';
import { InkluderingsmulighetForDirektemeldtStilling, Tag } from '../../tags/hierarkiAvTags';
import { TOGGLE_KAN_IKKE_INKLUDERE } from '../../adReducer';
import Inkluderingsmulighet from './Inkluderingsmulighet';
import isJson from '../practicalInformation/IsJson';
import Skjemalegend from '../skjemaetikett/Skjemalegend';
import './DirektemeldtStilling.less';

type Props = {
    tags?: string;
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
    kanIkkeInkludere: boolean;
    toggleKanIkkeInkludere: (kanIkkeInkludere: boolean) => void;
    feilmelding?: string;
    source: string;
};

const DirektemeldtStilling: FunctionComponent<Props> = ({
    tags,
    checkTag,
    uncheckTag,
    kanIkkeInkludere,
    toggleKanIkkeInkludere,
    feilmelding,
}) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const onKanIkkeInkludereChange = (e: ChangeEvent<HTMLInputElement>) => {
        toggleKanIkkeInkludere(e.target.checked);
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
                        <Undertittel tag="span">Muligheter for å inkludere</Undertittel>
                        <Normaltekst tag="span"> (må fylles ut)</Normaltekst>
                    </Undertittel>
                    <Normaltekst>
                        Arbeidsgiver er åpen for å inkludere personer som har behov for
                        tilrettelegging og/eller har nedsatt funksjonsevne.
                    </Normaltekst>
                </>
            }
        >
            <div className="registrer-inkluderingsmuligheter-direktemeldt-stilling__inkluderingsmuligheter">
                <div>
                    <Inkluderingsmulighet
                        tittel="Arbeidsgiver kan tilrettelegge for"
                        inkluderingsmulighet={
                            InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging
                        }
                        hjelpetekst={
                            <HjelpetekstForInkluderingsmulighet
                                inkluderingsmulighet={AlleInkluderingsmuligheter.Tilrettelegging}
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
                            inkluderingsmulighet={AlleInkluderingsmuligheter.PrioriterteMålgrupper}
                        />
                    }
                    tagIsChecked={tagIsChecked}
                    onTagChange={onTagChange}
                    className="blokk-s"
                />
            </div>
            <CheckboxGruppe>
                <Skjemalegend>Ikke mulighet til å inkludere?</Skjemalegend>
                <Checkbox
                    checked={kanIkkeInkludere}
                    onChange={onKanIkkeInkludereChange}
                    label="Nei, arbeidsgiver kan ikke inkludere for denne stillingen"
                />
            </CheckboxGruppe>
            {feilmelding && <Feilmelding>{feilmelding}</Feilmelding>}
        </Ekspanderbartpanel>
    );
};

const mapStateToProps = (state: any) => ({
    tags: state.adData.properties.tags || '[]',
    kanIkkeInkludere: state.ad.kanIkkeInkludere,
    feilmelding: state.adValidation.errors.inkluderingsmuligheter,
    source: state.adData.source,
});

const mapDispatchToProps = (dispatch: any) => ({
    checkTag: (value: Tag) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value: Tag) => dispatch({ type: UNCHECK_TAG, value }),
    toggleKanIkkeInkludere: (kanIkkeInkludere: boolean) =>
        dispatch({ type: TOGGLE_KAN_IKKE_INKLUDERE, kanIkkeInkludere }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DirektemeldtStilling);
