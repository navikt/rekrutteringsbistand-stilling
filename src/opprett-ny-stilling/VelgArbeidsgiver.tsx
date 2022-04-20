import React, { FunctionComponent, useEffect, useState } from 'react';
import { Feilmelding, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Typeahead from '../common/typeahead/Typeahead';
import capitalizeEmployerName from '../ad/edit/endre-arbeidsgiver/capitalizeEmployerName';
import capitalizeLocation from '../ad/edit/location/capitalizeLocation';
import Skjemalabel from '../ad/edit/skjemaetikett/Skjemalabel';
import { ikkeLastet, Nettressurs, Nettstatus } from '../api/Nettressurs';
import { fetchEmployerNameCompletionHits, fetchOrgnrSuggestions } from '../api/api';
import { Arbeidsgiver } from '../Stilling';

type Props = {
    arbeidsgiver: Arbeidsgiverforslag | null;
    setArbeidsgiver: (verdi: Arbeidsgiverforslag | null) => void;
    feilmelding: string | null;
    setFeilmelding: (verdi: string | null) => void;
};

export type EmployerState = {
    suggestions: Arbeidsgiverforslag[];
};

export type Arbeidsgiverforslag = {
    location?: Location;
    name: string;
    orgnr?: string;
};

export type Location = {
    address: string;
    postalCode: string;
    city: string;
};

const VelgArbeidsgiver: FunctionComponent<Props> = ({
    arbeidsgiver,
    setArbeidsgiver,
    feilmelding,
    setFeilmelding,
}) => {
    const [input, setInput] = useState<string>('');
    const [alleForslag, setAlleForslag] = useState<Nettressurs<Arbeidsgiverforslag[]>>(
        ikkeLastet()
    );

    useEffect(() => {
        const hentArbeidsgiversForslag = async (navn: string) => {
            setAlleForslag({
                kind: Nettstatus.LasterInn,
            });

            let response: Arbeidsgiverforslag[] | null = null;

            try {
                if (erOrgnummer(navn)) {
                    response = await fetchOrgnrSuggestions(navn);
                } else {
                    response = await fetchEmployerNameCompletionHits(navn);
                }

                setAlleForslag({
                    kind: Nettstatus.Suksess,
                    data: response,
                });
            } catch (e) {
                setAlleForslag({
                    kind: Nettstatus.Feil,
                    error: e,
                });
            }
        };

        if (input.length > 2) {
            hentArbeidsgiversForslag(input);
        }
    }, [input]);

    const onInputChange = (value: string) => {
        setFeilmelding(null);
        setInput(value);
    };

    const onInputBlur = (value: string) => {
        if (value.length === 0) {
            setArbeidsgiver(null);
        }
    };

    const onForslagValgt = (valgtForslag: any) => {
        if (alleForslag.kind === Nettstatus.Suksess) {
            if (valgtForslag) {
                const found = finnArbeidsgiver(alleForslag.data, valgtForslag.value);

                setArbeidsgiver(found || null);
                setInput(capitalizeEmployerName(found ? found.name : null) || '');
            } else {
                setArbeidsgiver(null);
            }
        }
    };

    const feilmeldingTilBruker =
        feilmelding || (alleForslag.kind === Nettstatus.Feil && alleForslag.error.message);

    return (
        <>
            <Skjemalabel
                påkrevd
                inputId="endre-stilling-bedriftens-navn"
                beskrivelse="Skriv inn arbeidsgivernavn eller virksomhetsnummer"
            >
                Bedriftens navn hentet fra Enhetsregisteret
            </Skjemalabel>
            <Typeahead
                id="endre-stilling-bedriftens-navn"
                aria-describedby="endre-stilling-bedriftens-navn-beskrivelse"
                className="opprett-ny-stilling__velg-arbeidsgiver-input"
                value={input}
                onBlur={onInputBlur}
                onSelect={onForslagValgt}
                onChange={onInputChange}
                suggestions={konverterTilTypeaheadFormat(alleForslag)}
                error={!!feilmeldingTilBruker}
            />
            {arbeidsgiver && (
                <Undertekst className="opprett-ny-stilling__valgt-arbeidsgiver">
                    {formaterDataFraEnhetsregisteret(arbeidsgiver)}
                </Undertekst>
            )}
            {feilmeldingTilBruker && <Feilmelding>{feilmeldingTilBruker}</Feilmelding>}
            <Normaltekst className="opprett-ny-stilling__arbeidsgiver-advarsel">
                <b>Obs!</b> For at arbeidsgiver skal få CV-er du sender må virksomhetsnummeret du
                registrerer stillingen på samsvare med arbeidsgivers virksomhetsnummer.
            </Normaltekst>
        </>
    );
};

const erOrgnummer = (input: string) => {
    return input.match(/^\s*[0-9][0-9\s]*$/) !== null;
};

const konverterTilTypeaheadFormat = (alleForslag: Nettressurs<Arbeidsgiverforslag[]>) => {
    if (alleForslag.kind === Nettstatus.Suksess) {
        return alleForslag.data.map((f) => ({
            value: f.orgnr,
            label: getEmployerSuggestionLabel(f),
        }));
    } else {
        return [];
    }
};

export const formaterDataFraEnhetsregisteret = (
    arbeidsgiver: Arbeidsgiverforslag | Arbeidsgiver
) => {
    const location = arbeidsgiver.location;
    const navn = capitalizeEmployerName(arbeidsgiver.name);
    const virksomhetsnummer = arbeidsgiver.orgnr?.match(/.{1,3}/g)?.join(' ');
    if (!location) return navn;
    return `${navn}, ${location.address}, ${location.postalCode} ${capitalizeLocation(
        location.city
    )}, Virksomhetsnummer: ${virksomhetsnummer}`;
};

export const getEmployerSuggestionLabel = (forslag: Arbeidsgiverforslag) => {
    let commaSeparate: string[] = [];
    if (forslag.location) {
        if (forslag.location.address) {
            commaSeparate = [...commaSeparate, forslag.location.address];
        }
        if (forslag.location.postalCode) {
            commaSeparate = [...commaSeparate, forslag.location.postalCode];
        }
        if (forslag.location.city) {
            commaSeparate = [...commaSeparate, capitalizeLocation(forslag.location.city)];
        }
    }
    if (forslag.orgnr) {
        const groupedOrgNumber = forslag.orgnr.match(/.{1,3}/g)?.join(' ');
        commaSeparate = [...commaSeparate, `Virksomhetsnummer: ${groupedOrgNumber}`];
    }
    return (
        <div className="Employer__typeahead__item">
            <Normaltekst>{capitalizeEmployerName(forslag.name)}</Normaltekst>
            <Undertekst>{commaSeparate.join(', ')}</Undertekst>
        </div>
    );
};

const finnArbeidsgiver = (alleForslag: Arbeidsgiverforslag[], navn: string) =>
    alleForslag.find(
        (forslag: Arbeidsgiverforslag) =>
            forslag.name.toLowerCase() === navn.toLowerCase() ||
            forslag.orgnr === navn.replace(/\s/g, '')
    );

export default VelgArbeidsgiver;
