import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Column, Row } from 'nav-frontend-grid';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import './StartPage.less';
import SearchBox from '../searchPage/searchBox/SearchBox';
import { RESET_WORK_PRIORITY } from '../ad/adReducer';

class StartPage extends React.Component {
    onSearch = () => {
        this.props.history.push('/search');
    };

    onStartWorkClick = () => {
        this.props.resetWorkPriority();
    };

    render() {
        return (
            <div className="StartPage">
                <SearchBox onSearch={this.onSearch} />
                <Row className="StartPage__panels">
                    <Column xs="12" md="6">
                        <LenkepanelBase
                            onClick={this.onStartWorkClick}
                            href="/ads"
                            border
                        >
                            <span className="StartPage__icon-godkjenn" />
                            <Systemtittel className="StartPage__systemtittel">Godkjenn annonser</Systemtittel>
                        </LenkepanelBase>
                    </Column>
                    <Column xs="12" md="6">
                        <LenkepanelBase
                            href="#"
                            border
                        >
                            <span className="StartPage__icon-pen" />
                            <Systemtittel className="StartPage__systemtittel">Registrer ny stilling</Systemtittel>
                        </LenkepanelBase>
                    </Column>
                </Row>
            </div>
        );
    }
}

StartPage.propTypes = {
    resetWorkPriority: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    resetWorkPriority: () => dispatch({ type: RESET_WORK_PRIORITY })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StartPage));
