import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { CHECK_TAG_SOK, UNCHECK_TAG_SOK } from '../../searchReducer';
import { sendEvent } from '../../../amplitude';
import { Inkluderingsmulighet, Tag } from '../../../ad/tags/hierarkiAvTags';
import FilterForMulighet from './FilterForMulighet';
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
    const tagIsChecked = (tag: Tag) => tags.includes(tag);

    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            loggFiltreringPåInkluderingstags([...tags, e.target.value as Tag]);
        }

        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    return (
        <div className="inkluderingsfilter">
            <FilterForMulighet
                visHovedtag
                tittel="Muligheter for tilrettelegging"
                inkluderingsmulighet={Inkluderingsmulighet.Tilrettelegging}
                onTagChange={onTagChange}
                tagIsChecked={tagIsChecked}
            />
            <FilterForMulighet
                visHovedtag
                tittel="Muligheter for bruk av virkemidler"
                inkluderingsmulighet={Inkluderingsmulighet.TiltakEllerVirkemiddel}
                onTagChange={onTagChange}
                tagIsChecked={tagIsChecked}
            />
            <FilterForMulighet
                visHovedtag
                tittel="Muligheter for prioriterte målgrupper"
                inkluderingsmulighet={Inkluderingsmulighet.PrioriterteMålgrupper}
                onTagChange={onTagChange}
                tagIsChecked={tagIsChecked}
            />
            <FilterForMulighet
                tittel="Arbeidsgiver er en del av"
                inkluderingsmulighet={Inkluderingsmulighet.StatligInkluderingsdugnad}
                onTagChange={onTagChange}
                tagIsChecked={tagIsChecked}
            />
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
