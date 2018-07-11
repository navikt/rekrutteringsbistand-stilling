import React from 'react';
import PropTypes from 'prop-types';
import { Column, Row } from 'nav-frontend-grid';
import MenuBox from './MenuBox';
import MenuSearch from './MenuSearch';
import MenuStatistics from './MenuStatistics';
import './Menu.less';
import { registerShortcuts } from '../../common/shortcuts/Shortcuts';


class Menu extends React.Component {
    componentDidMount() {
        registerShortcuts('forside', {
            'n s': () => {
                this.props.history.push('/ads/0f0fbd81-5096-4c52-9ca8-b0e21ca3147e');
            },
            'l n': () => {
                this.props.history.push('/');
            }
        });
    }

    render() {
        return (
            <div className="Menu">
                <Column md="4" xs="12" className="Menu__column--left">
                    <Row className="Menu__row">
                        <MenuBox
                            icon='📤'
                            text='Start med neste stillingsannonse'
                            href='/ads/0f0fbd81-5096-4c52-9ca8-b0e21ca3147e'
                        />
                    </Row>
                    <Row className="Menu__row">
                        <MenuBox
                            icon='📝'
                            text='Lag ny stillingsannonse'
                            href='www.nav.no'
                        />
                    </Row>
                </Column>
                <Column md="4" xs="12" className="Menu__column--right">
                    <Row className="Menu__row">
                        <MenuSearch />
                    </Row>
                    <Row className="Menu__row">
                        <MenuStatistics />
                    </Row>
                </Column>
            </div>
        );
    }
}

Menu.propTypes = {
    history: PropTypes.shape().isRequired
};

export default Menu;
