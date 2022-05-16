import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MineStillingerActionType } from '../MineStillingerAction';
import { State } from '../../redux/store';
import useSorting from './useSorting';
import './Result.less';
import './Sort.less';

const ResultHeader: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { sortDir, sortField } = useSelector((state: State) => state.mineStillinger);

    const changeSorting = (field: string, dir: string) =>
        dispatch({ type: MineStillingerActionType.ChangeMyAdsSorting, field, dir });

    const [sort, toggleSorting, className] = useSorting(
        { field: sortField, dir: sortDir },
        changeSorting
    );

    return (
        <thead className="ResultHeader typo-element">
            <tr>
                <th className="Col-updated">
                    <button
                        className={`Sort__button ${
                            sort.field === 'updated' ? className : 'Sort-unsorted'
                        }`}
                        onClick={() => toggleSorting('updated')}
                    >
                        <span className="Sort__text">Sist endret</span>
                    </button>
                </th>
                <th className="Col-title ">
                    <button
                        className={`Sort__button ${
                            sort.field === 'title' ? className : 'Sort-unsorted'
                        }`}
                        onClick={() => toggleSorting('title')}
                    >
                        <span className="Sort__text">Stillingstittel</span>
                    </button>
                </th>
                <th className="Col-id">
                    Annonse-
                    <br />
                    nummer
                </th>
                <th className="Col-employer">
                    <button
                        className={`Sort__button ${
                            sort.field === 'employerName' ? className : 'Sort-unsorted'
                        }`}
                        onClick={() => toggleSorting('employerName')}
                    >
                        <span className="Sort__text">Arbeidsgiver</span>
                    </button>
                </th>
                <th className="Col-expires">
                    <button
                        className={`Sort__button ${
                            sort.field === 'expires' ? className : 'Sort-unsorted'
                        }`}
                        onClick={() => toggleSorting('expires')}
                    >
                        <span className="Sort__text">Utløpsdato</span>
                    </button>
                </th>
                <th className="Col-privacy">
                    <button
                        className={`Sort__button ${
                            sort.field === 'privacy' ? className : 'Sort-unsorted'
                        }`}
                        onClick={() => toggleSorting('privacy')}
                    >
                        <span className="Sort__text">Publisert</span>
                    </button>
                </th>
                <th className="Col-status">Status</th>
                <th className="Col-candidate">Kandidatliste</th>
                <th className="Col-edit center">Rediger</th>
                <th className="Col-menu center">Meny</th>
            </tr>
        </thead>
    );
};

export default ResultHeader;
