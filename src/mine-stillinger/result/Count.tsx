import React, { FunctionComponent } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { MineStillingerResultat } from '../mineStillingerReducer';

type Props = {
    resultat: Nettressurs<MineStillingerResultat>;
};

const Count: FunctionComponent<Props> = ({ resultat }) => {
    if (resultat.kind !== Nettstatus.Suksess) {
        return <Systemtittel>&nbsp;</Systemtittel>;
    }

    const antallStillinger = resultat.data.totalElements;
    let text = antallStillinger.toLocaleString('nb');

    if (antallStillinger === 1) {
        text += ' stilling';
    } else {
        text += ' stillinger';
    }

    return <Systemtittel>{text}</Systemtittel>;
};

export default Count;
