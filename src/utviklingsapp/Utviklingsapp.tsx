import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AppMedStore } from '../index';
import CustomRouter from './CustomRouter';
import { Heading } from '@navikt/ds-react';
import css from './Utviklingsapp.module.css';

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
        <CustomRouter history={history}>
            <header className={css.utviklingsapp}>
                <Heading level="1" size="small">
                    Utviklingsapp for rekrutteringsbistand-stilling
                </Heading>
                <div className={css.lenker}>
                    <Link to="/stillinger/minestillinger">Mine stillinger</Link>
                    <Link to="/stillinger/stilling/590c6074-c67c-4ce9-bb7c-e2d07614f7b6">
                        Min interne stilling
                    </Link>
                    <Link to="/stillinger/stilling/622f9df6-ec92-4cc8-94a5-62a0e49def59">
                        En kollegas interne stilling
                    </Link>
                    <Link to="/stillinger/stilling/876df0d4-d0c8-41a2-85c5-23a25595e6db">
                        Ekstern stilling uten kandidatliste
                    </Link>
                    <Link to="/stillinger/stilling/b069a07d-acf5-4b61-a254-9bf4f2aa97f7">
                        Ekstern stilling med kandidatliste
                    </Link>
                </div>
            </header>
            <AppMedStore navKontor={navKontor} history={history} />
        </CustomRouter>
    );
};

export default Utviklingsapp;
