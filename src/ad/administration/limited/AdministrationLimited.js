import React from 'react';
import AdStatus from '../adStatus/AdStatus';
import AdStatusEdit from '../adStatus/AdStatusEdit';
import RegistrerInkluderingsmuligheter from '../../edit/registrer-inkluderingsmuligheter/EksternStilling';
import Notat from '../notat/Notat';
import '../Administration.less';

function AdministrationLimited() {
    function editFields() {
        return (
            <div className="Administration__elements">
                <RegistrerInkluderingsmuligheter />
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
