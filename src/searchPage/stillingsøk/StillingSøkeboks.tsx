import React, { ChangeEvent, FunctionComponent } from 'react';
import { Input, Label, Radio, RadioGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import {
    Søkekategori,
    RESET_SEARCH,
    SEARCH,
    SET_SØKEKATEGORI,
    SET_SEARCH_VALUE,
} from '../searchReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Feilmelding } from 'nav-frontend-typografi';
import './StillingSøkeboks.less';

const erAnnonsenummerSøkOgInputInneholderAnnetEnnTall = (
    søkekategori: string,
    søkestring: string
) => {
    if (søkestring.length === 0) {
        return false;
    }

    let inputInneholderKunTall = søkestring.match(/^[ 0-9]+$/) !== null;
    let harValgtSøkPåAnnonsenummer = søkekategori === Søkekategori.annonsenummer;
    return harValgtSøkPåAnnonsenummer && !inputInneholderKunTall;
};

const søkeinputErGyldigForSøkTriggetAvRadioButtonsEndring = (
    søkekategori: string,
    søkestring: string
) => {
    if (søkestring.length === 0) return false;
    return !erAnnonsenummerSøkOgInputInneholderAnnetEnnTall(søkekategori, søkestring);
};

const søkeinputErGyldigForSøkTriggetAvSøkeknapp = (søkekategori: string, søkestring: string) => {
    return !erAnnonsenummerSøkOgInputInneholderAnnetEnnTall(søkekategori, søkestring);
};

const hentPresenterbarSøkekategori = (kategori: string) => {
    switch (kategori) {
        case Søkekategori.annonsenummer:
            return 'annonsenummer';
        case Søkekategori.arbeidsgiversNavn:
            return 'arbeidsgiver';
        case Søkekategori.annonsetittel:
            return 'annonsetittel';
    }
};

const StillingSøkeboks: FunctionComponent = () => {
    const dispatch = useDispatch();
    const søkestring = useSelector((state: any) => state.search.value);
    const valgtKategori = useSelector((state: any) => state.search.søkekategori);

    const onSøkestringChanged = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: SET_SEARCH_VALUE, value: e.target.value });

    const onRadioButtonChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let nyValgtKategori = e.target.value;
        dispatch({ type: SET_SØKEKATEGORI, søkekategori: nyValgtKategori });

        if (søkeinputErGyldigForSøkTriggetAvRadioButtonsEndring(nyValgtKategori, søkestring)) {
            søk();
        }
    };

    const søk = () => {
        if (søkeinputErGyldigForSøkTriggetAvSøkeknapp(valgtKategori, søkestring)) {
            dispatch({ type: SEARCH });
        }
    };

    const nullstillSøk = () => {
        dispatch({ type: RESET_SEARCH });
    };

    return (
        <>
            <div className="søkeboks">
                <RadioGruppe className="søkeboks__radio-gruppe" aria-controls="søkeboks-stilling">
                    <Radio
                        className="søkeboks__radio-knapp"
                        label="Søk på annonsetittel"
                        name="søkekategori"
                        value={Søkekategori.annonsetittel}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Søkekategori.annonsetittel}
                    />
                    <Radio
                        className="søkeboks__radio-knapp"
                        label="Søk på arbeidsgiver"
                        name="søkekategori"
                        value={Søkekategori.arbeidsgiversNavn}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Søkekategori.arbeidsgiversNavn}
                    />
                    <Radio
                        className="søkeboks__radio-knapp"
                        label="Søk på annonsenummer"
                        name="søkekategori"
                        value={Søkekategori.annonsenummer}
                        onChange={onRadioButtonChanged}
                        checked={valgtKategori === Søkekategori.annonsenummer}
                    />
                </RadioGruppe>
                <div className="søkeboks__input-wrapper">
                    <SkjemaGruppe>
                        <Input
                            name="søkeboks-stilling"
                            id="søkeboks-stilling"
                            className="søkeboks__input"
                            onChange={onSøkestringChanged}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') søk();
                            }}
                            feil={erAnnonsenummerSøkOgInputInneholderAnnetEnnTall(
                                valgtKategori,
                                søkestring
                            )}
                            value={søkestring}
                            label={
                                <Label
                                    htmlFor="søkeboks-stilling"
                                    className="søkeboks__søkekategori-skjult"
                                >
                                    Søk på {hentPresenterbarSøkekategori(valgtKategori)}
                                </Label>
                            }
                        />
                        {erAnnonsenummerSøkOgInputInneholderAnnetEnnTall(
                            valgtKategori,
                            søkestring
                        ) && (
                            <Feilmelding className="søkeboks__feilmelding">
                                Skriv inn tall for å søke på annonsenummer
                            </Feilmelding>
                        )}
                        <Søkeknapp type="flat" className="søkeboks__søkeknapp" onClick={søk}>
                            Søk
                        </Søkeknapp>
                    </SkjemaGruppe>
                </div>
            </div>
            <Flatknapp mini onClick={nullstillSøk} className="søkeboks__nullstill-knapp">
                Nullstill søk
            </Flatknapp>
        </>
    );
};

export default StillingSøkeboks;
