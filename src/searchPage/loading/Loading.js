import React from 'react';
import Spinner from 'nav-frontend-spinner';
import { Element } from 'nav-frontend-typografi';
import './Loading.less';

export default function Loading() {
    return (
        <div className="Loading">
            <Spinner type="L" />
            <Element>Henter annonser...</Element>
        </div>
    );
}
