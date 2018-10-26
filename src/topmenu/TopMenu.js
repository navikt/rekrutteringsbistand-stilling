import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './TopMenu.less';
import ShortcutsInfo from '../common/shortcuts/ShortcutsInfo';
import { registerShortcuts, removeShortcuts } from '../common/shortcuts/Shortcuts';
import Reportee from '../reportee/Reportee';
import { SET_SEARCH_VALUE } from '../searchPage/searchReducer';

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

    resetSearchValue = () => {
        this.props.resetSearchValue();
    };


    render() {
        return (
            <div className="TopMenu">
                <div className="TopMenu__left">
                    <NavLink
                        exact
                        to="/"
                        className="TopMenu__item TopMenu__title"
                        onClick={this.resetSearchValue}
                    >
                        <Undertittel>VEILEDER ADMIN</Undertittel>
                    </NavLink>
                    <div className="TopMenu__pipe" />
                    <NavLink
                        to="/search"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                    >
                        <Normaltekst className="TopMenu__item__inner">Søk etter stilling</Normaltekst>
                    </NavLink>
                    <NavLink
                        to="/ads"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                    >
                        <Normaltekst className="TopMenu__item__inner">Stillinger</Normaltekst>
                    </NavLink>
                    <NavLink
                        to="/kandidatsok"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                    >
                        <Normaltekst className="TopMenu__item__inner">Kandidatsøk</Normaltekst>
                    </NavLink>
                    <NavLink
                        to="/kandidatlister"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                    >
                        <Normaltekst className="TopMenu__item__inner">Kandidatlister</Normaltekst>
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
    history: PropTypes.shape().isRequired,
    resetSearchValue: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    resetSearchValue: () => dispatch({ type: SET_SEARCH_VALUE, value: '' })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopMenu));
