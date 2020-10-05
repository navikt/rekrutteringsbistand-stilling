import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';

import { CHECK_TAG_SOK, UNCHECK_TAG_SOK } from '../../searchReducer';
import { sendEvent } from '../../../amplitude';
import {
    AlleInkluderingsmuligheter,
    hentSubtagsForMulighetForFilter,
    hierarkiAvTagsForFilter,
    Tag,
} from '../../../ad/tags/hierarkiAvTags';
import Skjemalegend from '../../../ad/edit/skjemaetikett/Skjemalegend';
import { visningsnavnForFilter } from '../../../ad/tags/visningsnavnForTags';
import './Inkluderingsfilter.less';

type Props = {
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
    tags: Tag[];
};

const loggFiltreringPåInkluderingstags = (tags: Tag[]) => {
    sendEvent('stillingssøk', 'filtrer_på_inkluderingstags', {
        tags,
    });
};

const InkluderingPanel: FunctionComponent<Props> = ({ tags = [], checkTag, uncheckTag }) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            loggFiltreringPåInkluderingstags([...tags, e.target.value as Tag]);
        }

        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: Tag) => tags.includes(tag);

    const filterForTilretteleggingmuligheter = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.Tilrettelegging
    );
    const tilretteleggingHovedtag = hierarkiAvTagsForFilter[
        AlleInkluderingsmuligheter.Tilrettelegging
    ].hovedtag!;

    const filterForVirkemidler = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.TiltakEllerVirkemiddel
    );

    const prioriterteMålgrupperHovedtag = hierarkiAvTagsForFilter[
        AlleInkluderingsmuligheter.PrioriterteMålgrupper
    ].hovedtag!;

    const filterForPrioriterteMålgrupper = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.PrioriterteMålgrupper
    );
    const filterForStatligInkludering = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.StatligInkluderingsdugnad
    );

    return (
        <div className="inkluderingsfilter">
            <CheckboxGruppe>
                <Skjemalegend>Muligheter for tilrettelegging</Skjemalegend>
                <Checkbox
                    id={`tag-${tilretteleggingHovedtag.toLowerCase()}-checkbox`}
                    label={visningsnavnForFilter[tilretteleggingHovedtag]}
                    value={tilretteleggingHovedtag}
                    checked={tagIsChecked(tilretteleggingHovedtag)}
                    onChange={onTagChange}
                />
                {filterForTilretteleggingmuligheter.map((mulighet) => (
                    <Checkbox
                        className="inkluderingsfilter__subtag"
                        id={`tag-${mulighet}-checkbox`}
                        key={mulighet}
                        label={visningsnavnForFilter[mulighet]}
                        value={mulighet}
                        checked={tagIsChecked(mulighet)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
            <CheckboxGruppe>
                <Skjemalegend>Muligheter for bruk av virkemidler</Skjemalegend>
                {filterForVirkemidler.map((virkemiddel) => (
                    <Checkbox
                        id={`tag-${virkemiddel}-checkbox`}
                        key={virkemiddel}
                        label={visningsnavnForFilter[virkemiddel]}
                        value={virkemiddel}
                        checked={tagIsChecked(virkemiddel)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
            <CheckboxGruppe>
                <Skjemalegend>Muligheter for prioriterte målgrupper</Skjemalegend>
                <Checkbox
                    id={`tag-${prioriterteMålgrupperHovedtag.toLowerCase()}-checkbox`}
                    label={visningsnavnForFilter[prioriterteMålgrupperHovedtag]}
                    value={prioriterteMålgrupperHovedtag}
                    checked={tagIsChecked(prioriterteMålgrupperHovedtag)}
                    onChange={onTagChange}
                />
                {filterForPrioriterteMålgrupper.map((målgruppe) => (
                    <Checkbox
                        className="inkluderingsfilter__subtag"
                        id={`tag-${målgruppe}-checkbox`}
                        key={målgruppe}
                        label={visningsnavnForFilter[målgruppe]}
                        value={målgruppe}
                        checked={tagIsChecked(målgruppe)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
            <CheckboxGruppe>
                <Skjemalegend>Arbeidsgiver er en del av</Skjemalegend>
                {filterForStatligInkludering.map((tag) => (
                    <Checkbox
                        id={`tag-${tag}-checkbox`}
                        key={tag}
                        label={visningsnavnForFilter[tag]}
                        value={tag}
                        checked={tagIsChecked(tag)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tags: state.search.tags,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    checkTag: (tag: Tag) => dispatch({ type: CHECK_TAG_SOK, value: tag }),
    uncheckTag: (tag: Tag) => dispatch({ type: UNCHECK_TAG_SOK, value: tag }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
