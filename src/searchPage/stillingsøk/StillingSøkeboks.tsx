import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Input, Label, Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import './StillingSøkeboks.less';

type StillingSøkeboksProps = {
    nullstillSøk: () => void;
    gjørSøk: () => void;
};

const StillingSøkeboks: FunctionComponent<StillingSøkeboksProps> = (
    props: StillingSøkeboksProps
) => {
    const [søkestring, setSøkestring] = useState('');
    const [valgtRadioButton, setValgtRadioButton] = useState('annonsetittel');
    const onSøkestringChanged = (e: ChangeEvent<HTMLInputElement>) => setSøkestring(e.target.value);
    const onRadioButtonChanged = (e: ChangeEvent<HTMLInputElement>) =>
        setValgtRadioButton(e.target.id);

    const onSøk = () => {
        if (søkestring) console.log('Søk: ' + søkestring + valgtRadioButton);
        props.gjørSøk();
    };

    const onNullstillSøk = () => {
        setSøkestring('');
        setValgtRadioButton('annonsetittel');
        console.log('Nullstill søk');
        props.nullstillSøk();
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
                        onSelect={onSøk}
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
};

export default StillingSøkeboks;
