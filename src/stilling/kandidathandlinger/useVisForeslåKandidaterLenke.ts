import { useEffect, useState } from 'react';

export const FEATURE_TOGGLE_API = '/feature-toggle';

export const useVisForeslåKandidaterLenke = () => {
    const [visForeslåKandidaterLenke, setVisForeslåKandidaterLenke] = useState<boolean>(false);

    useEffect(() => {
        const hentFeatureToggle = async () => {
            try {
                const response = await fetch(`${FEATURE_TOGGLE_API}/kandidatmatch`);
                const erEnabled: boolean = await response.json();

                setVisForeslåKandidaterLenke(erEnabled);
            } catch (e) {
                console.error('Klarte ikke å hente feature toggle:', e);
            }
        };

        hentFeatureToggle();
    }, []);

    return visForeslåKandidaterLenke;
};
