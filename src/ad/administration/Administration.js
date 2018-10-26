import React from 'react';
import { Undertittel, Systemtittel } from 'nav-frontend-typografi';
import AdStatus from './adStatus/AdStatus';
import AdStatusEdit from './adStatus/AdStatusEdit';
import Publishing from './publishing/Publishing';
import Privacy from './publishing/Privacy';
import AdminStatusPreview from './adminStatus/AdminStatusPreview';
import Comment from './comment/Comment';
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
                    <div className="Administration__panel">
                        <Privacy />
                    </div>
                    <div className="Administration__panel Comment blokk-l">
                        <Comment label="Kommentar" placeholder="Legg inn en kommentar" />
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
