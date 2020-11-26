import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Input, Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './StillingSøkeboks.less';
import { Fields, RESET_SEARCH, SEARCH, SET_SEARCH_FIELD, SET_SEARCH_VALUE } from '../searchReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';

const StillingSøkeboks: FunctionComponent = () => {
    const dispatch = useDispatch();
    const søkestring = useSelector((state: any) => state.search.value);
    const valgtKategori = useSelector((state: any) => state.search.field);

    const onSøkestringChanged = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: SET_SEARCH_VALUE, value: e.target.value });

    const onRadioButtonChanged = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: SET_SEARCH_FIELD, field: e.target.value });
    };

    const onSøk = () => {
        dispatch({ type: SEARCH });
    };

    const onNullstillSøk = () => {
        dispatch({ type: RESET_SEARCH });
    };

    return (
        <>
            <div className="Søkeboks">
                <div className="Søkeboks__input">
                    <Undertittel>Søk etter tittel, arbeidsgiver eller annonsenummer</Undertittel>
                    <div className="Søkeboks__input-wrapper">
                        <Input
                            name="søkeboks-stilling"
                            id="SearchPageSearchBox"
                            onChange={onSøkestringChanged}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') onSøk();
                            }}
                            value={søkestring}
                            className="Søkeboks__input"
                            aria-label={'Søk etter LEGG INN LOGIKK'}
                        />
                        <Søkeknapp type="flat" className="Søkeboks__søkeknapp" onClick={onSøk}>
                            Søk
                        </Søkeknapp>
                    </div>
                </div>
                <RadioGruppe className="Søkeboks__radio-gruppe" aria-controls="SearchPageSearchBox">
                    <Radio
                        className="Søkeboks__radio-knapp"
                        label="Annonsetittel"
                        name="søkekategori"
                        value={Fields.TITLE}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.TITLE}
                    />
                    <Radio
                        className="Søkeboks__radio-knapp"
                        label="Arbeidsgiver"
                        name="søkekategori"
                        value={Fields.EMPLOYER_NAME}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.EMPLOYER_NAME}
                    />
                    <Radio
                        className="Søkeboks__radio-knapp"
                        label="Annonsenummer"
                        name="søkekategori"
                        value={Fields.ID}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.ID}
                    />
                </RadioGruppe>
            </div>
            <Flatknapp mini onClick={onNullstillSøk} className="SearchPage__SearchBox__resetButton">
                Nullstill søk
            </Flatknapp>
        </>
    );
};

export default StillingSøkeboks;
