import React, { FunctionComponent } from 'react';

import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import AdStatus from './adStatus/AdStatus';
import AdStatusEdit from './adStatus/AdStatusEdit';
import Notat from './notat/Notat';
import Privacy from './publishing/Privacy';
import Publishing from './publishing/Publishing';
import css from './Administration.module.css';
import { Heading } from '@navikt/ds-react';

const Administration: FunctionComponent = () => (
    <div>
        <AdStatus />
        <div className={css.elements}>
            <div>
                <Heading level="2" size="xsmall" spacing>
                    Når skal stillingen vises?
                </Heading>
                <Publishing />
            </div>
            <div className={css.panel}>
                <Privacy />
            </div>
            <Notat placeholder="Legg inn notat" />
        </div>
        <div className={css.bottom}>
            <AdminStatusPreview />
            <AdStatusEdit />
        </div>
    </div>
);

export default Administration;
