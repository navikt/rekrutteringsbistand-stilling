import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { useDispatch } from 'react-redux';
import LeggTilEllerAvbryt from './LeggTilEllerAvbryt';
import { sendEvent } from '../../amplitude';
import { Kandidat, Kandidatliste } from './kandidatlistetyper';
import { ikkeLastet, Nettressurs, Nettstatus, senderInn } from '../../api/Nettressurs';
import { postKandidaterTilKandidatliste } from './kandidatApi';
import { KandidatOutboundDto } from './LeggTilKandidatModal';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';

const MAKS_NOTATLENGDE = 2000;

const BekreftMedNotat: FunctionComponent<{
    fnr: string;
    kandidat: Kandidat;
    kandidatliste: Kandidatliste;
    onClose: () => void;
}> = ({ fnr, kandidat, kandidatliste, onClose }) => {
    const dispatch = useDispatch();
    const [notat, setNotat] = useState<string>('');
    const [leggTilKandidat, setLeggTilKandidat] = useState<Nettressurs<Kandidatliste>>(
        ikkeLastet()
    );

    const onNotatChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNotat(event.target.value);
    };

    const onLeggTilKandidat = async () => {
        setLeggTilKandidat(senderInn());

        sendEvent('legg_til_kandidat', 'klikk', {
            app: 'kandidat',
        });

        const dto: KandidatOutboundDto[] = [
            {
                kandidatnr: kandidat.arenaKandidatnr,
                notat,
            },
        ];

        const respons = await postKandidaterTilKandidatliste(kandidatliste.kandidatlisteId, dto);
        setLeggTilKandidat(respons);

        if (respons.kind === Nettstatus.Suksess) {
            onClose();
            varsleKandidatlisteOmNyKandidat();
        }
    };

    const varsleKandidatlisteOmNyKandidat = () => {
        dispatch<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold: `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${fnr}) er lagt til`,
        });
    };

    return (
        <>
            <Normaltekst className="blokk-s">{`${kandidat.fornavn} ${kandidat.etternavn} (${fnr})`}</Normaltekst>
            <Textarea
                id="legg-til-kandidat-notat-input"
                value={notat}
                label="Notat om kandidaten"
                textareaClass="LeggTilKandidatModal__notat"
                description="Du skal ikke skrive sensitive opplysninger her. Notatet er synlig for alle veiledere."
                placeholder="Skriv inn en kort tekst om hvorfor kandidaten passer til stillingen"
                maxLength={MAKS_NOTATLENGDE}
                onChange={onNotatChange}
            />
            <LeggTilEllerAvbryt
                onLeggTilClick={onLeggTilKandidat}
                onAvbrytClick={onClose}
                leggTilSpinner={leggTilKandidat.kind === Nettstatus.SenderInn}
                leggTilDisabled={
                    leggTilKandidat.kind === Nettstatus.SenderInn ||
                    (!!notat && notat.length > MAKS_NOTATLENGDE)
                }
                avbrytDisabled={leggTilKandidat.kind === Nettstatus.SenderInn}
            />
            {leggTilKandidat.kind === Nettstatus.Feil && (
                <Feilmelding>Klarte ikke å legge til kandidat</Feilmelding>
            )}
        </>
    );
};

export default BekreftMedNotat;
