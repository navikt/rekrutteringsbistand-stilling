import React, { FunctionComponent } from 'react';
import { CopyToClipboard } from '@navikt/ds-react-internal';

type Props = {
    className: string;
    tooltipTekst: string;
    skalKopieres: string;
};

const KopierTekst: FunctionComponent<Props> = ({ tooltipTekst, skalKopieres, className }) => {
    return (
        <span>
            <CopyToClipboard
                className={className}
                copyText={skalKopieres}
                popoverText="Annonselenken ble kopiert"
                variant={'secondary' as 'tertiary'}
                size="small"
            >
                {tooltipTekst}
            </CopyToClipboard>
        </span>
    );
};

export default KopierTekst;
