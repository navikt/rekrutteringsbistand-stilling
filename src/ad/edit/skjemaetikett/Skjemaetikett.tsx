import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

type Props = {
    påkrevd?: boolean;
    beskrivelse?: string;
    inputId?: string;
    beskrivelseId?: string;
};

const Skjemaetikett: FunctionComponent<Props> = ({
    inputId,
    beskrivelseId,
    påkrevd,
    beskrivelse,
    children,
}) => {
    return (
        <div className="blokk-xxs">
            <label htmlFor={inputId}>
                <Element tag="span">{children}</Element>
                {påkrevd && <Normaltekst tag="span"> (må fylles ut)</Normaltekst>}
            </label>
            {beskrivelse && <Normaltekst id={beskrivelseId}>{beskrivelse}</Normaltekst>}
        </div>
    );
};

export default Skjemaetikett;
