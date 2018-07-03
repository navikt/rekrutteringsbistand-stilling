import React from 'react';
import PropTypes from 'prop-types';
import { Systemtittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import ReactHtmlParser from 'react-html-parser';

export default function AdText({ title, adText }) {
    return (
        <Panel border>
            <Systemtittel className="blokk-m">{title}</Systemtittel>
            <div>
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


