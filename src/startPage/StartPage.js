import React from 'react';
import { Link } from 'react-router-dom';
import { Column, Container, Row } from 'nav-frontend-grid';
import { Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import './StartPage.less';
import Menu from './menu/Menu';
import { removeShortcuts } from '../common/shortcuts/Shortcuts';


class StartPage extends React.Component {
    componentWillUnmount() {
        removeShortcuts('forside');
    }

    render() {
        return (
            <Column md="12">
                <Container className="StartPage">
                    <Row className="StartPage__settings">
                        <Link className="StartPage__settings__link" to="nav.no">
                            <Systemtittel>
                                <i>⚙</i>
                                Innstillinger
                            </Systemtittel>
                        </Link> </Row>
                    <Column md="8">
                        <Row>
                            <Sidetittel>Annonsemottak</Sidetittel>
                        </Row>
                        <Row>
                            <Menu history={this.props.history}/>
                        </Row>
                    </Column>
                </Container>
            </Column>
        );
    }
}
export default StartPage;
