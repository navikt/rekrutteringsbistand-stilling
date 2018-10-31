import React from 'react';
import './Result.less';

export default function ResultHeader() {
    return (
        <thead className="ResultHeader typo-element">
            <tr >
                <th className="ColWidth-se">Sist endret</th>
                <th className="ColWidth-st">Stillingstittel</th>
                <th className="ColWidth-a">Arbeidsgiver</th>
                <th className="ColWidth-p">Publisert</th>
                <th className="ColWidth-c">Kandidatliste</th>
                <th className="ColWidth-sta">Status</th>
                <th className="ColWidth-br">Rediger</th>
                <th className="ColWidth-bk">Kopier</th>
                <th className="ColWidth-bst">Stopp</th>
                <th className="ColWidth-bsl">Slett</th>
            </tr>
        </thead>
    );
}
