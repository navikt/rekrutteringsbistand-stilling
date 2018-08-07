import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Styrk from './styrk/Styrk';
import './Categorize.less';

export default function Categorize() {
    return (
        <div className="Categorize">
            <Undertittel className="Categorize__head">Kategorisering</Undertittel>
            <Styrk />
        </div>
    );
}
