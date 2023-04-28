import React from 'react';
import { Panel } from '@navikt/ds-react';

import { erDirektemeldtStilling } from '../adUtils';
import parse from 'html-react-parser';
import Søknad from './søknad/Søknad';
import Kontaktperson from './kontaktperson/Kontaktperson';
import Employer from './employer/Employer';
import OmStillingen from './om-stillingen/OmStillingen';
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
                <Søknad kilde={stilling.source} properties={stilling.properties} />
                <OmStillingen
                    properties={stilling.properties}
                    locationList={stilling.locationList}
                />
                <Kontaktperson contactList={stilling.contactList} />
                <Employer ad={stilling} />
                <Summary ad={stilling} />
            </div>
        </div>
    );
};

export default Forhåndsvisning;
