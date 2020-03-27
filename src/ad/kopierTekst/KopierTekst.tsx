import React, { FunctionComponent, useRef, useState } from 'react';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Normaltekst } from 'nav-frontend-typografi';
import './KopierTekst.less';

interface Props {
    tooltipTekst: string;
    skalKopieres?: string;
}

const tidTil;

const KopierTekst: FunctionComponent<Props> = ({ tooltipTekst, skalKopieres }) => {
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
                title={tooltipTekst}
                className="kopier-tekst"
                type="button"
                onClick={kopier}
            >
                <div className="kopier-tekst__ikon" />
            </button>
            <Popover
                orientering={PopoverOrientering.UnderHoyre}
                autoFokus={false}
                ankerEl={erKopiertPopup}
                onRequestClose={() => toggleErKopiertPopup(undefined)}
            >
                <Normaltekst className="kopier-tekst__popup">
                    Annonselenken ble kopiert!
                </Normaltekst>
            </Popover>
        </>
    );
};

export default KopierTekst;
