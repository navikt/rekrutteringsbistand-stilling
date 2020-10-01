import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';

import { CHECK_TAG, UNCHECK_TAG } from '../../../adDataReducer';
import isJson from '../../practicalInformation/IsJson';
import { hentGrupperMedTags, GruppeMedTags } from '../../../tags';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { erDirektemeldtStilling } from '../../../adUtils';
import './RegistrerInkluderingsmuligheterInternStilling.less';

type Props = {
    tags?: string;
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
    source: string;
};

const RegistrerInkluderingsmuligheterInternStilling: FunctionComponent<Props> = ({
    tags,
    checkTag,
    uncheckTag,
    source,
}) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);
    const grupperMedTags = hentGrupperMedTags(erDirektemeldtStilling(source));

    return (
        <Ekspanderbartpanel
            border
            apen
            className="registrer-inkluderingsmuligheter-intern-stilling blokk-s"
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
            <SkjemaGruppe>
                {grupperMedTags.map((kategori: GruppeMedTags) => (
                    <Fragment key={kategori.tag}>
                        <Checkbox
                            id={`tag-${kategori.tag.toLowerCase()}-checkbox`}
                            label={kategori.navn}
                            value={kategori.tag}
                            checked={tagIsChecked(kategori.tag)}
                            onChange={onTagChange}
                        />
                        {kategori.harSubtags && tagIsChecked(kategori.tag) && (
                            <SkjemaGruppe className="registrer-inkluderingsmuligheter-intern-stilling__subtags">
                                {kategori.subtags.map((subtag) => (
                                    <Checkbox
                                        id={`tag.${subtag.tag}-checkbox`}
                                        label={subtag.navn}
                                        value={subtag.tag}
                                        key={subtag.tag}
                                        checked={tagIsChecked(subtag.tag)}
                                        onChange={onTagChange}
                                    />
                                ))}
                            </SkjemaGruppe>
                        )}
                    </Fragment>
                ))}
            </SkjemaGruppe>
        </Ekspanderbartpanel>
    );
};

const mapStateToProps = (state) => ({
    tags: state.adData.properties.tags || '[]',
    source: state.adData.source,
});

const mapDispatchToProps = (dispatch) => ({
    checkTag: (value: string) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value: string) => dispatch({ type: UNCHECK_TAG, value }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrerInkluderingsmuligheterInternStilling);
