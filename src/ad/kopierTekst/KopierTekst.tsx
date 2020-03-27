import React, { FunctionComponent } from 'react';
import './KopierTekst.less';

interface Props {
    tooltipTekst: string;
    skalKopieres?: string;
}

const KopierTekst: FunctionComponent<Props> = ({ tooltipTekst, skalKopieres }) => {
    const kopier = () => {
        if (skalKopieres) {
            navigator.clipboard.writeText(skalKopieres);
        }
    };

    return (
        <button title={tooltipTekst} className="kopier-tekst" type="button" onClick={kopier}>
            <div className="kopier-tekst__ikon" />
        </button>
    );
};

export default KopierTekst;
