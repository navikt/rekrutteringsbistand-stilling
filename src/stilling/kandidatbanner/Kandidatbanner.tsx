import React, { useEffect, useState } from 'react';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { PersonCheckmarkIcon } from '@navikt/aksel-icons';
import css from './Kandidatbanner.module.css';
import { Nettressurs } from '../../api/Nettressurs';
import { Kandidat, Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import AnbefalKandidatModal from './AnbefalKandidatModal';
import kandidatliste from '../../mock/data/kandidatliste';

export const kandidatProxyUrl = '/kandidatsok-proxy';

type Props = {
    fnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
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

const Kandidatbanner = ({ fnr }: Props) => {
    const [kandidat, setKandidat] = useState<Kandidat>();
    const [feilmelding, setFeilmelding] = useState<string | undefined>();
    const [visModal, setVisModal] = useState<boolean>(false);

    console.log('Fødselsnummer', fnr);

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
                    console.log('Kandidat:', kandidat);
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
    if (kandidat === undefined) return null;
    return (
        <div className={css.banner}>
            <div className={css.innerBanner}>
                <h2>
                    <BodyShort>Finn stillinger til kandidat:</BodyShort>
                    <Heading size="medium" as="span">
                        {kandidat?.fornavn} {kandidat?.etternavn}
                    </Heading>
                </h2>
                <Button onClick={() => setVisModal(true)} icon={<PersonCheckmarkIcon />}>
                    Anbefal kandidat
                </Button>
            </div>
            <AnbefalKandidatModal
                fnr={fnr}
                kandidat={kandidat}
                kandidatliste={kandidatliste}
                vis={visModal}
                onClose={() => setVisModal(false)}
            />
        </div>
    );
};

export default Kandidatbanner;
