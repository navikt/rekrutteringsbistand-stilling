import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import './Filterpanel.less';
import { Fieldset } from 'nav-frontend-skjema';

const Filterpanel = ({ label, children }) => {
    const accessibilityHeader = `${label}_label`;

    return (
        <EkspanderbartpanelBase
            id={`${label}_filterpanel`}
            className="Filterpanel blokk-s"
            border
            apen
            heading={
                <label id={accessibilityHeader} className="typo-element skjemaelement__label">
                    {label}
                </label>
            }
        >
            <fieldset className="skjema__fieldset" aria-labelledby={accessibilityHeader}>
                {children}
            </fieldset>
        </EkspanderbartpanelBase>
    );
};

export default Filterpanel;
