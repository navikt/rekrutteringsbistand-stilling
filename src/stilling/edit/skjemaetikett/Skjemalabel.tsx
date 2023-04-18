import { BodyShort, Label } from '@navikt/ds-react';
import React, { FunctionComponent, ReactNode } from 'react';

type Props = {
    påkrevd?: boolean;
    inputId?: string;
    beskrivelse?: string;
    etterLabel?: ReactNode;
    children?: ReactNode;
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
                <Label size="small" as="span">
                    {children}
                </Label>
                {påkrevd && (
                    <BodyShort size="small" as="span">
                        {' '}
                        (må fylles ut)
                    </BodyShort>
                )}
            </label>
            {etterLabel}
            {beskrivelse && (
                <BodyShort size="small" id={`${inputId}-beskrivelse`}>
                    {beskrivelse}
                </BodyShort>
            )}
        </div>
    );
};

export default Skjemalabel;
