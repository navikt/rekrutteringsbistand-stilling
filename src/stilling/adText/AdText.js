import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler'
import './AdText.less';

export default function AdText({ title, adText }) {
    if (adText) {
        return (
            <Panel border className="detail-section">
                <Innholdstittel className="detail-section__head">
                    {title}
                </Innholdstittel>
                <section className="AdText blokk-s">
                    {ReactHtmlParser(adText)}
                </section>
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
