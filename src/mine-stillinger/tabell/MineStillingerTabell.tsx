import React, { FunctionComponent } from 'react';
import { Nettressurs } from '../../api/Nettressurs';
import { SortState, Table } from '@navikt/ds-react';
import { MineStillingerResultat } from '../mineStillingerReducer';
import { nesteSorteringsretning, Retning } from './Retning';
import { MineStillingerActionType } from '../MineStillingerAction';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { MineStillingerSorteringsfelt } from '../MineStillingerSortering';
import classNames from 'classnames';
import TabellHeader from './TabellHeader';
import TabellBody from './TabellBody';
import css from './MineStillingerTabell.module.css';

type Props = {
    resultat: Nettressurs<MineStillingerResultat>;
    className?: string;
};

const MineStillingerTabell: FunctionComponent<Props> = ({ resultat, className }) => {
    const dispatch = useDispatch();

    const aktivtSorteringsfelt = useSelector((state: State) => state.mineStillinger.sortField);

    const aktivRetning = useSelector((state: State) => state.mineStillinger.sortDir);

    const onSortChange = (sorteringsfelt: MineStillingerSorteringsfelt) => {
        const sorteringPåNyttFelt = aktivtSorteringsfelt !== sorteringsfelt;
        const nyRetning = sorteringPåNyttFelt
            ? Retning.Stigende
            : nesteSorteringsretning(aktivRetning);

        const nyttFelt = nyRetning === null ? null : sorteringsfelt;

        dispatch({
            type: MineStillingerActionType.ChangeMyAdsSorting,
            sortering: { sortField: nyttFelt, sortDirection: nyRetning },
        });
    };

    const sort = aktivtSorteringsfelt
        ? {
              orderBy: aktivtSorteringsfelt,
              direction: aktivRetning === Retning.Stigende ? 'ascending' : 'descending',
          }
        : undefined;

    return (
        <Table
            zebraStripes
            size="medium"
            sort={sort as SortState}
            onSortChange={onSortChange}
            className={classNames(css.tabell, className)}
        >
            <TabellHeader />
            <TabellBody resultat={resultat} />
        </Table>
    );
};

export default MineStillingerTabell;
