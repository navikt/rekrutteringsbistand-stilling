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

    onSearchClick = () => {
        this.props.history.push('/search');
    };

    render() {
        return (
            <div className="Menu">
                <Row className="blokk-s">
                    <Column xs="12" md="4">
                        <MenuBox
                            icon="📤"
                            text="Start med neste stillingsannonse"
                            href="/ads/0f0fbd81-5096-4c52-9ca8-b0e21ca3147e"
                        />
                        <MenuBox
                            icon="📝"
                            text="Lag ny stillingsannonse"
                            href="www.nav.no"
                        />
                    </Column>
                    <Column xs="12" md="6">
                        <MenuSearch onSearchClick={this.onSearchClick} />
                        <MenuStatistics className="text-center" />
                    </Column>
                </Row>
            </div>
        );
    }
}

Menu.propTypes = {
    history: PropTypes.shape().isRequired
};

export default Menu;
