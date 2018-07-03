import React from 'react';
import PropTypes from 'prop-types';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import ReactHtmlParser from 'react-html-parser';
import './AdText.less';

export default function AdText({ title, adText }) {
    return (
        <Panel border className="AdText">
            <Innholdstittel className="AdText__title">
                {title}
            </Innholdstittel>
            <div className="AdText__body">
                {ReactHtmlParser(adText)}
            </div>
        </Panel>
    );
}

AdText.defaultProps = {
    adText: undefined,
    title: undefined
};

AdText.propTypes = {
    adText: PropTypes.string,
    title: PropTypes.string
};


