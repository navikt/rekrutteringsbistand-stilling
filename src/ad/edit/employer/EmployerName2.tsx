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
    arbeidsgiver: string | null;
    setArbeidsgiver: (verdi: string | null) => void;
    arbeidsgiverTypeaheadVerdi: string | null;
    setArbeidsgiverTypeaheadVerdi: (verdi: string | null) => void;
};

export type EmployerState = {
    suggestions: Suggestion[];
};

type Suggestion = {
    location: Location;
    name: string;
    orgnr: string;
};

type Location = {
    address: string;
};

const EmployerName2: FunctionComponent<Props> = ({
    arbeidsgiver,
    setArbeidsgiver,
    arbeidsgiverTypeaheadVerdi,
    setArbeidsgiverTypeaheadVerdi,
}) => {
    const dispatch = useDispatch();

    const suggestions = useSelector((state: State) => state.employer.suggestions);

    const onTypeAheadValueChange = (value) => {
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
            setArbeidsgiverTypeaheadVerdi(capitalizeEmployerName(found.name));
        } else {
            setArbeidsgiver(null);
        }
    };

    const getEmployerSuggestionLabel = (suggestion) => {
        let commaSeparate = [];
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
            (employer) =>
                employer.name.toLowerCase() === value.toLowerCase() ||
                employer.orgnr === value.replace(/\s/g, '')
        );

    return (
        <>
            const location = employer ? employer.location : undefined; return (
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
                    ref={(instance) => {
                        this.inputRef = instance;
                    }}
                    error={this.props.validation.employer !== undefined}
                />
                {employer && location && (
                    <Undertekst className="EmployerName__valgt-bedrift">
                        {capitalizeEmployerName(employer.name)}, {location.address},{' '}
                        {location.postalCode} {capitalizeLocation(location.city)},
                        Virksomhetsnummer: {employer.orgnr.match(/.{1,3}/g).join(' ')}
                    </Undertekst>
                )}
                {this.props.validation.employer && (
                    <Feilmelding>{this.props.validation.employer}</Feilmelding>
                )}
            </div>
            );
        </>
    );
};

export default EmployerName2;
