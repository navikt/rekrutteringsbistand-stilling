import React from 'react';
import PropTypes from 'prop-types';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import ReactHtmlParser from 'react-html-parser';
import Application from './application/Application';
import EmployerDetails from './employerDetails/EmployerDetails';
import EmploymentDetails from './employmentDetails/EmploymentDetails';
import AdDetails from './adDetails/AdDetails';
import './AdText.less';


export default function AdText({ stilling }) {
    return (
        <Panel border className="AdText">
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
                        <EmploymentDetails properties={stilling.properties} />
                        <EmployerDetails properties={stilling.properties} />
                        <AdDetails stilling={stilling} />
                    </div>
                </Column>
            </Row>

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


