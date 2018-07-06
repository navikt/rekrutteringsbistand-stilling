import React from 'react';
import {Row} from 'nav-frontend-grid';
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import './Menu.less'

const MenuStatistics = () => (
    <div className="menu-statistics">
        <Row>
            <Systemtittel>Statistikk</Systemtittel>
        </Row>
        <Row>
            <Normaltekst>Dette skal være statistikk</Normaltekst>
        </Row>
    </div>
);
export default MenuStatistics;
