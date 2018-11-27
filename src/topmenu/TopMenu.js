import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './TopMenu.less';
import Reportee from '../reportee/Reportee';
import { RESET_SEARCH, SET_SEARCH_VALUE } from '../searchPage/searchReducer';

class TopMenu extends React.Component {
    resetSearchValue = () => {
        this.props.resetSearchValue();
    };

    render() {
        const { resetSearch } = this.props;
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
                        to="/stillinger"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                        onClick={resetSearch}
                    >
                        <Normaltekst className="TopMenu__item__inner">Søk etter stilling</Normaltekst>
                    </NavLink>
                    <NavLink
                        to="/minestillinger"
                        className="TopMenu__item"
                        activeClassName="TopMenu__item-active"
                    >
                        <Normaltekst className="TopMenu__item__inner">Mine stillinger</Normaltekst>
                    </NavLink>
                    <a
                        href="/kandidater"
                        className="TopMenu__item"
                    >
                        <Normaltekst className="TopMenu__item__inner">Kandidatsøk</Normaltekst>
                    </a>
                </div>
                <div className="TopMenu__right">
                    <div className="TopMenu__item TopMenu__reportee">
                        <Reportee />
                    </div>
                </div>
            </div>
        );
    }
}

TopMenu.propTypes = {
    resetSearchValue: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    resetSearchValue: () => dispatch({ type: SET_SEARCH_VALUE, value: '' }),
    resetSearch: () => dispatch({ type: RESET_SEARCH })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopMenu));
