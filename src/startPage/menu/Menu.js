import React from 'react';
import {Column, Row} from 'nav-frontend-grid';
import MenuBox from "./MenuBox";
import MenuSearch from './MenuSearch';
import MenuStatistics from './MenuStatistics';
import "./Menu.less";

const Menu = () => (
    <div>
        <Column md="4" xs="12" className="menu-col-left">
            <Row className="menu-row">
                <MenuBox
                    icon='📤'
                    text='Start med neste stillingsannonse'
                    href='/ads/0f0fbd81-5096-4c52-9ca8-b0e21ca3147e'
                />
            </Row>
            <Row className="menu-row">
                <MenuBox
                    icon='📝'
                    text='Lag ny stillingsannonse'
                    href='www.nav.no'
                />
            </Row>
        </Column>
        <Column md="4" xs="12" className="menu-col-right">
            <Row className="menu-row">
                <MenuSearch/>
            </Row>
            <Row className="menu-row">
                <MenuStatistics/>
            </Row>
        </Column>
    </div>
);

export default Menu;
