import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, AddCircle, CoApplicant } from '@navikt/ds-icons';

import { State } from '../../redux/store';
import { sendGenerellEvent } from '../../verktøy/amplitude';
import { stillingenHarKandidatliste } from '../adUtils';
import LeggTilKandidatModal from '../legg-til-kandidat-modal/LeggTilKandidatModal';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import './Kandidathandlinger.less';

type Props = {
    kandidatliste: Nettressurs<Kandidatliste>;
};

const Kandidathandlinger: FunctionComponent<Props> = ({ kandidatliste }) => {
    const stillingsdata = useSelector((state: State) => state.adData);
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const [visLeggTilKandidatModal, setVisLeggTilKandidatModal] = useState(false);

    const onSeKandidatlisteClick = () => {
        sendGenerellEvent('knapp', {
            label: 'Se kandidater',
        });
    };

    const toggleLeggTilKandidatModal = () => {
        setVisLeggTilKandidatModal(!visLeggTilKandidatModal);
    };

    const visHandlingerKnyttetTilKandidatlisten = stillingenHarKandidatliste(
        stillingsinfo.eierNavident,
        stillingsdata.publishedByAdmin,
        stillingsdata.source
    );

    return (
        <div className="kandidathandlinger">
            {kandidatliste.kind === Nettstatus.Suksess && (
                <LeggTilKandidatModal
                    vis={visLeggTilKandidatModal}
                    onClose={toggleLeggTilKandidatModal}
                    kandidatliste={kandidatliste}
                />
            )}
            {visHandlingerKnyttetTilKandidatlisten && kandidatliste.kind === Nettstatus.Suksess && (
                <>
                    <Link
                        className="navds-link"
                        to={`/kandidatsok?kandidatliste=${kandidatliste.data.kandidatlisteId}&brukKriterierFraStillingen=true`}
                    >
                        <Search />
                        Finn kandidater
                    </Link>
                    <button
                        className="navds-link kandidathandlinger__legg-til-kandidat-knapp"
                        onClick={toggleLeggTilKandidatModal}
                    >
                        <AddCircle />
                        Legg til kandidat
                    </button>
                    <Link
                        className="navds-link"
                        to={`/kandidater/lister/stilling/${stillingsdata.uuid}/detaljer`}
                        onClick={onSeKandidatlisteClick}
                    >
                        <CoApplicant />
                        Se kandidatliste
                    </Link>
                </>
            )}
        </div>
    );
};

export default Kandidathandlinger;
