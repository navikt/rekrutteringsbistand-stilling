import React, { FunctionComponent, useEffect, useState } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { cssScopeForApp } from '../index';
import { createBrowserHistory } from 'history';
import { Main } from '../app';
import './Utviklingsapp.less';

const history = createBrowserHistory();

const Utviklingsapp: FunctionComponent = () => {
    // eslint-disable-next-line
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
            <header className="utviklingsapp">
                <Systemtittel>Utviklingsapp for rekrutteringsbistand-stilling</Systemtittel>
                <div className="lenke">
                    <a href="http://localhost:3002/stillinger/">stilling</a>
                </div>
                <div className="lenke">
                    <a href="http://localhost:3002/stillinger/minestillinger">mine stillinger</a>
                </div>
            </header>
            <main>
                <Main history={history} />
            </main>
        </div>
    );
};

export default Utviklingsapp;
