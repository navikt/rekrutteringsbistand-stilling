import React, { ReactNode } from 'react';
import { Accordion, BodyShort, BodyLong } from '@navikt/ds-react';

type Props = {
    tittel: string;
    påkrevd?: boolean;
    beskrivelse?: string;
    children: ReactNode;
};

const Seksjon = ({ tittel, påkrevd, beskrivelse, children }: Props) => (
    <Accordion.Item defaultOpen>
        <Accordion.Header>
            {tittel}
            {påkrevd && <BodyShort as="span"> (må fylles ut)</BodyShort>}
            {beskrivelse && <BodyLong size="small">{beskrivelse}</BodyLong>}
        </Accordion.Header>
        <Accordion.Content>{children}</Accordion.Content>
    </Accordion.Item>
);

export default Seksjon;
