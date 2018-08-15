import React from 'react';
import { Row, Column } from 'nav-frontend-grid';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import ModalWrapper from 'nav-frontend-modal';
import './Shortcuts.less';


export default class ShortcutsInfo extends React.Component {
    render() {
        return (
            <ModalWrapper
                isOpen={this.props.isOpen}
                onRequestClose={this.props.closeModal}
                contentLabel="Hurtigtaster"
                appElement={document.getElementById('app')}
                className="Shortcuts"
            >
                <Panel >
                    <Row>
                        <Column md="6">
                            <Systemtittel>Globale hurtigtaster</Systemtittel>
                            <dl className="Shortcuts__list blokk-m">
                                <dt><span>?</span></dt><dd> Vise hurtigtastoversikten</dd>
                            </dl>
                        </Column>
                        <Column md="6">
                            <Systemtittel>Annonsedetaljer</Systemtittel>
                            <dl className="Shortcuts__list">
                                <dt><span>/</span></dt><dd>Skriv en kommentar</dd>
                                <dt><span>r r</span></dt><dd>Rediger</dd>
                                <dt><span>s s</span></dt><dd>Lagre</dd>
                                <dt><span>p p</span></dt><dd>Publiser annonsen</dd>
                                <dt><span>a a</span></dt><dd>Avslutt saksbehandling</dd>
                                <dt><span>n n</span></dt><dd>Neste annonse</dd>
                            </dl>
                        </Column>
                    </Row>
                </Panel>
            </ModalWrapper>
        );
    }
}
