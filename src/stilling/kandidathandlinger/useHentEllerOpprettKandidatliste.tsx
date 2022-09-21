import { useEffect, useState } from 'react';
import { Nettressurs, ikkeLastet, lasterInn, suksess, feil } from '../../api/Nettressurs';
import { fetchKandidatliste, putKandidatliste } from '../legg-til-kandidat-modal/kandidatApi';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';

const useHentEllerOpprettKandidatliste = (stillingsId?: string) => {
    const [kandidatliste, setKandidatliste] = useState<Nettressurs<Kandidatliste>>(ikkeLastet());

    useEffect(() => {
        const hentKandidatliste = async (stillingsId: string) => {
            setKandidatliste(lasterInn());

            let kandidatliste: Nettressurs<Kandidatliste>;

            try {
                kandidatliste = suksess(await fetchKandidatliste(stillingsId));
            } catch (e) {
                if (e.status === 404) {
                    /* TODO: Dette kallet feiler på eksterne stillinger.
                     * Er det riktig at vi prøver å opprette en kandidatliste uansett? */
                    kandidatliste = suksess(await putKandidatliste(stillingsId));
                } else {
                    kandidatliste = feil(e.message);
                }
            }

            setKandidatliste(kandidatliste);
        };

        if (stillingsId) {
            hentKandidatliste(stillingsId);
        }
    }, [stillingsId]);

    return kandidatliste;
};

export default useHentEllerOpprettKandidatliste;
