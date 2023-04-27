import React, { FunctionComponent, ReactNode } from 'react';
import classnames from 'classnames';
import css from './Skjemalegend.module.css';
import { BodyLong, BodyShort, HelpText, Label } from '@navikt/ds-react';

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
            <legend className={classnames(css.skjemalegend, className)}>
                <Label as="span" size="small">
                    {children}
                </Label>
                {påkrevd && (
                    <BodyShort as="span" size="small">
                        {' '}
                        (må fylles ut)
                    </BodyShort>
                )}
                {hjelpetekst && <HelpText className={css.hjelpetekst}>{hjelpetekst}</HelpText>}
            </legend>
            {beskrivelse && <BodyLong>{beskrivelse}</BodyLong>}
        </>
    );
};

export default Skjemalegend;
