import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import './Filterpanel.less';

const Filterpanel = ({ label, children }) => {
    const accessibilityHeader = `${label}_label`;

    return (
        <Ekspanderbartpanel
            className="Filterpanel blokk-s"
            border
            apen
            tittel={
                <label id={accessibilityHeader} className="typo-element skjemaelement__label">
                    {label}
                </label>
            }
        >
            <SkjemaGruppe className="skjema__fieldset" aria-labelledby={accessibilityHeader}>
                {children}
            </SkjemaGruppe>
        </Ekspanderbartpanel>
    );
};

export default Filterpanel;
