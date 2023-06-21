import React, { useState } from 'react';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import AnbefalKandidatModal from './AnbefalKandidatModal';
import Kandidatbanner from '../kandidatbanner/Kandidatbanner';
import useKandidat from './useKandidat';
import Kandidatlistehandlinger from './Kandidatlistehandlinger';

type Props = {
    fnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
};

const KontekstAvKandidat = ({ fnr, kandidatliste, setKandidatliste }: Props) => {
    const { kandidat } = useKandidat(fnr);
    const [visModal, setVisModal] = useState<boolean>(false);

    return (
        <>
            <Kandidatbanner kandidat={kandidat} brødsmulesti={[]}>
                <Kandidatlistehandlinger
                    fnr={fnr}
                    kandidatliste={kandidatliste}
                    onAnbefalClick={() => {
                        setVisModal(true);
                    }}
                />
            </Kandidatbanner>
            {kandidat && kandidatliste.kind === Nettstatus.Suksess && (
                <AnbefalKandidatModal
                    fnr={fnr}
                    kandidat={kandidat}
                    kandidatliste={kandidatliste.data}
                    setKandidatliste={setKandidatliste}
                    onClose={() => setVisModal(false)}
                    vis={visModal}
                />
            )}
        </>
    );
};

export default KontekstAvKandidat;
