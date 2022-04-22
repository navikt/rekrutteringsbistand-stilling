import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';

type Props = {
    påkrevd?: boolean;
    inputId?: string;
    beskrivelse?: string;
    etterLabel?: ReactNode;
};

const Skjemalabel: FunctionComponent<Props> = ({
    inputId,
    påkrevd,
    beskrivelse,
    children,
    etterLabel,
}) => {
    return (
        <div className="blokk-xxs">
            <label htmlFor={inputId}>
                <Element tag="span">{children}</Element>
                {påkrevd && <Normaltekst tag="span"> (må fylles ut)</Normaltekst>}
            </label>
            {etterLabel}
            {beskrivelse && <Normaltekst id={`${inputId}-beskrivelse`}>{beskrivelse}</Normaltekst>}
        </div>
    );
};

export default Skjemalabel;
