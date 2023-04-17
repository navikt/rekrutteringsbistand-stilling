import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';
import classnames from 'classnames';
import './Skjemalegend.less';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';

type Props = {
    påkrevd?: boolean;
    beskrivelse?: string;
    className?: string;
    hjelpetekst?: ReactNode;
    children?: ReactNode;
};

const Skjemalegend: FunctionComponent<Props> = ({
    påkrevd,
    beskrivelse,
    className,
    hjelpetekst,
    children,
}) => {
    return (
        <>
            <legend className={classnames('skjemalegend', className)}>
                <Element tag="span">{children}</Element>
                {påkrevd && <Normaltekst tag="span"> (må fylles ut)</Normaltekst>}
                {hjelpetekst && (
                    <Hjelpetekst
                        className="skjemalegend__hjelpetekst"
                        type={PopoverOrientering.Under}
                    >
                        {hjelpetekst}
                    </Hjelpetekst>
                )}
            </legend>
            {beskrivelse && <Normaltekst>{beskrivelse}</Normaltekst>}
        </>
    );
};

export default Skjemalegend;
