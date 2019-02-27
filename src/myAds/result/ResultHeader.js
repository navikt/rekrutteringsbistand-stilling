import React from 'react';
import './Result.less';

export default function ResultHeader() {
    return (
        <thead className="ResultHeader typo-element">
            <tr >
                <th className="Col-updated">Sist endret</th>
                <th className="Col-title">Stillingstittel</th>
                <th className="Col-id">
                    Annonse-
                    <br />
                    nummer
                </th>
                <th className="Col-employer">Arbeidsgiver</th>
                <th className="Col-expires">Søknadsfrist</th>
                <th className="Col-privacy">Publisert</th>
                <th className="Col-status">Status</th>
                <th className="Col-candidate">Kandidatliste</th>
                <th className="Col-edit center">Rediger</th>
                <th className="Col-menu center">Meny</th>
            </tr>
        </thead>
    );
}
