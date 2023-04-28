import React from 'react';
import { Panel } from '@navikt/ds-react';

import { erDirektemeldtStilling } from '../adUtils';
import parse from 'html-react-parser';
import Application from './application/Application';
import ContactPerson from './contactPerson/ContactPerson';
import Employer from './employer/Employer';
import Employment from './employment/Employment';
import Summary from './summary/Summary';
import MulighetForÅInkludere from './mulighet-for-å-inkludere/MulighetForÅInkludere';
import Stilling from '../../Stilling';

import css from './Forhåndsvisning.module.css';
import './Forhåndsvisning.less';

type Props = {
    stilling: Stilling;
};

const Forhåndsvisning = ({ stilling }: Props) => {
    return (
        <div className={css.forhåndsvisning}>
            <div className={css.venstre}>
                <Panel as="article">{parse(stilling.properties.adtext || '')}</Panel>
                {erDirektemeldtStilling(stilling.source) && (
                    <MulighetForÅInkludere tags={stilling.properties.tags} />
                )}
            </div>
            <div className={css.høyre}>
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
            </div>
        </div>
    );
};

export default Forhåndsvisning;
