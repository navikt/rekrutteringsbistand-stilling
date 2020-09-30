import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import AdStatus from '../adStatus/AdStatus';
import AdStatusEdit from '../adStatus/AdStatusEdit';
import Notat from '../notat/Notat';
import '../Administration.less';

function AdministrationLimited() {
    function editFields() {
        return (
            <div className="Administration__elements">
                <div className="Administration__panel Inkluderingpanel">
                    <Undertittel className="Administration__panel__title">Inkludering</Undertittel>
                    <RegistrerInkluderingsmuligheterEksternStilling />
                    {/*    TODO: Hva er dette? */}
                </div>
                <div className="Administration__panel">
                    <Notat placeholder="Legg inn notat" />
                </div>
            </div>
        );
    }

    return (
        <div className="Administration">
            <div className="Administration__flex">
                <div className="Administration__flex__top">
                    <AdStatus />
                </div>
                <div className="Administration__flex__center">{editFields()}</div>
                <div className="Administration__flex__bottom">
                    <AdStatusEdit />
                </div>
            </div>
        </div>
    );
}

export default AdministrationLimited;
