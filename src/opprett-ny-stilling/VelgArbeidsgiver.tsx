import React, { FunctionComponent, useEffect, useState } from 'react';
import { Feilmelding, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Typeahead from '../common/typeahead/Typeahead';
import capitalizeEmployerName from '../ad/edit/employer/capitalizeEmployerName';
import capitalizeLocation from '../ad/edit/location/capitalizeLocation';
import Skjemalabel from '../ad/edit/skjemaetikett/Skjemalabel';
import { ikkeLastet, Nettressurs, Nettstatus } from '../api/Nettressurs';
import { fetchEmployerNameCompletionHits, fetchOrgnrSuggestions } from '../api/api';

type Props = {
    arbeidsgiver: Arbeidsgiverforslag | null;
    setArbeidsgiver: (verdi: Arbeidsgiverforslag | null) => void;
    arbeidsgiverfeilmelding: string | null;
    setArbeidsgiverfeilmelding: (verdi: string | null) => void;
};

export type EmployerState = {
    suggestions: Arbeidsgiverforslag[];
};

export type Arbeidsgiverforslag = {
    location?: Location;
    name: string;
    orgnr?: string;
};

type Location = {
    address: string;
    postalCode: string;
    city: string;
};

const VelgArbeidsgiver: FunctionComponent<Props> = ({
    arbeidsgiver,
    setArbeidsgiver,
    arbeidsgiverfeilmelding,
    setArbeidsgiverfeilmelding,
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
        setArbeidsgiverfeilmelding(null);
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
        } else {
            setArbeidsgiverfeilmelding('Kunne ikke å hente forslag');
        }
    };

    const location = arbeidsgiver ? arbeidsgiver.location : undefined;
    const harArbeidsgiver = arbeidsgiver && arbeidsgiver.name && arbeidsgiver.orgnr;

    return (
        <>
            <div className="EmployerName">
                <Normaltekst className="blokk-s">
                    <b>Obs!</b> For at arbeidsgiver skal få CV-er du sender må virksomhetsnummeret
                    du registrerer stillingen på samsvare med arbeidsgivers virksomhetsnummer.
                </Normaltekst>
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
                    className="EmployerName__typeahead"
                    value={input}
                    onBlur={onInputBlur}
                    onSelect={onForslagValgt}
                    onChange={onInputChange}
                    suggestions={konverterTilTypeaheadFormat(alleForslag)}
                    error={alleForslag.kind === Nettstatus.Feil || !harArbeidsgiver}
                />
                {arbeidsgiver && location && (
                    <Undertekst className="EmployerName__valgt-bedrift">
                        {capitalizeEmployerName(arbeidsgiver.name)}, {location.address},{' '}
                        {location.postalCode} {capitalizeLocation(location.city)},
                        Virksomhetsnummer: {arbeidsgiver.orgnr?.match(/.{1,3}/g)?.join(' ')}
                    </Undertekst>
                )}
                {!harArbeidsgiver && <Feilmelding>{arbeidsgiverfeilmelding}</Feilmelding>}
            </div>
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

const getEmployerSuggestionLabel = (forslag: Arbeidsgiverforslag) => {
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
