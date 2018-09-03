import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './TopMenu.less';
import ShortcutsInfo from '../common/shortcuts/ShortcutsInfo';
import { registerShortcuts, removeShortcuts } from '../common/shortcuts/Shortcuts';
import Reportee from '../reportee/Reportee';

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    componentDidMount() {
        registerShortcuts('global', {
            '?': () => {
                this.openModal();
            },
            'g i': () => {
                this.props.history.push('/');
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('global');
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        return (
            <div className="TopMenu">
                <div className="TopMenu__left">
                    <NavLink
                        exact
                        to="/"
                        className="TopMenu__item TopMenu__title"
                        activeClassName="TopMenu__item-active"
                    >
                        <Systemtittel>NSS Admin</Systemtittel>
                    </NavLink>
                    <NavLink
                        to="/search"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                    >
                        <Normaltekst>Søk etter annonser</Normaltekst>
                    </NavLink>
                    <NavLink
                        to="/statistics"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                    >
                        <Normaltekst>Statistikk</Normaltekst>
                    </NavLink>
                </div>
                <div className="TopMenu__right">
                    <div className="TopMenu__item TopMenu__reportee">
                        <Reportee />
                    </div>
                </div>
                <ShortcutsInfo closeModal={this.closeModal} isOpen={this.state.modalIsOpen} />
            </div>
        );
    }
}

TopMenu.propTypes = {
    history: PropTypes.shape().isRequired
};

export default withRouter(TopMenu);
