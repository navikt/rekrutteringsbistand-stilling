import React from 'react';
import {Row} from 'nav-frontend-grid';
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import './Menu.less'
import {SearchBox} from "./SearchBox";

const MenuSearch = () => (
    <div className="Menu__search">
        <Row>
            <Systemtittel>Søk</Systemtittel>
            <Normaltekst>Finn riktig stilling/arbeidsgiver</Normaltekst>
        </Row>
        <Row>
            <SearchBox/>
        </Row>
    </div>
);

MenuSearch.propTypes = {};
export default MenuSearch;
