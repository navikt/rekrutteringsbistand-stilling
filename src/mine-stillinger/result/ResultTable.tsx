import React, { FunctionComponent } from 'react';
import css from '../MineStillinger.module.css';
import ResultHeader from './ResultHeader';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { ErrorMessage } from '@navikt/ds-react';
import ResultItem from './ResultItem';
import { MineStillingerResultat } from '../mineStillingerReducer';

type Props = {
    resultat: Nettressurs<MineStillingerResultat>;
    page: number;
};

const ResultTable: FunctionComponent<Props> = ({ resultat, page }) => {
    return (
        <div className={css.tabell}>
            <table className="Result__table">
                <ResultHeader />
                <tbody>
                    {resultat.kind === Nettstatus.Feil && (
                        <ErrorMessage className={css.feilmelding}>
                            Klarte ikke hente mine stillinger
                        </ErrorMessage>
                    )}
                    {resultat.kind === Nettstatus.Suksess &&
                        resultat.data.content.map((rekrutteringsbistandstilling) => (
                            <ResultItem
                                key={rekrutteringsbistandstilling.stilling.uuid}
                                rekrutteringsbistandstilling={rekrutteringsbistandstilling}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
