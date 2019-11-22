import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import './Filterpanel.less';

const Filterpanel = ({ label, children }) => {
    const accessibilityHeader = `${label}_label`;

    return (
        <EkspanderbartpanelBase
            className="Filterpanel blokk-s"
            border
            apen
            heading={
                <label id={accessibilityHeader} className="typo-element skjemaelement__label">
                    {label}
                </label>
            }
        >
            <div role="group" aria-labelledby={accessibilityHeader}>
                {children}
            </div>
        </EkspanderbartpanelBase>
    );
};

export default Filterpanel;
