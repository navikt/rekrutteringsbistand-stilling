import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Input, Textarea } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import {
    HENT_KANDIDAT_MED_FNR,
    HENT_KANDIDAT_MED_FNR_RESET,
    HENT_KANDIDATLISTE,
    Hentestatus,
    LEGG_TIL_KANDIDAT,
    SET_FODSELSNUMMER,
    SET_NOTAT,
} from './kandidatReducer';
import './LeggTilKandidatModal.less';
import { sendEvent } from '../../amplitude';

const NOTATLENGDE = 2000;

type Props = {
    vis: boolean;
    stillingsid: string;
    onClose: () => void;
    fodselsnummer?: string;
    kandidatliste?: {
        kandidatlisteId: string;
        kandidater: Array<{
            kandidatnr: string;
        }>;
    };
    kandidat?: {
        arenaKandidatnr: string;
        fornavn: string;
        etternavn: string;
        mestRelevanteYrkeserfaring: {
            styrkKodeStillingstittel: string;
            yrkeserfaringManeder: number;
        };
    };
    kandidatStatus: string;
    kandidatlisteStatus: string;
    hentKandidatMedFnr: (fnr: string) => void;
    hentKandidatliste: (stillingsId: string) => void;
    leggTilKandidatMedFnr: (kandidat: any, id: string) => void;
    resetHentKandidatMedFnr: () => void;
    setFodselsnummer: (fnr?: string) => void;
    notat: string;
    setNotat: (notat: string) => void;
};

class LeggTilKandidatModal extends React.Component<Props> {
    fnrinput: any;
    textArea: any;

    state: {
        showFodselsnummer: boolean;
        alleredeLagtTil: boolean;
        errorMessage?: string;
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            showFodselsnummer: false,
            alleredeLagtTil: false,
            errorMessage: undefined,
        };
    }

    componentDidMount() {
        const {
            hentKandidatliste,
            resetHentKandidatMedFnr,
            setFodselsnummer,
            stillingsid,
            setNotat,
        } = this.props;

        hentKandidatliste(stillingsid);
        setFodselsnummer(undefined);
        setNotat('');
        resetHentKandidatMedFnr();
    }

    componentDidUpdate(prevProps: Props) {
        const { kandidatStatus, kandidat, kandidatlisteStatus, kandidatliste } = this.props;

        if (
            kandidatStatus !== prevProps.kandidatStatus ||
            kandidatlisteStatus !== prevProps.kandidatlisteStatus
        ) {
            if (
                kandidatStatus === Hentestatus.SUCCESS &&
                kandidatlisteStatus === Hentestatus.SUCCESS &&
                kandidat &&
                kandidatliste
            ) {
                this.setState({
                    showFodselsnummer: true,
                    errorMessage: undefined,
                    alleredeLagtTil: this.kandidatenFinnesAllerede(kandidat, kandidatliste),
                });
            } else if (kandidatStatus === Hentestatus.FINNES_IKKE) {
                this.setState({
                    showFodselsnummer: false,
                    errorMessage: this.kandidatenFinnesIkke(),
                });
            }
        }
    }

    onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { hentKandidatMedFnr, setFodselsnummer } = this.props;
        const fodselsnummer = event.target.value;

        setFodselsnummer(fodselsnummer);
        if (fodselsnummer.length === 11) {
            hentKandidatMedFnr(fodselsnummer);
        } else if (fodselsnummer.length > 11) {
            this.resetKandidat('Fodselsnummeret er for langt');
        } else {
            this.resetKandidat();
        }
    };

    onNotatChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.props.setNotat(event.target.value);
    };

    resetKandidat = (message?: string) => {
        const { resetHentKandidatMedFnr } = this.props;
        resetHentKandidatMedFnr();
        this.setState({
            showFodselsnummer: false,
            errorMessage: message,
            alleredeLagtTil: false,
        });
    };

    onLeggTilKandidatKlikk = () => {
        const { kandidat, kandidatliste } = this.props;

        if (kandidat && kandidatliste) {
            this.leggTilKandidat(kandidat, kandidatliste);
        }
    };

    leggTilKandidat = (kandidat: any, kandidatliste: any) => {
        const { fodselsnummer, leggTilKandidatMedFnr, onClose, notat } = this.props;

        if (
            !this.kandidatenFinnesAllerede(kandidat, kandidatliste) &&
            notat.length <= NOTATLENGDE
        ) {
            const nyKandidat = {
                kandidatnr: kandidat.arenaKandidatnr,
                notat,
                sisteArbeidserfaring: kandidat.mestRelevanteYrkeserfaring
                    ? kandidat.mestRelevanteYrkeserfaring.styrkKodeStillingstittel
                    : '',
            };

            leggTilKandidatMedFnr(nyKandidat, kandidatliste.kandidatlisteId);
            sendEvent('legg_til_kandidat', 'klikk', {
                app: 'stilling',
            });

            onClose();
        } else {
            if (!fodselsnummer) {
                this.setState({
                    showFodselsnummer: false,
                    errorMessage: 'Fødselsnummer må fylles inn',
                });
                this.fnrinput.focus();
            } else if (fodselsnummer.length < 11) {
                this.setState({
                    showFodselsnummer: false,
                    errorMessage: 'Fødselsnummeret er for kort',
                });
                this.fnrinput.focus();
            } else if (this.kandidatenFinnesAllerede(kandidat, kandidatliste)) {
                this.setState({
                    errorMessage: 'Kandidaten er allerede lagt til i listen',
                });
                this.fnrinput.focus();
            }
        }
    };

    kandidatenFinnesAllerede = (kandidat: any, kandidatliste: any) => {
        if (
            this.props.kandidatlisteStatus === Hentestatus.SUCCESS &&
            this.props.kandidatStatus === Hentestatus.SUCCESS &&
            this.props.kandidatliste &&
            this.props.kandidat
        ) {
            const finnesAllerede = kandidatliste.kandidater.filter(
                (k: any) => kandidat.arenaKandidatnr === k.kandidatnr
            );

            return finnesAllerede.length > 0;
        }
    };

    kandidatenFinnesIkke = () => (
        <>
            <div className="LeggTilKandidat__feilmelding">
                <div className="blokk-xxs">Du kan ikke legge til kandidaten.</div>
                <div>Mulige årsaker:</div>
                <ul>
                    <li>Fødselsnummeret er feil</li>
                    <li>Kandidaten har ikke jobbprofil</li>
                    <li>Kandidaten har ikke CV</li>
                    <li>Kandidaten har ikke lest hjemmel i ny CV-løsning</li>
                    <li>Kandidaten har "Nei nav.no" i Formidlingsinformasjon i Arena</li>
                    <li>Kandidaten har personforhold "Fritatt for kandidatsøk" i Arena</li>
                    <li>Kandidaten er sperret "Egen ansatt"</li>
                </ul>
            </div>
            <div className="LeggTilKandidat__info">
                <AlertStripeInfo>
                    Noen kandidater som ikke kan søkes opp i Rekrutteringsbistand kan likevel legges
                    til en kandidatliste ved at du navigerer til kandidatlisten og velger "Legg til
                    kandidat" der.
                </AlertStripeInfo>
            </div>
        </>
    );

    render() {
        const { vis = true, onClose, fodselsnummer, kandidat, notat } = this.props;
        return (
            <NavFrontendModal
                contentLabel="Modal legg til kandidat"
                isOpen={vis}
                onRequestClose={onClose}
                className="LeggTilKandidatModal"
            >
                <Systemtittel className="tittel">Legg til kandidat</Systemtittel>
                <AlertStripeAdvarsel>
                    Før du legger en kandidat på kandidatlisten, kontakt han eller henne for å
                    undersøke om stillingen er aktuell.
                </AlertStripeAdvarsel>
                <Input
                    className="legg-til-kandidat__fodselsnummer"
                    onChange={this.onInputChange}
                    feil={this.state.errorMessage}
                    bredde="S"
                    label="Fødselsnummer på kandidaten (11 siffer)"
                    inputRef={(input) => {
                        this.fnrinput = input;
                    }}
                />
                {this.state.showFodselsnummer && kandidat && (
                    <Normaltekst className="fodselsnummer">{`${kandidat.fornavn} ${kandidat.etternavn} (${fodselsnummer})`}</Normaltekst>
                )}
                {this.state.alleredeLagtTil && (
                    <div className="legg-til-kandidat__advarsel">
                        <i className="advarsel__icon" />
                        <div className="legg-til-kandidat__advarsel-tekst">
                            <Element>Kandidaten er allerede lagt til i listen</Element>
                            <Normaltekst>
                                Finner du ikke kandidaten i kandidatlisten? Husk å sjekk om
                                kandidaten er slettet ved å huke av "Vis kun slettede".
                            </Normaltekst>
                        </div>
                    </div>
                )}

                <Element className="legg-til-kandidat__notatoverskrift">
                    Notat om kandidaten
                </Element>
                <Textarea
                    id="legg-til-kandidat-notat-input"
                    textareaClass="legg-til-kandidat__notat skjemaelement--pink"
                    label="Du skal ikke skrive sensitive opplysninger her. Notatet er synlig for alle veiledere."
                    placeholder="Skriv inn en kort tekst om hvorfor kandidaten passer til stillingen"
                    value={notat || ''}
                    maxLength={NOTATLENGDE}
                    feil={notat && notat.length > NOTATLENGDE ? 'Notatet er for langt' : undefined}
                    onChange={this.onNotatChange}
                    textareaRef={(textArea) => {
                        this.textArea = textArea;
                    }}
                />

                <div>
                    <Hovedknapp
                        disabled={!kandidat}
                        className="legg-til--knapp"
                        onClick={this.onLeggTilKandidatKlikk}
                    >
                        Legg til
                    </Hovedknapp>
                    <Flatknapp className="avbryt--knapp" onClick={onClose}>
                        Avbryt
                    </Flatknapp>
                </div>
            </NavFrontendModal>
        );
    }
}

const mapStateToProps = (state: any) => ({
    fodselsnummer: state.kandidat.fodselsnummer,
    kandidatStatus: state.kandidat.kandidatStatus,
    kandidat: state.kandidat.kandidat,
    kandidatliste: state.kandidat.detaljer.kandidatliste,
    kandidatlisteStatus: state.kandidat.kandidatlisteStatus,
    stillingsid: state.ad.originalData.uuid,
    notat: state.kandidat.notat,
});

const mapDispatchToProps = (dispatch: any) => ({
    hentKandidatliste: (stillingsnummer: string) =>
        dispatch({ type: HENT_KANDIDATLISTE, stillingsnummer }),
    hentKandidatMedFnr: (fodselsnummer: string) =>
        dispatch({ type: HENT_KANDIDAT_MED_FNR, fodselsnummer }),
    leggTilKandidatMedFnr: (kandidat: any, id: string) =>
        dispatch({ type: LEGG_TIL_KANDIDAT, kandidat, id }),
    resetHentKandidatMedFnr: () => dispatch({ type: HENT_KANDIDAT_MED_FNR_RESET }),
    setFodselsnummer: (fodselsnummer: string) =>
        dispatch({ type: SET_FODSELSNUMMER, fodselsnummer }),
    setNotat: (notat: string) => dispatch({ type: SET_NOTAT, notat }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilKandidatModal);
