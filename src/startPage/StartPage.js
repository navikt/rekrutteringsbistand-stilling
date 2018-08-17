import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Column, Container, Row } from 'nav-frontend-grid';
import { Hovedknapp } from 'nav-frontend-knapper';
import './StartPage.less';
import SearchBox from '../searchPage/searchBox/SearchBox';
import { RESET_WORK_PRIORITY } from '../ad/adReducer';

class StartPage extends React.Component {
    onSearch = () => {
        this.props.history.push('/search');
    };

    onStartWorkClick = () => {
        this.props.resetWorkPriority();
        this.props.history.push('/ads');
    };

    render() {
        return (
            <div className="StartPage">
                <SearchBox onSearch={this.onSearch} />
                <br/><br/><br/><br/>
                <Hovedknapp
                    className="StartPage__button"
                    onClick={this.onStartWorkClick}
                >
                    Start med neste ledige annonse
                </Hovedknapp>
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
