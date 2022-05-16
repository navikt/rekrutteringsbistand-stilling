import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import { State } from '../../redux/store';
import './Varsling.less';

const Varsling: FunctionComponent = () => {
    const { innhold, alertType } = useSelector((state: State) => state.varsling);

    if (innhold === null) {
        return null;
    }

    return (
        <AlertStripe className="varsling" type={alertType} aria-live="assertive">
            {innhold}
        </AlertStripe>
    );
};

export default Varsling;
