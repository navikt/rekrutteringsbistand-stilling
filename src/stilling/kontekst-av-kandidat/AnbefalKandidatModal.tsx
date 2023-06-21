import React from 'react';
import { Kandidat, Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import Modal from '../../common/modal/Modal';
import BekreftMedNotat from '../legg-til-kandidat-modal/BekreftMedNotat';
import { Heading } from '@navikt/ds-react';
import { Nettressurs } from '../../api/Nettressurs';

type Props = {
    fnr: string;
    kandidat: Kandidat;
    kandidatliste: Kandidatliste;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    vis: boolean;
    onClose: () => void;
};

const AnbefalKandidatModal = ({
    fnr,
    kandidat,
    kandidatliste,
    setKandidatliste,
    vis,
    onClose,
}: Props) => {
    return (
        <Modal open={vis} onClose={onClose}>
            <Heading level="2" size="medium">
                Anbefal kandidat
            </Heading>
            <BekreftMedNotat
                erAnbefaling
                fnr={fnr}
                kandidat={kandidat}
                kandidatliste={kandidatliste}
                setKandidatliste={setKandidatliste}
                onClose={onClose}
            />
        </Modal>
    );
};

export default AnbefalKandidatModal;
