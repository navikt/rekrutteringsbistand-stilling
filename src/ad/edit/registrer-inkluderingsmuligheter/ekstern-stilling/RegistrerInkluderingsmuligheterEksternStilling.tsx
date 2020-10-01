import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';
import isJson from '../../practicalInformation/IsJson';
import { hentGrupperMedTags } from '../../../tags';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { CHECK_TAG, UNCHECK_TAG } from '../../../adDataReducer';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import './RegistrerInkluderingsmuligheterEksternStilling.less';
import { erDirektemeldtStilling } from '../../../adUtils';

type Props = {
    tags?: string;
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
    source: string;
};

const RegistrerInkluderingsmuligheterEksternStilling: FunctionComponent<Props> = ({
    tags,
    checkTag,
    uncheckTag,
    source,
}) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);
    const hierarkiAvTags = hentGrupperMedTags(erDirektemeldtStilling(source));

    return (
        <div className="registrer-inkluderingsmuligheter-ekstern-stilling">
            <Undertittel className="registrer-inkluderingsmuligheter-ekstern-stilling__tittel">
                Inkludering
            </Undertittel>
            <SkjemaGruppe>
                {hierarkiAvTags.map((kategori) => (
                    <Fragment key={kategori.tag}>
                        <Checkbox
                            id={`tag-${kategori.tag.toLowerCase()}-checkbox`}
                            label={kategori.navn}
                            value={kategori.tag}
                            checked={tagIsChecked(kategori.tag)}
                            onChange={onTagChange}
                        />
                        {kategori.harSubtags && tagIsChecked(kategori.tag) && (
                            <SkjemaGruppe className="registrer-inkluderingsmuligheter-ekstern-stilling__subtags">
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
        </div>
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
)(RegistrerInkluderingsmuligheterEksternStilling);
