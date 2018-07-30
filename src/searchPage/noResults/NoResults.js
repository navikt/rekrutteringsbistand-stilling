import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import './NoResults.less';

export default function NoResults() {
    return (
        <div className="NoResults">
            <Ingress>Fant ingen annonser som matcher søket ditt.</Ingress>
        </div>
    );
}
