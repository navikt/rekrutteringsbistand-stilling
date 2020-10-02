import React, { ChangeEvent, Fragment, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { CHECK_TAG_SOK, UNCHECK_TAG_SOK } from '../../searchReducer';
import { hentGrupperMedTags } from '../../../ad/tags';
import { Checkbox, CheckboxGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import { sendEvent } from '../../../amplitude';
import {
    AlleInkluderingsmuligheter,
    hentSubtagsForMulighetForFilter,
    hierarkiAvTagsForFilter,
    InkluderingsmulighetForEksternStilling,
} from '../../../ad/tags/hierarkiAvTags';
import Skjemalegend from '../../../ad/edit/skjemaetikett/Skjemalegend';
import { visningsnavnForFilter } from '../../../ad/tags/visningsnavnForTags';

type Props = {
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
    tags: string[];
};

const loggFiltreringPåInkluderingstags = (tags) => {
    sendEvent('stillingssøk', 'filtrer_på_inkluderingstags', {
        tags,
    });
};

const InkluderingPanel: FunctionComponent<Props> = ({ tags = [], checkTag, uncheckTag }) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            loggFiltreringPåInkluderingstags([...tags, e.target.value]);
        }

        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag) => tags.includes(tag);
    const kategorierMedNavn = hentGrupperMedTags();

    const filterForTilretteleggingmuligheter = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.Tilrettelegging
    );
    const tilretteleggingHovedtag = hierarkiAvTagsForFilter[
        AlleInkluderingsmuligheter.Tilrettelegging
    ].hovedtag!;

    const filterForVirkemidler = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.TiltakEllerVirkemiddel
    );
    const filterForPrioriterteMålgrupper = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.PrioriterteMålgrupper
    );
    const filterForStatligInkludering = hentSubtagsForMulighetForFilter(
        AlleInkluderingsmuligheter.StatligInkluderingsdugnad
    );

    return (
        <>
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
                        className="InkluderingPanel_subtag"
                        id={`tag-${mulighet}-checkbox`}
                        key={mulighet}
                        label={visningsnavnForFilter[mulighet]}
                        value={mulighet}
                        checked={tagIsChecked(mulighet)}
                        onChange={onTagChange}
                    />
                ))}
            </CheckboxGruppe>
            {/*{kategorierMedNavn.map(({ tag, navn, harSubtags, underkategorier }) => (*/}
            {/*    <Fragment key={tag}>*/}
            {/*        <Checkbox*/}
            {/*            className="checkbox--tag--sok skjemaelement--pink"*/}
            {/*            id={`tag-${tag.toLowerCase()}-checkbox`}*/}
            {/*            label={navn}*/}
            {/*            key={tag}*/}
            {/*            value={tag}*/}
            {/*            checked={tagIsChecked(tag)}*/}
            {/*            onChange={onTagChange}*/}
            {/*        />*/}
            {/*        {harSubtags && tagIsChecked(tag) && (*/}
            {/*            <SkjemaGruppe legend={navn} className="SearchPage__subtags">*/}
            {/*                {underkategorier.map(({ tag, navn }) => (*/}
            {/*                    <Checkbox*/}
            {/*                        className="checkbox--tag--sok skjemaelement--pink"*/}
            {/*                        id={`tag-${tag.toLowerCase()}-checkbox`}*/}
            {/*                        label={navn}*/}
            {/*                        key={tag}*/}
            {/*                        value={tag}*/}
            {/*                        checked={tagIsChecked(tag)}*/}
            {/*                        onChange={onTagChange}*/}
            {/*                    />*/}
            {/*                ))}*/}
            {/*            </SkjemaGruppe>*/}
            {/*        )}*/}
            {/*    </Fragment>*/}
            {/*))}*/}
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        tags: state.search.tags,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    checkTag: (value) => dispatch({ type: CHECK_TAG_SOK, value }),
    uncheckTag: (value) => dispatch({ type: UNCHECK_TAG_SOK, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
