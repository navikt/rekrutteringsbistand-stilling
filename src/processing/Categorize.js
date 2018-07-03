import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import Styrk from './styrk/Styrk';
import Employer from './employer/Employer';
import Location from './location/Location';
import './Categorize.less';

export default function Categorize() {
    return (
        <Panel border>
            <Undertittel className="Categorize__head">Kategorisering</Undertittel>
            <Employer />
            <Location />
            <Styrk />
        </Panel>
    );
}
