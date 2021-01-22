import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Select, Textarea } from 'nav-frontend-skjema';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { fetchPost } from '../api/api';
import './Stillingssøk.less';

const stillingsøkProxy = '/rekrutteringsbistand-stilling/stillingssok-proxy';

type Resultat = {
    took: number;
    timed_out: boolean;
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: number;
        hits: Array<Hit>;
    };
};

type Hit = {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: any;
};

const defaultQuery = {
    query: {
        match_all: {},
    },
};

const tittelQuery = {
    query: { match: { 'stilling.title': { query: 'Tittel' } } },
};

const Stillingssøk: FunctionComponent = () => {
    const [resultat, setResultat] = useState<Resultat>();
    const [query, setQuery] = useState<object>(defaultQuery);
    const [input, setInput] = useState<string>(formaterJson(query));
    const [feil, setFeil] = useState<string | null>(null);

    useEffect(() => {
        console.log('Query:', formaterJson(query));
        const hentStillinger = async () => {
            try {
                setResultat(await fetchPost(`${stillingsøkProxy}/_search`, query));
            } catch (e) {
                console.log('Klarte ikke å hente stillinger');
            }
        };

        hentStillinger();
    }, [query]);

    const onQueryChange = (newInput: string) => {
        setInput(newInput);

        try {
            const inputQuery = JSON.parse(newInput);
            setQuery(inputQuery);
            setFeil(null);
        } catch (e) {
            setFeil('Søket er ugyldig');
        }
    };

    const onQuerySelect = (event: ChangeEvent<HTMLSelectElement>) => {
        onQueryChange(event.target.value);
    };

    const stillinger = resultat?.hits.hits;

    return (
        <div className="stillingssøk">
            <Sidetittel className="blokk-m">Nytt stillingssøk</Sidetittel>
            <Select label="Velg en query" onChange={onQuerySelect}>
                <option value={formaterJson(defaultQuery)}>Søk alle stillinger</option>
                <option value={formaterJson(tittelQuery)}>Søk på tittel</option>
            </Select>

            <div className="blokk-m">
                <Textarea
                    value={input}
                    label="Søk på stillinger"
                    onChange={(e) => onQueryChange(e.target.value)}
                    feil={feil}
                ></Textarea>
            </div>

            <Element>Resultater</Element>
            {stillinger ? (
                <ul>
                    {stillinger.map((stilling) => (
                        <Normaltekst tag="li">{stilling._source.stilling.title}</Normaltekst>
                    ))}
                </ul>
            ) : (
                <Normaltekst>Ingen stillinger</Normaltekst>
            )}
        </div>
    );
};

const formaterJson = (json: Object) => JSON.stringify(json, null, 4);

export default Stillingssøk;
