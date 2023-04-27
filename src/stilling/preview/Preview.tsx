import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import parse from 'html-react-parser';
import Application from './application/Application';
import ContactPerson from './contactPerson/ContactPerson';
import Employer from './employer/Employer';
import Employment from './employment/Employment';
import Summary from './summary/Summary';
import VisInkluderingsmuligheterInternStilling from './vis-inkluderingsmuligheter-intern-stilling/VisInkluderingsmuligheterInternStilling';
import { erDirektemeldtStilling } from '../adUtils';

import Stilling from '../../Stilling';
import './Preview.less';

type Props = {
    stilling: Stilling;
};

const Preview = ({ stilling }: Props) => {
    const hardrequirements = stilling.properties.hardrequirements
        ? JSON.parse(stilling.properties.hardrequirements)
        : undefined;
    const softrequirements = stilling.properties.softrequirements
        ? JSON.parse(stilling.properties.softrequirements)
        : undefined;
    const personalattributes = stilling.properties.personalattributes
        ? JSON.parse(stilling.properties.personalattributes)
        : undefined;

    return (
        <Row>
            <Column xs="12" md="8">
                <article className="AdText__body">
                    {parse(stilling.properties.adtext || '')}
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
                {erDirektemeldtStilling(stilling.source) && (
                    <VisInkluderingsmuligheterInternStilling tags={stilling.properties.tags} />
                )}
            </Column>
            <Column xs="12" md="4">
                <div className="AdText__details">
                    <Application source={stilling.source} properties={stilling.properties} />
                    <Employment
                        properties={stilling.properties as any}
                        locationList={stilling.locationList}
                    />
                    <ContactPerson contactList={stilling.contactList} />
                    <Employer ad={stilling} />
                    <Summary ad={stilling} />
                </div>
            </Column>
        </Row>
    );
};

export default Preview;
