import React, { ChangeEvent, FunctionComponent } from 'react';
import { Input, Label, Radio, RadioGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Fields, RESET_SEARCH, SEARCH, SET_SEARCH_FIELD, SET_SEARCH_VALUE } from '../searchReducer';
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
    let harValgtSøkPåAnnonsenummer = søkekategori === Fields.ID;
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
        case Fields.ID:
            return 'annonsenummer';
        case Fields.EMPLOYER_NAME:
            return 'arbeidsgiver';
        case Fields.TITLE:
            return 'annonsetittel';
    }
};

const StillingSøkeboks: FunctionComponent = () => {
    const dispatch = useDispatch();
    const søkestring = useSelector((state: any) => state.search.value);
    const valgtKategori = useSelector((state: any) => state.search.field);

    const onSøkestringChanged = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: SET_SEARCH_VALUE, value: e.target.value });

    const onRadioButtonChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let nyValgtKategori = e.target.value;
        dispatch({ type: SET_SEARCH_FIELD, field: nyValgtKategori });

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
            <div className="Søkeboks">
                <RadioGruppe className="Søkeboks__radio-gruppe" aria-controls="søkeboks-stilling">
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
                <div className="Søkeboks__input-wrapper">
                    <SkjemaGruppe>
                        <Input
                            name="søkeboks-stilling"
                            id="søkeboks-stilling"
                            className="Søkeboks__input"
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
                                <Label htmlFor={'søkeboks-stilling'} hidden>
                                    Søk på {hentPresenterbarSøkekategori(valgtKategori)}
                                </Label>
                            }
                        />
                        {erAnnonsenummerSøkOgInputInneholderAnnetEnnTall(
                            valgtKategori,
                            søkestring
                        ) && (
                            <Feilmelding className="Søkeboks__feilmelding">
                                Skriv inn tall for å søke på annonsenummer
                            </Feilmelding>
                        )}
                        <Søkeknapp type="flat" className="Søkeboks__søkeknapp" onClick={søk}>
                            Søk
                        </Søkeknapp>
                    </SkjemaGruppe>
                </div>
            </div>
            <Flatknapp mini onClick={nullstillSøk} className="nullstill-knapp">
                Nullstill søk
            </Flatknapp>
        </>
    );
};

export default StillingSøkeboks;
