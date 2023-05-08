import React, { FunctionComponent } from 'react';
import { ErrorMessage, Table } from '@navikt/ds-react';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import css from '../MineStillinger.module.css';
import { MineStillingerResultat } from '../mineStillingerReducer';
import TabellRad from './TabellRad';

type Props = {
    resultat: Nettressurs<MineStillingerResultat>;
};

const TabellBody: FunctionComponent<Props> = ({ resultat }) => {
    return (
        <Table.Body>
            {resultat.kind === Nettstatus.Feil && (
                <ErrorMessage className={css.feilmelding}>
                    Klarte ikke hente mine stillinger
                </ErrorMessage>
            )}
            {resultat.kind === Nettstatus.Suksess &&
                resultat.data.content.map((rekrutteringsbistandstilling) => (
                    <TabellRad
                        key={rekrutteringsbistandstilling.stilling.uuid}
                        rekrutteringsbistandstilling={rekrutteringsbistandstilling}
                    />
                ))}
        </Table.Body>
    );
};

export default TabellBody;
