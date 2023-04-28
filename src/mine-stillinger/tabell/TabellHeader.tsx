import React, { FunctionComponent } from 'react';
import { Table } from '@navikt/ds-react';
import { MineStillingerSorteringsfelt } from '../MineStillingerSortering';

const TabellHeader: FunctionComponent = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeader
                    sortable
                    sortKey={MineStillingerSorteringsfelt.SistEndretTidspunkt}
                >
                    Sist endret
                </Table.ColumnHeader>
                <Table.ColumnHeader sortable sortKey={MineStillingerSorteringsfelt.Stillingstittel}>
                    Stillingstittel
                </Table.ColumnHeader>
                <Table.HeaderCell scope="col">
                    Annonse-
                    <br />
                    nummer
                </Table.HeaderCell>
                <Table.ColumnHeader sortable sortKey={MineStillingerSorteringsfelt.Arbeidsgiver}>
                    Arbeidsgiver
                </Table.ColumnHeader>
                <Table.ColumnHeader sortable sortKey={MineStillingerSorteringsfelt.Utløpsdato}>
                    Utløpsdato
                </Table.ColumnHeader>
                <Table.ColumnHeader sortable sortKey={MineStillingerSorteringsfelt.Publisert}>
                    Publisert
                </Table.ColumnHeader>
                <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                <Table.HeaderCell scope="col">Kandidatliste</Table.HeaderCell>
                <Table.HeaderCell scope="col">Rediger</Table.HeaderCell>
                <Table.HeaderCell scope="col">Meny</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
};

export default TabellHeader;
