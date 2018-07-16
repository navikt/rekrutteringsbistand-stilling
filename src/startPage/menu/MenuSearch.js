import React from 'react';
import { Row } from 'nav-frontend-grid';
import { Systemtittel } from 'nav-frontend-typografi';
import './Menu.less';
import SearchBox from '../../common/searchBox/SearchBox';

const MenuSearch = (props) => (
    <div className="Menu__search">
        <Row>
            <Systemtittel>Søk</Systemtittel>
        </Row>
        <Row>
            <SearchBox
                label="Finn riktig stilling/arbeidsgiver"
                placeholder="Søke etter stilling eller arbeidsgiver"
                onSearchClick={props.onSearchClick}
            />
        </Row>
    </div>
);

MenuSearch.propTypes = {};
export default MenuSearch;
