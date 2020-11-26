import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Input, Label, Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import './StillingSøkeboks.less';
import { Fields, RESET_SEARCH, SET_SEARCH_FIELD, SET_SEARCH_VALUE } from '../searchReducer';
import { useDispatch, useSelector } from 'react-redux';
import State from '../../State';

const StillingSøkeboks: FunctionComponent = () => {
    const dispatch = useDispatch();
    const søkestring = useSelector((state: any) => state.search.value);
    const valgtKategori = useSelector((state: any) => state.search.field);

    const onSøkestringChanged = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: SET_SEARCH_VALUE, value: e.target.value });

    // TODO: SET_SEARCH_FIELD må ikke trigge søk
    const onRadioButtonChanged = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('radioButtonId: ', e.target.value);
        dispatch({ type: SET_SEARCH_FIELD, value: e.target.value });
    };

    const onSøk = () => {
        // TODO: Ny metode for search
    };

    const onNullstillSøk = () => {
        dispatch({ type: RESET_SEARCH });
    };

    return (
        <>
            <div className="Søkeboks">
                <div className="Søkeboks__input">
                    <Label htmlFor="søkeboks-stilling">Søk etter stilling</Label>
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
