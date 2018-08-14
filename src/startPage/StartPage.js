import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sidetittel } from 'nav-frontend-typografi';
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
            <Container className="StartPage">
                <Row>
                    <Column xs="12" md="4" />
                    <Column xs="12" md="4">
                        <Sidetittel className="StartPage__sidetittel">Annonsemottak</Sidetittel>
                        <SearchBox onSearch={this.onSearch} />
                        <Hovedknapp
                            className="StartPage__button"
                            onClick={this.onStartWorkClick}
                        >
                            Start med neste ledige annonse
                        </Hovedknapp>
                    </Column>
                </Row>
            </Container>
        );
    }
}

StartPage.propTypes = {
    resetWorkPriority: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    resetWorkPriority: () => dispatch({ type: RESET_WORK_PRIORITY })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StartPage));

