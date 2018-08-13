import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Sidetittel } from 'nav-frontend-typografi';
import { Column, Container, Row } from 'nav-frontend-grid';
import './StartPage.less';
import SearchBox from '../searchPage/searchBox/SearchBox';

class StartPage extends React.Component {
    onSearch = () => {
        this.props.history.push('/search');
    };

    render() {
        return (
            <Container className="StartPage">
                <Row>
                    <Column xs="12" md="4" />
                    <Column xs="12" md="4">
                        <Sidetittel className="StartPage__sidetittel">Annonsemottak</Sidetittel>
                        <SearchBox onSearch={this.onSearch} />
                        <Link to="/ads" className="knapp knapp--hoved StartPage__button">
                            Start med neste ledige annonse
                        </Link>
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default withRouter(StartPage);
