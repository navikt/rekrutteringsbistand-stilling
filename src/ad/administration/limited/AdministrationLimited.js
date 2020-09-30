import React from 'react';
import AdStatus from '../adStatus/AdStatus';
import AdStatusEdit from '../adStatus/AdStatusEdit';
import Notat from '../notat/Notat';
import '../Administration.less';
import RegistrerInkluderingsmuligheterEksternStilling from '../../edit/registrer-inkluderingsmuligheter/ekstern-stilling/RegistrerInkluderingsmuligheterEksternStilling';

function AdministrationLimited() {
    function editFields() {
        return (
            <div className="Administration__elements">
                <RegistrerInkluderingsmuligheterEksternStilling />
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
