import { Feilmelding, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { State } from '../../../reduxStore';
import capitalizeLocation from '../location/capitalizeLocation';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import capitalizeEmployerName from './capitalizeEmployerName';
import { FETCH_EMPLOYER_SUGGESTIONS } from './employerReducer';

type Props = {
    arbeidsgiver: Arbeidsgiverforslag | null;
    setArbeidsgiver: (verdi: Arbeidsgiverforslag | null) => void;
    arbeidsgiverTypeaheadVerdi: string | null;
    setArbeidsgiverTypeaheadVerdi: (verdi: string) => void;
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
    arbeidsgiverTypeaheadVerdi,
    setArbeidsgiverTypeaheadVerdi,
}) => {
    const dispatch = useDispatch();

    const suggestions = useSelector((state: State) => state.employer.suggestions);

    const onTypeAheadValueChange = (value) => {
        console.log('onTypeAheadValueChange', value);
        setArbeidsgiverTypeaheadVerdi(value);
        dispatch({ type: FETCH_EMPLOYER_SUGGESTIONS });
    };

    const onTypeAheadValueBlur = (value) => {
        if (value.length === 0) {
            setArbeidsgiver(null);
        }
    };

    const onTypeAheadSuggestionSelected = (employer) => {
        if (employer) {
            const found = lookUpEmployer(employer.value);
            setArbeidsgiver(found || null);
            setArbeidsgiverTypeaheadVerdi(capitalizeEmployerName(found ? found.name : null) || '');
        } else {
            setArbeidsgiver(null);
        }
    };

    const getEmployerSuggestionLabel = (suggestion) => {
        let commaSeparate: string[] = [];
        if (suggestion.location) {
            if (suggestion.location.address) {
                commaSeparate = [...commaSeparate, suggestion.location.address];
            }
            if (suggestion.location.postalCode) {
                commaSeparate = [...commaSeparate, suggestion.location.postalCode];
            }
            if (suggestion.location.city) {
                commaSeparate = [...commaSeparate, capitalizeLocation(suggestion.location.city)];
            }
        }
        if (suggestion.orgnr) {
            const groupedOrgNumber = suggestion.orgnr.match(/.{1,3}/g).join(' ');
            commaSeparate = [...commaSeparate, `Virksomhetsnummer: ${groupedOrgNumber}`];
        }
        return (
            <div className="Employer__typeahead__item">
                <Normaltekst>{capitalizeEmployerName(suggestion.name)}</Normaltekst>
                <Undertekst>{commaSeparate.join(', ')}</Undertekst>
            </div>
        );
    };

    const lookUpEmployer = (value) =>
        suggestions.find(
            (arbeidsgiver) =>
                arbeidsgiver.name.toLowerCase() === value.toLowerCase() ||
                arbeidsgiver.orgnr === value.replace(/\s/g, '')
        );

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
                    value={arbeidsgiverTypeaheadVerdi}
                    onBlur={onTypeAheadValueBlur}
                    onSelect={onTypeAheadSuggestionSelected}
                    onChange={onTypeAheadValueChange}
                    suggestions={suggestions.map((suggestion) => ({
                        value: suggestion.orgnr,
                        label: getEmployerSuggestionLabel(suggestion),
                    }))}
                    /*ref={(instance) => {
                        //this.inputRef = instance;
                    }}*/
                    error={!arbeidsgiver || !arbeidsgiver.name || !arbeidsgiver.orgnr}
                />
                {arbeidsgiver && location && (
                    <Undertekst className="EmployerName__valgt-bedrift">
                        {capitalizeEmployerName(arbeidsgiver.name)}, {location.address},{' '}
                        {location.postalCode} {capitalizeLocation(location.city)},
                        Virksomhetsnummer: {arbeidsgiver.orgnr?.match(/.{1,3}/g)?.join(' ')}
                    </Undertekst>
                )}
                {!harArbeidsgiver && <Feilmelding>Bedriftens navn mangler</Feilmelding>}
            </div>
        </>
    );
};

export default VelgArbeidsgiver;
