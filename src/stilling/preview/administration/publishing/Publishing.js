import React from 'react';
import { useSelector } from 'react-redux';
import { formatISOString } from '../../../../utils/datoUtils.ts';
import { BodyShort, Label } from '@navikt/ds-react';
import css from './Publishing.module.css';

const Publishing = () => {
    const published = useSelector((state) => state.adData.published);
    const expires = useSelector((state) => state.adData.expires);

    return (
        <div>
            {(published || expires) && <Label size="small">Publisering</Label>}
            <div className={css.innhold}>
                {published && (
                    <BodyShort size="small" spacing>
                        Publiseringsdato: {formatISOString(published)}
                    </BodyShort>
                )}
                {expires && (
                    <BodyShort size="small">
                        Siste visningsdato: {formatISOString(expires)}
                    </BodyShort>
                )}
            </div>
        </div>
    );
};

export default Publishing;
