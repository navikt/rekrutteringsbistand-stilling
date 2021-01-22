import React, { FunctionComponent, useEffect, useState } from 'react';
import { fetchPost } from '../api/api';

const stillingsøkProxy = '/rekrutteringsbistand-stilling/stillingssok-proxy';

const query = {
    size: 3,
    query: {
        bool: {
            must: {
                exists: {
                    field: 'stillingsinfo',
                },
            },
        },
    },
};

const Stillingssøk: FunctionComponent = () => {
    const [stillinger, setStillinger] = useState<any[]>([]);

    useEffect(() => {
        const hentStillinger = async () => {
            try {
                setStillinger(await fetchPost(`${stillingsøkProxy}/_search`, query));
            } catch (e) {
                console.log('Klarte ikke å hente stillinger');
            }
        };

        hentStillinger();
    });

    return (
        <div>
            <h1>Stillinger:</h1>
            <ul>
                {stillinger.map((stilling) => (
                    <li>{stilling.stilling.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stillingssøk;
