import React from 'react';
import './Result.less';
import { HjelpetekstUnderVenstre } from 'nav-frontend-hjelpetekst';

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
                <th className="Col-help">
                    <HjelpetekstUnderVenstre id="hjelpetekst-result-header">
                        <strong>Rediger</strong> - Du kan redigere alle stillinger.
                        <br />
                        <br />
                        <strong>Kopier</strong> - Du kan kopiere alle stillinger.
                        <br />
                        <br />
                        <strong>Stopp</strong> - Du kan stoppe en publisert stilling. Stopper du stillingen vil den
                        ikke være tilgjengelig for søk.
                        <br />
                        <br />
                        <strong>Slett</strong> - Du kan slette en stilling som ikke er eller har vært
                        publisert. Stillinger som er slettet vises ikke i løsningen.
                    </HjelpetekstUnderVenstre>
                </th>
            </tr>
        </thead>
    );
}
