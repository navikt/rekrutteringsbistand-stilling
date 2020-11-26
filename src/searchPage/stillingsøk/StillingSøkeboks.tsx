import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Input, Label, Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import './StillingSøkeboks.less';
import {
    Fields,
    getLastSearchStringFromLocalStorage,
    RESET_SEARCH,
    SET_SEARCH,
    SET_SEARCH_FIELD,
    SET_SEARCH_VALUE,
} from '../searchReducer';
import { useDispatch, useStore } from 'react-redux';
import { stringify } from 'ts-jest/dist/utils/json';

type Props = {
    setSøketekst: (søketekst: string) => void;
    setSøkekategori: (søkekategori: typeof Fields) => void;
};

const StillingSøkeboks: FunctionComponent<Props> = ({ setSøketekst, setSøkekategori }) => {
    const [søkestring, setSøkestring] = useState(getLastSearchStringFromLocalStorage);
    const [valgtKategoriRadioButton, setValgtKategoriRadioButton] = useState(Fields.TITLE);
    const dispatch = useDispatch();

    const onSøkestringChanged = (e: ChangeEvent<HTMLInputElement>) => setSøkestring(e.target.value);

    const onRadioButtonChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setValgtKategoriRadioButton(e.target.id);
    };

    const onSøk = () => {
        dispatch({ type: SET_SEARCH_VALUE, value: søkestring });
        dispatch({ type: SET_SEARCH_FIELD, field: valgtKategoriRadioButton });
    };

    const onNullstillSøk = () => {
        setSøkestring('');
        setValgtKategoriRadioButton(Fields.TITLE);
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
                    />
                    <span className="SearchBox__button">
                        <i className="SearchBox__button__icon" />
                    </span>
                </div>
                <RadioGruppe className="Søkeboks__radio-gruppe">
                    <Radio
                        label="Annonsetittel"
                        name="søkekategori"
                        id={Fields.TITLE}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategoriRadioButton === Fields.TITLE}
                    />
                    <Radio
                        label="Arbeidsgiver"
                        name="søkekategori"
                        id={Fields.EMPLOYER_NAME}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategoriRadioButton === Fields.EMPLOYER_NAME}
                    />
                    <Radio
                        label="Annonsenummer"
                        name="søkekategori"
                        id={Fields.ID}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategoriRadioButton === Fields.ID}
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
