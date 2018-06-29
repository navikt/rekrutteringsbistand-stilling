import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import RichTextEditor from 'react-rte';
import './AdText.less';

const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
        { label: 'Fet', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Kursiv', style: 'ITALIC' }
    ],
    BLOCK_TYPE_BUTTONS: [
        { label: 'Punkt', style: 'unordered-list-item' }
    ]
};



export default function AdText({ title, adText }) {

    if (adText) {
        return (
            <Panel border className="detail-section">
                <Undertittel className="detail-section__head">Stillingsbeskrivelse</Undertittel>
                <Input
                    label={"Overskrift på annonsen *"}
                    defaultValue={title}/>
                <Input
                    label={"Stilling / yrke *"}
                    placeholder='Få konseptnavn og STYRK-08 fra ontologi'/>
                <Normaltekst>Annonsetekst *</Normaltekst>
                <RichTextEditor
                    toolbarConfig={toolbarConfig}
                    className="rich-text-editor"
                    value={RichTextEditor.createValueFromString(adText, 'html')}
                />
            </Panel>
        );
    }
    return null;
}

AdText.defaultProps = {
    adText: undefined
};

AdText.propTypes = {
    adText: PropTypes.string
};
