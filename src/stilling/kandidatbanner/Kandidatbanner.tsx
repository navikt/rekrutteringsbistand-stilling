import React, { useEffect, useState } from 'react';
import { BodyShort, Button, ErrorMessage, Heading } from '@navikt/ds-react';
import { PersonCheckmarkIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import css from './Kandidatbanner.module.css';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Kandidat, Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import AnbefalKandidatModal from './AnbefalKandidatModal';
import { Link } from 'react-router-dom';
import { State } from '../../redux/store';

export const kandidatProxyUrl = '/kandidatsok-proxy';

type Props = {
    fnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
};

export type EsRespons = {
    hits: {
        hits: Array<{
            _source: Kandidat;
        }>;
    };
};

const byggQuery = (fodselsnummer: string) => ({
    query: {
        term: {
            fodselsnummer,
        },
    },
    size: 1,
    _source: ['fornavn', 'etternavn', 'arenaKandidatnr'],
});

const Kandidatbanner = ({ fnr, kandidatliste, setKandidatliste }: Props) => {
    const [kandidat, setKandidat] = useState<Kandidat>();
    const [feilmelding, setFeilmelding] = useState<string | undefined>();
    const [visModal, setVisModal] = useState<boolean>(false);

    useEffect(() => {
        const hentKandidat = async (fnr: string) => {
            try {
                const respons = await fetch(kandidatProxyUrl, {
                    method: 'POST',
                    body: JSON.stringify(byggQuery(fnr)),
                    headers: { 'Content-Type': 'application/json' },
                });

                const esRespons = (await respons.json()) as EsRespons;
                const kandidat = esRespons.hits.hits.at(0)?._source;

                if (kandidat) {
                    setKandidat(kandidat);
                } else {
                    setFeilmelding('Fant ikke kandidat med fødselsnummer ' + fnr);
                }
            } catch (e) {
                setFeilmelding('Klarte ikke å hente kandidat');
            }
        };

        hentKandidat(fnr);
    }, [fnr]);

    if (kandidat === undefined || kandidatliste.kind !== Nettstatus.Suksess) return null;

    const kandidatenLiggerILista = kandidatliste.data.kandidater.some(
        (kandidat) => kandidat.fodselsnr === fnr
    );

    return (
        <div className={css.banner}>
            <div className={css.innerBanner}>
                <h2>
                    <BodyShort>Finn stillinger til kandidat:</BodyShort>
                    <Heading size="medium" as="span">
                        {kandidat?.fornavn} {kandidat?.etternavn}
                    </Heading>
                    <ErrorMessage>{feilmelding}</ErrorMessage>
                </h2>
                <div className={css.knapper}>
                    <Button
                        aria-disabled={kandidatenLiggerILista}
                        disabled={kandidatenLiggerILista}
                        onClick={() => setVisModal(true)}
                        icon={<PersonCheckmarkIcon />}
                    >
                        Anbefal kandidat
                    </Button>
                    <Link
                        to={`/kandidater/lister/stilling/${kandidatliste.data.stillingId}/detaljer`}
                        className="navds-link"
                    >
                        <PersonGroupIcon />
                        Se kandidatliste
                    </Link>
                </div>
            </div>
            <AnbefalKandidatModal
                fnr={fnr}
                kandidat={kandidat}
                kandidatliste={kandidatliste.data}
                setKandidatliste={setKandidatliste}
                vis={visModal}
                onClose={() => setVisModal(false)}
            />
        </div>
    );
};

export default Kandidatbanner;
