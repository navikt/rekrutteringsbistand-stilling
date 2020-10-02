import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Element, Undertittel } from 'nav-frontend-typografi';

import isJson from '../../practicalInformation/IsJson';
import { hentGrupperMedTags } from '../../../tags';
import { Checkbox, CheckboxGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import { CHECK_TAG, UNCHECK_TAG } from '../../../adDataReducer';
import Skjemalegend from '../../skjemaetikett/Skjemalegend';
import {
    hentSubtagsForMulighetForEksternStilling,
    InkluderingsmulighetForEksternStilling,
} from '../../../tags/hierarkiAvTags';
import './RegistrerInkluderingsmuligheterEksternStilling.less';
import { visningsnavnForRegistrering } from '../../../tags/visningsnavnForTags';
import Skjemalabel from '../../skjemaetikett/Skjemalabel';

type Props = {
    tags?: string;
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
};

const RegistrerInkluderingsmuligheterEksternStilling: FunctionComponent<Props> = ({
    tags,
    checkTag,
    uncheckTag,
}) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);

    return (
        <div className="registrer-inkluderingsmuligheter-ekstern-stilling">
            <Undertittel className="registrer-inkluderingsmuligheter-ekstern-stilling__tittel">
                Muligheter for inkludering
            </Undertittel>
            <CheckboxGruppe className="blokk-xs">
                <Skjemalegend>Arbeidsgiver ønsker å tilrettelegge</Skjemalegend>
                {hentSubtagsForMulighetForEksternStilling(
                    InkluderingsmulighetForEksternStilling.Tilrettelegging
                ).map((kategori) => (
                    <Checkbox
                        id={`tag.${kategori}-checkbox`}
                        label={visningsnavnForRegistrering[kategori]}
                        value={kategori}
                        key={kategori}
                        checked={tagIsChecked(kategori)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
            <CheckboxGruppe>
                <Skjemalegend>Arbeidsgiver er del av:</Skjemalegend>
                {hentSubtagsForMulighetForEksternStilling(
                    InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad
                ).map((tag) => (
                    <Checkbox
                        id={`tag.${tag}-checkbox`}
                        label={visningsnavnForRegistrering[tag]}
                        value={tag}
                        key={tag}
                        checked={tagIsChecked(tag)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
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
