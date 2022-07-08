import React, { FunctionComponent, useEffect, useState } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Link, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { cssScopeForApp } from '../index';
import App from '../App';
import './Utviklingsapp.less';
import CustomRouter from './CustomRouter';

const history = createBrowserHistory();

const Utviklingsapp: FunctionComponent = () => {
    const [navKontor, setNavKontor] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNavKontor('0239');
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <div className={cssScopeForApp}>
            <CustomRouter history={history}>
                <header className="utviklingsapp">
                    <Systemtittel>Utviklingsapp for rekrutteringsbistand-stilling</Systemtittel>
                    <div className="utviklingsapp__lenke">
                        <Link to="/stillinger/minestillinger">Mine stillinger</Link>
                    </div>
                </header>
                <App navKontor={navKontor} history={history} />
            </CustomRouter>
        </div>
    );
};

export default Utviklingsapp;
