import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, PersonPlusIcon, PersonGroupIcon } from '@navikt/aksel-icons';

import { State } from '../../redux/store';
import { sendGenerellEvent } from '../../verktøy/amplitude';
import { stillingenHarKandidatliste } from '../adUtils';
import LeggTilKandidatModal from '../legg-til-kandidat-modal/LeggTilKandidatModal';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import './Kandidathandlinger.less';
import Stilling from '../../Stilling';

type Props = {
    kandidatliste: Nettressurs<Kandidatliste>;
};

const Kandidathandlinger: FunctionComponent<Props> = ({ kandidatliste }) => {
    const stillingsdata = useSelector((state: State) => state.adData) as Stilling;
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

    const kandidatlisteId =
        kandidatliste.kind === Nettstatus.Suksess ? kandidatliste.data.kandidatlisteId : '';

    return (
        <div className="kandidathandlinger">
            <LeggTilKandidatModal
                vis={visLeggTilKandidatModal}
                onClose={toggleLeggTilKandidatModal}
                kandidatliste={kandidatliste}
            />
            {visHandlingerKnyttetTilKandidatlisten && (
                <>
                    <Link
                        className="navds-link"
                        to={`/kandidatsok?kandidatliste=${kandidatlisteId}&brukKriterierFraStillingen=true`}
                    >
                        <MagnifyingGlassIcon />
                        Finn kandidater
                    </Link>
                    <button
                        className="navds-link kandidathandlinger__legg-til-kandidat-knapp"
                        onClick={toggleLeggTilKandidatModal}
                    >
                        <PersonPlusIcon />
                        Legg til kandidat
                    </button>
                    <Link
                        className="navds-link"
                        to={`/kandidater/lister/stilling/${stillingsdata.uuid}/detaljer`}
                        onClick={onSeKandidatlisteClick}
                    >
                        <PersonGroupIcon />
                        Se kandidatliste
                    </Link>
                </>
            )}
        </div>
    );
};

export default Kandidathandlinger;
