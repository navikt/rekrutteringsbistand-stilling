import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import './Skjemalegend.less';

type Props = {
    påkrevd?: boolean;
    beskrivelse?: string;
    className?: string;
};

const Skjemalegend: FunctionComponent<Props> = ({ påkrevd, beskrivelse, className, children }) => {
    return (
        <>
            <legend className={classnames('skjemalegend', className)}>
                <Element tag="span">{children}</Element>
                {påkrevd && <Normaltekst tag="span"> (må fylles ut)</Normaltekst>}
            </legend>
            {beskrivelse && <Normaltekst>{beskrivelse}</Normaltekst>}
        </>
    );
};

export default Skjemalegend;
