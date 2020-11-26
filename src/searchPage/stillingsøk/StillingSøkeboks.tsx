import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Input, Label, Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
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

    const hentPresenterbarSøkekategori = () => {
        switch (valgtKategori) {
            case Fields.ID:
                return 'annonsenummer';
            case Fields.EMPLOYER_NAME:
                return 'arbeidsgiver';
            case Fields.TITLE:
                return 'annonsetittel';
        }
    };

    return (
        <>
            <div className="Søkeboks">
                <RadioGruppe className="Søkeboks__radio-gruppe" aria-controls="SearchPageSearchBox">
                    <Radio
                        className="Søkeboks__radio-knapp"
                        label="Søk på annonsetittel"
                        name="søkekategori"
                        value={Fields.TITLE}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.TITLE}
                    />
                    <Radio
                        className="Søkeboks__radio-knapp"
                        label="Søk på arbeidsgiver"
                        name="søkekategori"
                        value={Fields.EMPLOYER_NAME}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.EMPLOYER_NAME}
                    />
                    <Radio
                        className="Søkeboks__radio-knapp"
                        label="Søk på annonsenummer"
                        name="søkekategori"
                        value={Fields.ID}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Fields.ID}
                    />
                </RadioGruppe>
                <div className="Søkeboks__input">
                    <div className="Søkeboks__input-wrapper">
                        <Input
                            name="søkeboks-stilling"
                            id="søkeboks-stilling"
                            onChange={onSøkestringChanged}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') onSøk();
                            }}
                            value={søkestring}
                            label={
                                <Label htmlFor={'søkeboks-stilling'} hidden>
                                    Søk på {hentPresenterbarSøkekategori()}
                                </Label>
                            }
                        />
                        <Søkeknapp type="flat" className="Søkeboks__søkeknapp" onClick={onSøk}>
                            Søk
                        </Søkeknapp>
                    </div>
                </div>
            </div>
            <Flatknapp mini onClick={onNullstillSøk} className="nullstill-knapp">
                Nullstill søk
            </Flatknapp>
        </>
    );
};

export default StillingSøkeboks;
