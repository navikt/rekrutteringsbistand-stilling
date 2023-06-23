import { FunctionComponent, useEffect } from 'react';
import { History } from 'history';
import { Modal } from '@navikt/ds-react';
import { useDispatch } from 'react-redux';

import { ReporteeAction, ReporteeActionType } from '../reportee/ReporteeAction';
import { Route, Routes } from 'react-router-dom';
import { setNavKontorIAmplitude } from '../verktøy/amplitude';
import { startSentry } from '../verktøy/sentry';
import createReduxStore from '../redux/store';
import MineStillinger from '../mine-stillinger/MineStillinger';
import Stilling from '../stilling/Stilling';
import Varsling from '../common/varsling/Varsling';

startSentry();

export const store = createReduxStore();

const appElement =
    document.getElementById('rekrutteringsbistand-container') ||
    document.getElementById('utviklingsapp');

if (appElement) {
    Modal.setAppElement(appElement);
}

export type AppProps = {
    history: History;
    navKontor: string | null;
};

const App: FunctionComponent<AppProps> = ({ navKontor, history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (navKontor !== null) {
            setNavKontorIAmplitude(navKontor);
        }
    }, [navKontor]);

    useEffect(() => {
        dispatch<ReporteeAction>({ type: ReporteeActionType.FetchReportee });
    }, [dispatch]);

    return (
        <>
            <Varsling />
            <Routes>
                <Route
                    path="/stillinger/minestillinger"
                    element={<MineStillinger history={history} />}
                />
                <Route path="/stillinger/stilling/:uuid" element={<Stilling />} />
            </Routes>
        </>
    );
};

export default App;
