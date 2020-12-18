import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import ReactHtmlParser from 'react-html-parser';
import Application from './application/Application';
import ContactPerson from './contactPerson/ContactPerson';
import Employer from './employer/Employer';
import Employment from './employment/Employment';
import Summary from './summary/Summary';

import './Preview.less';
import VisInkluderingsmuligheterInternStilling from './vis-inkluderingsmuligheter-intern-stilling/VisInkluderingsmuligheterInternStilling';
import { erDirektemeldtStilling } from '../adUtils';
import Stilling from '../Stilling';

type Props = {
    stilling: Stilling;
};

const Preview: FunctionComponent<Props> = ({ stilling }) => {
    const { properties, employer, source, locationList, contactList, businessName } = stilling;

    const hardrequirements = properties.hardrequirements
        ? JSON.parse(properties.hardrequirements)
        : undefined;
    const softrequirements = properties.softrequirements
        ? JSON.parse(properties.softrequirements)
        : undefined;
    const personalattributes = properties.personalattributes
        ? JSON.parse(properties.personalattributes)
        : undefined;

    return (
        <div className="AdText">
            <Row>
                <Column xs="12" md="8">
                    <article className="AdText__body">
                        {properties.adtext && ReactHtmlParser(properties.adtext)}
                    </article>
                    {hardrequirements && (
                        <div className="HardRequirements">
                            <div className="HardRequirements__label">
                                <Element>Krav (Kvalifikasjoner)</Element>
                            </div>
                            <div className="HardRequirements__points">
                                <ul>
                                    {hardrequirements.map((r) => (
                                        <li className="typo-normal" key={r.punkt}>
                                            {r.punkt}
                                        </li>
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
                                        <li className="typo-normal" key={r.punkt}>
                                            {r.punkt}
                                        </li>
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
                                        <li className="typo-normal" key={r.punkt}>
                                            {r.punkt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {erDirektemeldtStilling(source) && (
                        <VisInkluderingsmuligheterInternStilling tags={properties.tags} />
                    )}
                </Column>
                <Column xs="12" md="4">
                    <div className="AdText__details">
                        <Application source={source} properties={properties} />
                        <Employment properties={properties} locationList={locationList} />
                        <ContactPerson contactList={contactList} />
                        <Employer
                            employer={employer}
                            businessName={businessName}
                            properties={properties}
                        />
                        <Summary ad={stilling} />
                    </div>
                </Column>
            </Row>
        </div>
    );
};

export default Preview;
