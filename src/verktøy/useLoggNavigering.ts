import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { sendEvent } from './amplitude';

const stierSomSkalLogges = ['/stillinger', '/stillinger/minestillinger'];
const begynnelsenAvStierSomSkalLogges = ['/stillinger/stilling/'];

const useLoggNavigering = () => {
    const history = useHistory();
    const pathname = history.location.pathname;

    const loggNavigering = (side: string) => {
        sendEvent('app', 'sidevisning', {
            side,
        });
    };

    useEffect(() => {
        if (stierSomSkalLogges.includes(pathname)) {
            loggNavigering(pathname);
        } else {
            const begynnelsenAvSti = begynnelsenAvStierSomSkalLogges.find((sti) =>
                pathname.startsWith(sti)
            );

            if (begynnelsenAvSti) {
                loggNavigering(begynnelsenAvSti);
            }
        }
    }, [pathname]);
};

export default useLoggNavigering;
