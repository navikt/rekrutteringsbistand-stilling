import React, { ChangeEvent, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';

import isJson from '../practicalInformation/IsJson';
import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import { InkluderingsmulighetForEksternStilling } from '../../tags/hierarkiAvTags';
import Inkluderingsmulighet from './Inkluderingsmulighet';
import './EksternStilling.less';

type Props = {
    tags?: string;
    checkTag: (tag: string) => void;
    uncheckTag: (tag: string) => void;
};

const EksternStilling: FunctionComponent<Props> = ({ tags, checkTag, uncheckTag }) => {
    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);

    return (
        <div className="registrer-inkluderingsmuligheter-ekstern-stilling">
            <Undertittel className="registrer-inkluderingsmuligheter-ekstern-stilling__tittel">
                Muligheter for inkludering
            </Undertittel>
            <Inkluderingsmulighet
                eksternStilling
                tittel="Arbeidsgiver ønsker å tilrettelegge"
                onTagChange={onTagChange}
                inkluderingsmulighet={InkluderingsmulighetForEksternStilling.Tilrettelegging}
                tagIsChecked={tagIsChecked}
            />
            <Inkluderingsmulighet
                eksternStilling
                tittel="Arbeidsgiver er en del av:"
                onTagChange={onTagChange}
                inkluderingsmulighet={
                    InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad
                }
                tagIsChecked={tagIsChecked}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(EksternStilling);
