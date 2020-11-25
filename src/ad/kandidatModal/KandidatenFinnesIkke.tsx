import React, { FunctionComponent } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

const KandidatenFinnesIkke: FunctionComponent = () => {
    return (
        <>
            <div className="LeggTilKandidat__feilmelding">
                <div className="blokk-xxs">Du kan ikke legge til kandidaten.</div>
                <div>Mulige årsaker:</div>
                <ul>
                    <li>Fødselsnummeret er feil</li>
                    <li>Kandidaten har ikke jobbprofil</li>
                    <li>Kandidaten har ikke CV</li>
                    <li>Kandidaten har ikke lest hjemmel i ny CV-løsning</li>
                    <li>Kandidaten har "Nei nav.no" i Formidlingsinformasjon i Arena</li>
                    <li>Kandidaten har personforhold "Fritatt for kandidatsøk" i Arena</li>
                    <li>Kandidaten er sperret "Egen ansatt"</li>
                </ul>
            </div>
            <div className="LeggTilKandidat__info">
                <AlertStripeInfo>
                    Ønsker du å registrere utfall på en kandidat som ikke er synlig i
                    Rekrutteringsbistand? Gå til kandidatlisten og velg «Legg til kandidat».
                </AlertStripeInfo>
            </div>
        </>
    );
};

export default KandidatenFinnesIkke;
