import React from 'react';
import { useSelector } from 'react-redux';
import { formatISOString } from '../../../../utils/datoUtils';
import { BodyShort, Label } from '@navikt/ds-react';

const Publishing = () => {
    const published = useSelector((state: any) => state.adData?.published);
    const expires = useSelector((state: any) => state.adData?.expires);

    return (
        <div>
            {(published || expires) && (
                <BodyShort size="small" spacing>
                    <Label size="small">Publisering</Label>
                </BodyShort>
            )}
            {published && (
                <BodyShort size="small" spacing>
                    Publiseringsdato: {formatISOString(published)}
                </BodyShort>
            )}
            {expires && (
                <BodyShort size="small">Siste visningsdato: {formatISOString(expires)}</BodyShort>
            )}
        </div>
    );
};

export default Publishing;
