import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Input } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Systemtittel } from 'nav-frontend-typografi';
import BekreftMedNotat from './BekreftMedNotat';
import LeggTilEllerAvbryt from './LeggTilEllerAvbryt';
import { Kandidat, Kandidatliste } from './kandidatlistetyper';
import { sendEvent } from '../../amplitude';
import { Nettressurs, ikkeLastet, Nettstatus, lasterInn } from '../../api/Nettressurs';
import { fetchKandidatMedFnr } from './kandidatApi';
import { Synlighetsevaluering } from './kandidaten-finnes-ikke/Synlighetsevaluering';
import fnrValidator from '@navikt/fnrvalidator';
import { fetchSynlighetsevaluering } from './kandidatApi';
import KandidatenFinnesIkke from './kandidaten-finnes-ikke/KandidatenFinnesIkke';

type Props = {
    kandidatliste: Kandidatliste;
    onClose: () => void;
};

const LeggTilKandidat: FunctionComponent<Props> = ({ kandidatliste, onClose }) => {
    const [fnr, setFnr] = useState<string>('');
    const [feilmelding, setFeilmelding] = useState<string | null>(null);
    const [erAlleredeLagtTil, setAlleredeLagtTil] = useState<boolean>(false);
    const [fnrSøk, setFnrSøk] = useState<Nettressurs<Kandidat>>(ikkeLastet());
    const [synlighetsevaluering, setSynlighetsevaluering] = useState<
        Nettressurs<Synlighetsevaluering>
    >(ikkeLastet());

    const tilbakestill = (medFeilmelding: string | null = null) => {
        setFeilmelding(medFeilmelding);
        setAlleredeLagtTil(false);
        setFnrSøk(ikkeLastet());
        setSynlighetsevaluering(ikkeLastet());
    };

    const onFnrChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;

        setFnr(fnr);

        if (fnr.length < 11) {
            tilbakestill();
        } else if (fnr.length > 11) {
            tilbakestill('Fødselsnummeret er for langt');
        } else {
            const erGyldig = validerFnr(fnr);

            if (erGyldig) {
                setFeilmelding(null);

                const finnesAllerede = erFnrAlleredeIListen(fnr);
                setAlleredeLagtTil(finnesAllerede);

                if (finnesAllerede) {
                    setFeilmelding('Kandidaten er allerede lagt til i listen');
                } else {
                    hentKandidatMedFødselsnummer(fnr);
                }
            } else {
                tilbakestill('Fødselsnummeret er ikke gyldig');
            }
        }
    };

    const erFnrAlleredeIListen = (fnr: string) =>
        kandidatliste.kandidater.some((kandidat) => kandidat.fodselsnr === fnr);

    const hentKandidatMedFødselsnummer = async (fnr: string) => {
        setFnrSøk({
            kind: Nettstatus.LasterInn,
        });

        try {
            const fnrSøkResponse = await fetchKandidatMedFnr(fnr);
            setFnrSøk(fnrSøkResponse);

            if (fnrSøkResponse.kind === Nettstatus.FinnesIkke) {
                setFeilmelding('Kandidaten er ikke synlig i Rekrutteringsbistand');

                sendEvent('fødselsnummersøk', 'fant-ingen-kandidat', {
                    kontekst: 'kandidatliste',
                });

                setSynlighetsevaluering(lasterInn());
                const synlighetPromise = fetchSynlighetsevaluering(fnr);

                setSynlighetsevaluering(await synlighetPromise);
            }
        } catch (e) {
            setFnrSøk({
                kind: Nettstatus.Feil,
                error: {
                    message: 'Klarte ikke å hente kandidat med fødselsnummer',
                },
            });
        }
    };

    return (
        <>
            <Systemtittel className="LeggTilKandidatModal__tittel">Legg til kandidat</Systemtittel>
            <AlertStripeAdvarsel className="LeggTilKandidatModal__advarsel">
                Før du legger en kandidat på kandidatlisten må du undersøke om personen oppfyller
                kravene som er nevnt i stillingen.
            </AlertStripeAdvarsel>

            <Input
                autoFocus
                bredde="S"
                value={fnr}
                id="legg-til-kandidat-fnr"
                onChange={onFnrChange}
                placeholder="11 siffer"
                label="Fødselsnummer på kandidaten"
                className="blokk-s"
                feil={feilmelding || undefined}
            />

            {erAlleredeLagtTil && (
                <AlertStripeInfo className="LeggTilKandidatModal__advarsel">
                    Finner du ikke kandidaten i kandidatlisten? Husk å sjekk om kandidaten er
                    slettet ved å huke av "Vis kun slettede".
                </AlertStripeInfo>
            )}

            {(fnrSøk.kind === Nettstatus.LasterInn ||
                synlighetsevaluering.kind === Nettstatus.LasterInn) && (
                <NavFrontendSpinner className="LeggTilKandidatModal__spinner" />
            )}

            {fnrSøk.kind === Nettstatus.Suksess && (
                <BekreftMedNotat
                    fnr={fnr}
                    kandidat={fnrSøk.data}
                    kandidatliste={kandidatliste}
                    onClose={onClose}
                />
            )}

            {fnrSøk.kind === Nettstatus.FinnesIkke &&
                synlighetsevaluering.kind === Nettstatus.Suksess && (
                    <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                )}

            {fnrSøk.kind !== Nettstatus.Suksess && fnrSøk.kind !== Nettstatus.FinnesIkke && (
                <LeggTilEllerAvbryt leggTilDisabled onAvbrytClick={onClose} />
            )}
        </>
    );
};

const validerFnr = (fnr: string): boolean => fnrValidator.idnr(fnr).status === 'valid';

export default LeggTilKandidat;
