import React from 'react';
import { connect } from 'react-redux';
import { Element, Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import './EmployerContact.less';



export default class EmployerContact extends React.Component {

    render() {
        return (
            <Ekspanderbartpanel
                className="blokk-s"
                border
                tittel='Kontakt med arbeidsgiver'
                tittelProps='undertittel'
            >
                <div >
                    <Normaltekst>Historikk</Normaltekst>
                    <Panel border={true} className="blokk-s">
                        <Normaltekst className="EmployerContact__empty">
                            Ingen meldinger registrert.
                        </Normaltekst>
                    </Panel>
                </div>

                <div>
                    <Knapp mini className="EmployerContact__button">
                        Send melding
                    </Knapp>
                    <Knapp mini className="EmployerContact__button">Registrer svar</Knapp>
                </div>
            </Ekspanderbartpanel>
        );
    }
}

