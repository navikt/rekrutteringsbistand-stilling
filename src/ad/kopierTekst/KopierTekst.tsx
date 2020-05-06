import React, { FunctionComponent, useRef, useState } from 'react';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Normaltekst } from 'nav-frontend-typografi';
import './KopierTekst.less';

interface Props {
    className: string;
    tooltipTekst: string;
    skalKopieres?: string;
}

const KopierTekst: FunctionComponent<Props> = ({ className, tooltipTekst, skalKopieres }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [erKopiertPopup, toggleErKopiertPopup] = useState<HTMLButtonElement | undefined>(
        undefined
    );

    const kopier = () => {
        if (skalKopieres) {
            toggleErKopiertPopup(buttonRef.current || undefined);
            navigator.clipboard.writeText(skalKopieres);

            setTimeout(() => {
                toggleErKopiertPopup(undefined);
            }, 2000);
        }
    };

    return (
        <>
            <button
                ref={buttonRef}
                className={className + ' knapp knapp--mini'}
                type="button"
                onClick={kopier}
            >
                {tooltipTekst}
            </button>
            <Popover
                orientering={PopoverOrientering.UnderHoyre}
                autoFokus={false}
                ankerEl={erKopiertPopup}
                onRequestClose={() => toggleErKopiertPopup(undefined)}
            >
                <Normaltekst className="kopier-tekst__popup">Annonselenken ble kopiert</Normaltekst>
            </Popover>
        </>
    );
};

export default KopierTekst;
