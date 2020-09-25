import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

type Props = {
    påkrevd?: boolean;
    inputId?: string;
    beskrivelse?: string;
};

const Skjemaetikett: FunctionComponent<Props> = ({ inputId, påkrevd, beskrivelse, children }) => {
    return (
        <div className="blokk-xxs">
            <label htmlFor={inputId}>
                <Element tag="span">{children}</Element>
                {påkrevd && <Normaltekst tag="span"> (må fylles ut)</Normaltekst>}
            </label>
            {beskrivelse && <Normaltekst id={`${inputId}-beskrivelse`}>{beskrivelse}</Normaltekst>}
        </div>
    );
};

export default Skjemaetikett;
