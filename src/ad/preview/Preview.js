import React from 'react';
import PropTypes from 'prop-types';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import ReactHtmlParser from 'react-html-parser';
import Application from './application/Application';
import Employer from './employer/Employer';
import Employment from './employment/Employment';
import Summary from './summary/Summary';
import './Preview.less';


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
                        {ReactHtmlParser(stilling.properties.adtext)}
                    </div>
                </Column>
                <Column xs="12" md="4">
                    <div className="AdText__details">
                        <Application
                            source={stilling.source}
                            properties={stilling.properties}
                        />
                        <Employment properties={stilling.properties} />
                        <Employer properties={stilling.properties} />
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


