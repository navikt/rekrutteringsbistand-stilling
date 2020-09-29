import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './Skjemalegend.less';

type Props = {
    påkrevd?: boolean;
    beskrivelse?: string;
};

const Skjemalegend: FunctionComponent<Props> = ({ påkrevd, beskrivelse, children }) => {
    return (
        <>
            <legend className="skjemalegend">
                <Element tag="span">{children}</Element>
                {påkrevd && <Normaltekst tag="span"> (må fylles ut)</Normaltekst>}
            </legend>
            {beskrivelse && <Normaltekst>{beskrivelse}</Normaltekst>}
        </>
    );
};

export default Skjemalegend;
