import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';


export default class Filter extends React.Component {

    render() {
        return (
            <div
                className="Published"
            >
                <Undertittel className="blokk-xs">Status</Undertittel>
                <Checkbox
                    label="Ikke publiserte"
                />
                <Checkbox
                    label="Publiserte"
                />
                <Checkbox
                    label="Stoppet"
                />
            </div>
        );
    }
}
