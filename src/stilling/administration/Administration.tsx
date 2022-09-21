import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import AdStatus from './adStatus/AdStatus';
import AdStatusEdit from './adStatus/AdStatusEdit';
import Notat from './notat/Notat';
import Privacy from './publishing/Privacy';
import Publishing from './publishing/Publishing';
import './Administration.less';

type Props = {
    kandidatlisteId: string;
};

const Administration: FunctionComponent<Props> = ({ kandidatlisteId }) => (
    <div className="Administration">
        <div className="Administration__flex">
            <div className="Administration__flex__top">
                <AdStatus />
            </div>
            <div className="Administration__flex__center">
                <div className="Tab__area Administration__elements">
                    <div className="Administration__panel">
                        <Undertittel className="Administration__panel__title">
                            Når skal stillingen vises?
                        </Undertittel>
                        <Publishing />
                    </div>
                    <div className="Administration__panel">
                        <Privacy />
                    </div>
                    <div className="Administration__panel">
                        <Notat placeholder="Legg inn notat" />
                    </div>
                </div>
            </div>
            <div className="Administration__flex__bottom">
                <AdminStatusPreview />
                <AdStatusEdit kandidatlisteId={kandidatlisteId} />
            </div>
        </div>
    </div>
);

export default Administration;
