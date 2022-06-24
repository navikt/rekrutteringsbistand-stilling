import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, AddCircle, AutomaticSystem, CoApplicant } from '@navikt/ds-icons';

import { State } from '../../redux/store';
import { sendGenerellEvent } from '../../verktøy/amplitude';
import { stillingenHarKandidatliste } from '../adUtils';
import LeggTilKandidatModal from '../legg-til-kandidat-modal/LeggTilKandidatModal';
import { useVisForeslåKandidaterLenke } from './useVisForeslåKandidaterLenke';
import './Kandidathandlinger.less';

const Kandidathandlinger = () => {
    const stillingsdata = useSelector((state: State) => state.adData);
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);
    const [visLeggTilKandidatModal, setVisLeggTilKandidatModal] = useState(false);
    const visForeslåKandidaterLenke = useVisForeslåKandidaterLenke();

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
            {stillingsdata.uuid && (
                <LeggTilKandidatModal
                    vis={visLeggTilKandidatModal}
                    onClose={toggleLeggTilKandidatModal}
                    stillingsId={stillingsdata.uuid}
                />
            )}
            {visHandlingerKnyttetTilKandidatlisten && (
                <>
                    <Link className="navds-lenke" to={`/kandidater/stilling/${stillingsdata.uuid}`}>
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
                    {visForeslåKandidaterLenke && (
                        <Link
                            className="navds-lenke"
                            to={`/prototype/stilling/${stillingsdata.uuid}`}
                        >
                            <AutomaticSystem />
                            Foreslå kandidater
                        </Link>
                    )}
                    <Link
                        className="navds-lenke"
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
