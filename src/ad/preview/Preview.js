import React from 'react';
import PropTypes from 'prop-types';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import ReactHtmlParser from 'react-html-parser';
import Application from './application/Application';
import Employer from './employer/Employer';
import Employment from './employment/Employment';
import Summary from './summary/Summary';
import { htmlParserOptions } from './markWords';
import './Preview.less';

export default function Preview({ ad }) {
    return (
        <div className="AdText">
            <Row>
                <Column xs="12" md="8">
                    <Innholdstittel className="AdText__title">
                        {ad.title}
                    </Innholdstittel>
                </Column>
            </Row>
            <Row>
                <Column xs="12" md="8">
                    <div className="AdText__body">
                        {ad.properties.adtext && ReactHtmlParser(ad.properties.adtext, htmlParserOptions)}
                    </div>
                </Column>
                <Column xs="12" md="4">
                    <div className="AdText__details">
                        <Application
                            source={ad.source}
                            properties={ad.properties}
                        />
                        <Employment properties={ad.properties} />
                        <Employer
                            employer={ad.employer}
                            properties={ad.properties}
                        />
                        <Summary ad={ad} />
                    </div>
                </Column>
            </Row>
        </div>
    );
}

