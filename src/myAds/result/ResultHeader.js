import React from 'react';
import './Result.less';

export default function ResultHeader() {
    return (
        <thead className="ResultHeader typo-element">
            <tr >
                <th className="ColWidth-updated">Sist endret</th>
                <th className="ColWidth-title">Stillingstittel</th>
                <th className="ColWidth-employer">Arbeidsgiver</th>
                <th className="ColWidth-privacy">Publisert</th>
                <th className="ColWidth-candidate">Kandidatliste</th>
                <th className="ColWidth-status">Status</th>
                <th className="ColWidth-edit center">Rediger</th>
                <th className="ColWidth-copy center">Kopier</th>
                <th className="ColWidth-stop center">Stopp</th>
                <th className="ColWidth-delete center">Slett</th>
            </tr>
        </thead>
    );
}
