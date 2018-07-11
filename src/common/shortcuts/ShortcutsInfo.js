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
                                <dt><span>?</span></dt><dd> Vise hurtigtastoverikten</dd>
                                <dt><span>g i</span></dt><dd> Gå til forsiden</dd>
                            </dl>

                            <Systemtittel>Forside</Systemtittel>
                            <dl className="Shortcuts__list">
                                <dt><span>/</span></dt><dd>Søk på stilling eller arbeidsgiver</dd>
                                <dt><span>n s</span></dt><dd>Vis neste stillingsannonse</dd>
                                <dt><span>l n</span></dt><dd>Lag ny stillingsannonse</dd>
                            </dl>
                        </Column>
                        <Column md="6">
                            <Systemtittel>Annonsedetaljer</Systemtittel>
                            <dl className="Shortcuts__list">
                                <dt><span>/</span></dt><dd>Skriv en kommentar</dd>
                                <dt><span>l a</span></dt><dd>Legg til arbeidsgiver</dd>
                                <dt><span>l g</span></dt><dd>Legg til geografi</dd>
                                <dt><span>l y</span></dt><dd>Legg til arbeidsyrke</dd>
                                <dt><span>m i</span></dt><dd>Marker som diskriminerede</dd>
                                <dt><span>m d</span></dt><dd>Marker som duplikat</dd>
                                <dt><span>m a</span></dt><dd>Marker som ikke ansatt</dd>
                                <dt><span>m b</span></dt><dd>Marker som ikke godkjent bemanning/renhold</dd>
                                <dt><span>m k</span></dt><dd>Marker som avvist pga kapasitet</dd>
                                <dt><span>m u</span></dt><dd>Marker som utenlandsk stilling</dd>
                                <dt><span>m s</span></dt><dd>Marker som samleannonse</dd>
                                <dt><span>g g</span></dt><dd>Godkjenn annonsen</dd>
                                <dt><span>a a</span></dt><dd>Avvis annonsen</dd>
                                <dt><span>s s</span></dt><dd>Stopp annonsen</dd>
                                <dt><span>g j</span></dt><dd>Gjenåpne annonsen</dd>
                                <dt><span>v n</span></dt><dd>Neste annonse</dd>
                            </dl>
                        </Column>
                    </Row>
                </Panel>
            </ModalWrapper>
        );
    }
}
