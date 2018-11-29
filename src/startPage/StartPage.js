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

class StartPage extends React.Component {
    componentWillMount() {
        this.props.fetchReportee();
    }

    onSearch = () => {
        this.props.history.push('/stillinger');
    };

    render() {
        return (
            <div className="StartPage">
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
                                linkCreator={(props) => <Link to="/stilling" {...props} />}
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
                    </Row>
                </div>
            </div>
        );
    }
}

StartPage.propTypes = {
    history: PropTypes.shape().isRequired,
    fetchReportee: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    fetchReportee: () => dispatch({ type: FETCH_REPORTEE })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StartPage));
