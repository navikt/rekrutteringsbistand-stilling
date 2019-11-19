import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

const Filterpanel = ({ label, htmlFor, children }) => (
    <EkspanderbartpanelBase
        className="blokk-s"
        border
        apen
        heading={
            <label className="typo-element skjemaelement__label" htmlFor={htmlFor}>
                {label}
            </label>
        }
    >
        {children}
    </EkspanderbartpanelBase>
);

export default Filterpanel;
