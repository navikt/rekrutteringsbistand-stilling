import React, { useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@navikt/ds-react';
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

    const onSeKandidatlisteClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const amplitudeEventData = {
            label: 'Se kandidater',
        };

        sendGenerellEvent('knapp', amplitudeEventData, () => {
            window.location.href = event.currentTarget.href;
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
                    <Link href={`/kandidater/stilling/${stillingsdata.uuid}`}>
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
                        <Link href={`/prototype/stilling/${stillingsdata.uuid}`}>
                            <AutomaticSystem />
                            Foreslå kandidater
                        </Link>
                    )}
                    <Link
                        onClick={onSeKandidatlisteClick}
                        href={`/kandidater/lister/stilling/${stillingsdata.uuid}/detaljer`}
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
