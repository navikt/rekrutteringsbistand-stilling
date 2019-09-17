import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import ReactHtmlParser from 'react-html-parser';
import Application from './application/Application';
import ContactPerson from './contactPerson/ContactPerson';
import Employer from './employer/Employer';
import Employment from './employment/Employment';
import Summary from './summary/Summary'; 

import './Preview.less';

export default function Preview({ ad }) {
    const hardrequirements = ad.properties.hardrequirements
        ? JSON.parse(ad.properties.hardrequirements) : undefined;
    const softrequirements = ad.properties.softrequirements
        ? JSON.parse(ad.properties.softrequirements) : undefined;
    const personalattributes = ad.properties.personalattributes
        ? JSON.parse(ad.properties.personalattributes) : undefined;
    return (
        <div className="AdText">
            <Row>
                <Column xs="12" md="8">
                    <article className="AdText__body">
                        {ad.properties.adtext && ReactHtmlParser(ad.properties.adtext)}
                    </article>
                    {hardrequirements && (
                        <div className="HardRequirements">
                            <div className="HardRequirements__label">
                                <Element>Krav (Kvalifikasjoner)</Element>
                            </div>
                            <div className="HardRequirements__points">
                                <ul>
                                    {hardrequirements.map((r) => (
                                        <li className="typo-normal" key={r.punkt}>{r.punkt}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {softrequirements && (
                        <div className="SoftRequirements">
                            <div className="SoftRequirements__label">
                                <Element>Ønsket kompetanse</Element>
                            </div>
                            <div className="SoftRequirements__points">
                                <ul>
                                    {softrequirements.map((r) => (
                                        <li className="typo-normal" key={r.punkt}>{r.punkt}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {personalattributes && (
                        <div className="PersonalAttributes">
                            <div className="PersonalAttributes__label">
                                <Element>Personlige egenskaper</Element>
                            </div>
                            <div className="PersonalAttributes__points">
                                <ul>
                                    {personalattributes.map((r) => (
                                        <li className="typo-normal" key={r.punkt}>{r.punkt}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </Column>
                <Column xs="12" md="4">
                    <div className="AdText__details">
                        <Application
                            source={ad.source}
                            properties={ad.properties}
                        />
                        <Employment
                            properties={ad.properties}
                            locationList={ad.locationList}
                        />
                        <ContactPerson contactList={ad.contactList} />
                        <Employer
                            businessName={ad.businessName}
                            properties={ad.properties}
                        />
                        <Summary ad={ad} />
                    </div>
                </Column>
            </Row>
        </div>
    );
}

