import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Input, Label, Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import './StillingSøkeboks.less';
import { Fields, RESET_SEARCH, SEARCH, SET_SEARCH_FIELD, SET_SEARCH_VALUE } from '../searchReducer';
import { useDispatch, useSelector } from 'react-redux';

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
                    <Label htmlFor="søkeboks-stilling">
                        Søk etter tittel, arbeidsgiver eller annonsenummer
                    </Label>
                    <Input
                        name="søkeboks-stilling"
                        id="SearchPageSearchBox"
                        onChange={onSøkestringChanged}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') onSøk();
                        }}
                        value={søkestring}
                        className="Søkeboks__input"
                    />
                    <span className="SearchBox__button">
                        <i className="SearchBox__button__icon" />
                    </span>
                </div>
                <RadioGruppe className="Søkeboks__radio-gruppe">
                    <Radio
                        label="Annonsetittel"
                        name="søkekategori"
                        value={Fields.TITLE}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.TITLE}
                    />
                    <Radio
                        label="Arbeidsgiver"
                        name="søkekategori"
                        value={Fields.EMPLOYER_NAME}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.EMPLOYER_NAME}
                    />
                    <Radio
                        label="Annonsenummer"
                        name="søkekategori"
                        value={Fields.ID}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.ID}
                    />
                </RadioGruppe>
            </div>
            <div className="SearchPage__SearchBox__resetButton">
                <Flatknapp mini onClick={onNullstillSøk}>
                    Nullstill søk
                </Flatknapp>
            </div>
        </>
    );
};

export default StillingSøkeboks;
