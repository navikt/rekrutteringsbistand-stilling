import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'nav-frontend-grid';
import { Systemtittel } from 'nav-frontend-typografi';
import './Menu.less';
import SearchBox from '../../common/searchBox/SearchBox';

const MenuSearch = (props) => (
    <div className="Menu__search">
        <Row>
            <Systemtittel className="blokk-xs">Søk</Systemtittel>
        </Row>
        <Row>
            <SearchBox
                placeholder="Skriv inn søk..."
                onSearchClick={props.onSearchClick}
            />
        </Row>
    </div>
);

MenuSearch.propTypes = {
    onSearchClick: PropTypes.func.isRequired
};

export default MenuSearch;
