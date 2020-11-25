import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Input, Label, Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';

type StillingSøkeboksProps = {
    nullstillSøk: () => void;
};

function StillingSøkeboks(props: StillingSøkeboksProps) {
    const [søkestring, setSøkestring] = useState('');
    const [valgtRadioButton, setValgtRadioButton] = useState('');
    const onSøkestringChanged = (e: ChangeEvent<HTMLInputElement>) => setSøkestring(e.target.value);
    const onRadioButtonChanged = (e: ChangeEvent<HTMLInputElement>) =>
        setValgtRadioButton(e.target.id);

    const onSøk = () => {
        console.log(søkestring + valgtRadioButton);
    };

    const onNullstillSøk = () => {
        setSøkestring('');
        setValgtRadioButton('annonsetittel');
        props.nullstillSøk();
        // Reset radio button

        console.log('Nullstill søk');
    };

    return (
        <>
            <div className="SearchPage__SearchBox__input-container">
                <div className="SearchPage__SearchBox">
                    <Label htmlFor="søkeboks-stilling">Søk etter stilling</Label>
                    <Input
                        name="søkeboks-stilling"
                        id="SearchPageSearchBox"
                        onChange={onSøkestringChanged}
                        onSelect={onSøk}
                        value={søkestring}
                    />
                    <span className="SearchBox__button">
                        <i className="SearchBox__button__icon" />
                    </span>
                </div>
                <RadioGruppe className="SearchPage__SearchBox__radio-gruppe">
                    <Radio
                        label="Annonsetittel"
                        name="søkekategori"
                        id="annonsetittel"
                        onChange={onRadioButtonChanged}
                        checked={valgtRadioButton === 'annonsetittel'}
                    />
                    <Radio
                        label="Arbeidsgiver"
                        name="søkekategori"
                        id="arbeidsgiver"
                        onChange={onRadioButtonChanged}
                        checked={valgtRadioButton === 'arbeidsgiver'}
                    />
                    <Radio
                        label="Annonsenummer"
                        name="søkekategori"
                        id="annonsenummer"
                        onChange={onRadioButtonChanged}
                        checked={valgtRadioButton === 'annonsenummer'}
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
}

export default StillingSøkeboks;
