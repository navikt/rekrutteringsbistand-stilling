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

    render() {
        return (
            <div className="StartPage">
                <div className="StartPage__SearchBox__wrapper">
                    <SearchBox onSearch={this.onSearch} />
                </div>
                <Row className="StartPage__panels">
                    <Column xs="12" md="6">
                        <LenkepanelBase
                            href="/ads"
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
