import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';

import { CHECK_TAG, UNCHECK_TAG } from '../../../adDataReducer';
import isJson from '../../practicalInformation/IsJson';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {
    hierarkiAvTagsForDirektemeldteStillinger,
    InkluderingsmulighetForDirektemeldtStilling,
} from '../../../tags/hierarkiAvTags';
import './RegistrerInkluderingsmuligheterInternStilling.less';
import Skjemalegend from '../../skjemaetikett/Skjemalegend';
import { visningsnavnForRegistrering } from '../../../tags/visningsnavnForTags';

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
}) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);
    const hentSubtagsForMulighet = (
        inkluderingsmulighet: InkluderingsmulighetForDirektemeldtStilling
    ) => hierarkiAvTagsForDirektemeldteStillinger[inkluderingsmulighet].subtags || [];

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
            <CheckboxGruppe className="blokk-xs">
                <Skjemalegend>Arbeidsgiver kan tilrettelegge for</Skjemalegend>
                {hentSubtagsForMulighet(
                    InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging
                ).map((subtag) => (
                    <Checkbox
                        key={subtag}
                        id={`tag.${subtag}-checkbox`}
                        label={visningsnavnForRegistrering[subtag]}
                        value={subtag}
                        checked={tagIsChecked(subtag)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
            <CheckboxGruppe className="blokk-xs">
                <Skjemalegend>Arbeidsgiver er åpen for kandidater som</Skjemalegend>
                {hentSubtagsForMulighet(
                    InkluderingsmulighetForDirektemeldtStilling.PrioriterteMålgrupper
                ).map((subtag) => (
                    <Checkbox
                        key={subtag}
                        id={`tag.${subtag}-checkbox`}
                        label={visningsnavnForRegistrering[subtag]}
                        value={subtag}
                        checked={tagIsChecked(subtag)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
            <CheckboxGruppe className="blokk-xs">
                <Skjemalegend>Arbeidsgiver kan tilrettelegge for</Skjemalegend>
                {hentSubtagsForMulighet(
                    InkluderingsmulighetForDirektemeldtStilling.TiltakEllerVirkemiddel
                ).map((subtag) => (
                    <Checkbox
                        key={subtag}
                        id={`tag.${subtag}-checkbox`}
                        label={visningsnavnForRegistrering[subtag]}
                        value={subtag}
                        checked={tagIsChecked(subtag)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
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
