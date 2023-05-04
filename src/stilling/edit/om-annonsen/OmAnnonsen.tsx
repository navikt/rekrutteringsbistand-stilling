import React from 'react';
import { Input } from 'nav-frontend-skjema';
import Stilling from '../../../Stilling';
import { formatISOString } from '../../../utils/datoUtils';

type Props = {
    stilling: Stilling;
};

const OmAnnonsen = ({ stilling }: Props) => {
    const { id, medium, updated, created } = stilling;

    return (
        <>
            <Input
                className="blokk-xs"
                label="Sist endret"
                value={updated !== created ? formatISOString(updated, 'DD.MM.YYYY') || '' : ''}
                disabled
            />
            <Input className="blokk-xs" label="Hentet fra/kilde" value={medium || ''} disabled />
            <Input className="blokk-xs" label="Annonsenummer" value={id || ''} disabled />
        </>
    );
};

export default OmAnnonsen;
