import React from 'react';
import './Result.less';

export default function ResultHeader() {
    return (
        <thead className="ResultHeader typo-element">
            <tr >
                <th className="Col-updated">Sist endret</th>
                <th className="Col-title">Stillingstittel</th>
                <th className="Col-employer">Arbeidsgiver</th>
                <th className="Col-privacy">Publisert</th>
                <th className="Col-candidate">Kandidatliste</th>
                <th className="Col-status">Status</th>
                <th className="Col-edit center">Rediger</th>
                <th className="Col-copy center">Kopier</th>
                <th className="Col-stop center">Stopp</th>
                <th className="Col-delete center">Slett</th>
            </tr>
        </thead>
    );
}
