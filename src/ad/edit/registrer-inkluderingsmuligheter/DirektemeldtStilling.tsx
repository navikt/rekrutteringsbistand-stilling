import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import { InkluderingsmulighetForDirektemeldtStilling, Tag } from '../../tags/hierarkiAvTags';
import isJson from '../practicalInformation/IsJson';
import Inkluderingsmulighet from './Inkluderingsmulighet';
import { Inkluderingsmulighet as AlleInkluderingsmuligheter } from '../../../ad/tags/hierarkiAvTags';
import { HjelpetekstForInkluderingsmulighet } from './HjelpetekstForInkluderingsmulighet';
import './DirektemeldtStilling.less';

type Props = {
    tags?: string;
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
    source: string;
};

const DirektemeldtStilling: FunctionComponent<Props> = ({ tags, checkTag, uncheckTag }) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);

    return (
        <Ekspanderbartpanel
            border
            apen
            className="registrer-inkluderingsmuligheter-direktemeldt-stilling blokk-s"
            tittel={
                <>
                    <Undertittel className="blokk-xxxs">Muligheter for å inkludere</Undertittel>
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
        </Ekspanderbartpanel>
    );
};

const mapStateToProps = (state: any) => ({
    tags: state.adData.properties.tags || '[]',
    source: state.adData.source,
});

const mapDispatchToProps = (dispatch: any) => ({
    checkTag: (value: Tag) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value: Tag) => dispatch({ type: UNCHECK_TAG, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DirektemeldtStilling);
