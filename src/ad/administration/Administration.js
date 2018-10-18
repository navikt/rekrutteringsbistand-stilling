import React from 'react';
import { Undertittel, Systemtittel } from 'nav-frontend-typografi';
import AdStatus from './adStatus/AdStatus';
import AdStatusEdit from './adStatus/AdStatusEdit';
import Publishing from './publishing/Publishing';
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import './Administration.less';

export default function Administration() {
    return (
        <div className="Administration">
            <div className="Administration__flex">
                <div className="Administration__flex__top">
                    <AdStatus />
                </div>
                <div className="Administration__flex__center">
                    <div className="Administration__header">
                        <Systemtittel className="blokk-xxs">Publisering av stilling</Systemtittel>
                    </div>
                    <div className="Administration__panel">
                        <Undertittel className="Administration__panel__title">Når skal stillingen vises?</Undertittel>
                        <Publishing />
                    </div>
                </div>
                <div className="Administration__flex__bottom">
                    <AdminStatusPreview />
                    <div className="Administration__buttons">
                        <AdStatusEdit />
                    </div>
                </div>
            </div>
        </div>
    );
}
