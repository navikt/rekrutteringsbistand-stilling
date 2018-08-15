import React from 'react';
import PropTypes from 'prop-types';
import {
    Innholdstittel, Element, Normaltekst,
    Systemtittel
} from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import ReactHtmlParser from 'react-html-parser';
import Application from './application/Application';
import Employer from './employer/Employer';
import Employment from './employment/Employment';
import Summary from './summary/Summary';
import markWords from './markWords';
import './Preview.less';
import Location from './location/Location';

export default function Preview({ stilling }) {
    return (
        <div className="AdText">
            <Row>
                <Column xs="12" md="8">
                    <Innholdstittel className="AdText__title">
                        {stilling.title}
                    </Innholdstittel>
                </Column>
            </Row>
            <Row>
                <Column xs="12" md="8">
                    <div className="AdText__body">
                        {ReactHtmlParser(markWords(stilling.properties.adtext))}
                    </div>
                    <div>
                        {stilling.properties.employerdescription && (
                            <div className="EmployerDetails__description">
                                <Systemtittel>Om arbeidsgiver</Systemtittel>
                                { ReactHtmlParser(markWords(stilling.properties.employerdescription)) }
                            </div>
                        )}
                    </div>
                </Column>
                <Column xs="12" md="4">
                    <div className="AdText__details">
                        {stilling.categoryList && stilling.categoryList.length > 0 && (
                            <div className="detail-section">
                                <Element className="detail-section__head">Arbeidsyrke</Element>
                                {stilling.categoryList.map((styrk) => (
                                    <Normaltekst key={styrk.code}>
                                        {styrk.code}: {styrk.name}
                                    </Normaltekst>
                                ))}
                            </div>
                        )}
                        <Location />
                        <Employer employer={stilling.employer} />
                        <Application
                            source={stilling.source}
                            properties={stilling.properties}
                        />
                        <Employment properties={stilling.properties} />
                        <Summary stilling={stilling} />
                    </div>
                </Column>
            </Row>

        </div>
    );
}

Preview.defaultProps = {
    adText: undefined,
    title: undefined
};

Preview.propTypes = {
    adText: PropTypes.string,
    title: PropTypes.string
};

