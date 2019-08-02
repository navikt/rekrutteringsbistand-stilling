import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Column, Row } from 'nav-frontend-grid';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import './StartPage.less';
import SearchBox from '../searchPage/searchBox/SearchBox';
import { FETCH_REPORTEE } from '../reportee/reporteeReducer';
import { RESET_SEARCH } from '../searchPage/searchReducer';

class StartPage extends React.Component {
    componentWillMount() {
        this.props.resetSearch();
        this.props.fetchReportee();
    }

    onSearch = () => {
        this.props.history.push('/stillinger');
    };

    render() {
        const newAdRoute = {
            pathname: '/stilling',
            state: { isNew: true }
        };
        return (
            <div className="StartPage">
                <h1 className="visually-hidden">Forside rekrutteringsbistand</h1>
                <div className="StartPage__SearchBox__wrapper">
                    <SearchBox onSearch={this.onSearch} />
                </div>
                <div className="StartPage__panels">
                    <Row>
                        <Column className="StartPage__panel blokk-s" xs="12" md="6">
                            <LenkepanelBase
                                href="/minestillinger"
                                border
                                linkCreator={(props) => <Link to="/minestillinger" {...props} />}
                            >
                                <div className="StartPage__panel-flex">
                                    <div className="StartPage__icon-copy" />
                                    <Systemtittel className="StartPage__systemtittel">
                                        Mine stillinger
                                    </Systemtittel>
                                </div>
                            </LenkepanelBase>
                        </Column>
                        <Column className="StartPage__panel blokk-s" xs="12" md="6">
                            <LenkepanelBase
                                href="/stilling"
                                border
                                linkCreator={(props) => <Link to={newAdRoute} {...props} />}
                            >
                                <div className="StartPage__panel-flex">
                                    <div className="StartPage__icon-pen" />
                                    <Systemtittel className="StartPage__systemtittel">
                                        Opprett ny stilling
                                    </Systemtittel>
                                </div>
                            </LenkepanelBase>
                        </Column>
                    </Row>
                    <Row>
                        <Column className="StartPage__panel" xs="12" md="6">
                            <LenkepanelBase
                                href="/kandidater"
                                border
                            >
                                <div className="StartPage__panel-flex">
                                    <div className="StartPage__icon-candidates" />
                                    <Systemtittel className="StartPage__systemtittel">
                                        Finn kandidater til stilling
                                    </Systemtittel>
                                </div>
                            </LenkepanelBase>
                        </Column>
                        <Column className="StartPage__panel" xs="12" md="6">
                            <LenkepanelBase
                                href="/kandidater/lister"
                                border
                            >
                                <div className="StartPage__panel-flex">
                                    <div className="StartPage__icon-candidateList" />
                                    <Systemtittel className="StartPage__systemtittel">
                                        Se og opprett kandidatlister
                                    </Systemtittel>
                                </div>
                            </LenkepanelBase>
                        </Column>
                    </Row>
                </div>
            </div>
        );
    }
}

StartPage.propTypes = {
    history: PropTypes.shape().isRequired,
    fetchReportee: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    fetchReportee: () => dispatch({ type: FETCH_REPORTEE }),
    resetSearch: () => dispatch({ type: RESET_SEARCH })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StartPage));
