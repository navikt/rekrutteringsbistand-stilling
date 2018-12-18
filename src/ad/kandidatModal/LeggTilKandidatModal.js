import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Systemtittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Kandidatliste } from './kandidatTypes';
import {
    Hentestatus,
    HENT_KANDIDAT_MED_FNR,
    HENT_KANDIDAT_MED_FNR_RESET,
    LEGG_TIL_KANDIDAT,
    SET_FODSELSNUMMER, HENT_KANDIDATLISTE
} from './kandidatReducer';
import './LeggTilKandidatModal.less';

class LeggTilKandidatModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFodselsnummer: false,
            alleredeLagtTil: false,
            errorMessage: undefined
        };
    }

    componentDidMount() {
        const {
            hentKandidatliste,
            resetHentKandidatMedFnr,
            setFodselsnummer,
            stillingsid
        } = this.props;

        hentKandidatliste(stillingsid);
        setFodselsnummer(undefined);
        resetHentKandidatMedFnr();
    }

    componentDidUpdate(prevProps) {
        const { kandidatStatus } = this.props;
        if (kandidatStatus !== prevProps.kandidatStatus) {
            if (kandidatStatus === Hentestatus.SUCCESS) {
                this.setState({
                    showFodselsnummer: true,
                    errorMessage: undefined,
                    alleredeLagtTil: this.kandidatenFinnesAllerede()
                });
            } else if (kandidatStatus === Hentestatus.FINNES_IKKE) {
                this.setState({
                    showFodselsnummer: false,
                    errorMessage: 'Fodselsnummer finnes ikke'
                });
            }
        }
    }

    onInputChange = (event) => {
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

    resetKandidat = (message) => {
        const { resetHentKandidatMedFnr } = this.props;
        resetHentKandidatMedFnr();
        this.setState({
            showFodselsnummer: false,
            errorMessage: message,
            alleredeLagtTil: false
        });
    };

    leggTilKandidat = () => {
        const {
            fodselsnummer,
            kandidatStatus,
            kandidat,
            kandidatliste,
            leggTilKandidatMedFnr,
            onClose
        } = this.props;

        if (kandidatStatus === Hentestatus.SUCCESS && !this.kandidatenFinnesAllerede()) {
            const nyKandidat = {
                kandidatnr: kandidat.arenaKandidatnr,
                sisteArbeidserfaring: kandidat.mestRelevanteYrkeserfaring ? kandidat.mestRelevanteYrkeserfaring.styrkKodeStillingstittel : ''
            };

            leggTilKandidatMedFnr(nyKandidat, kandidatliste.kandidatlisteId);
            onClose();
        } else {
            if (!fodselsnummer) {
                this.setState({
                    showFodselsnummer: false,
                    errorMessage: 'Fødselsnummer må fylles inn'
                });
            } else if (fodselsnummer.length < 11) {
                this.setState({
                    showFodselsnummer: false,
                    errorMessage: 'Fødselsnummeret er for kort'
                });
            } else if (this.kandidatenFinnesAllerede()) {
                this.setState({
                    errorMessage: 'Kandidaten er allerede lagt til i listen'
                });
            }
            this.input.focus();
        }
    };

    kandidatenFinnesAllerede = () => {
        const kandidat = this.props.kandidatliste.kandidater.filter((k) => (this.props.kandidat.arenaKandidatnr === k.kandidatnr));
        return kandidat.length > 0;
    };

    render() {
        const { vis, onClose, fodselsnummer, kandidat } = this.props;
        return (
            <NavFrontendModal
                contentLabel="Modal legg til kandidat"
                isOpen={vis}
                onRequestClose={onClose}
                className="LeggTilKandidatModal"
                appElement={document.getElementById('app')}
            >
                <Systemtittel className="tittel">Legg til kandidat</Systemtittel>
                <Input
                    onChange={this.onInputChange}
                    feil={this.state.errorMessage && { feilmelding: this.state.errorMessage }}
                    bredde="S"
                    label="Fødselsnummer på kandidaten (11 siffer)"
                    inputRef={(input) => { this.input = input; }}
                />
                {this.state.showFodselsnummer &&
                    <Normaltekst className="fodselsnummer">{`${kandidat.fornavn} ${kandidat.etternavn} (${fodselsnummer})`}</Normaltekst>
                }
                {this.state.alleredeLagtTil &&
                    <div className="legg-til-kandidat__advarsel">
                        <Element>
                            <i className="advarsel__icon" />
                            Kandidaten er allerede lagt til i listen
                        </Element>
                    </div>
                }
                <div>
                    <Hovedknapp className="legg-til--knapp" onClick={this.leggTilKandidat}>Legg til</Hovedknapp>
                    <Flatknapp className="avbryt--knapp" onClick={onClose}>Avbryt</Flatknapp>
                </div>
            </NavFrontendModal>
        );
    }
}
LeggTilKandidatModal.defaultProps = {
    fodselsnummer: undefined,
    vis: true
};

LeggTilKandidatModal.propTypes = {
    fodselsnummer: PropTypes.string,
    kandidatStatus: PropTypes.string,
    kandidatlisteStatus: PropTypes.string,
    hentKandidatMedFnr: PropTypes.func.isRequired,
    kandidat: PropTypes.shape({
        arenaKandidatnr: PropTypes.string,
        fornavn: PropTypes.string,
        etternavn: PropTypes.string,
        mestRelevanteYrkeserfaring: PropTypes.shape({
            styrkKodeStillingstittel: PropTypes.string,
            yrkeserfaringManeder: PropTypes.number
        })
    }).isRequired,
    kandidatliste: PropTypes.shape(Kandidatliste),
    hentKandidatliste: PropTypes.func.isRequired,
    leggTilKandidatMedFnr: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    resetHentKandidatMedFnr: PropTypes.func.isRequired,
    setFodselsnummer: PropTypes.func.isRequired,
    vis: PropTypes.bool,
    stillingsid: PropTypes.string
};

const mapStateToProps = (state) => ({
    fodselsnummer: state.kandidat.fodselsnummer,
    kandidatStatus: state.kandidat.kandidatStatus,
    kandidat: state.kandidat.kandidat,
    kandidatliste: state.kandidat.detaljer.kandidatliste,
    stillingsid: state.ad.originalData.uuid
});

const mapDispatchToProps = (dispatch) => ({
    hentKandidatliste: (stillingsnummer) => dispatch({ type: HENT_KANDIDATLISTE, stillingsnummer }),
    hentKandidatMedFnr: (fodselsnummer) => dispatch({ type: HENT_KANDIDAT_MED_FNR, fodselsnummer }),
    leggTilKandidatMedFnr: (kandidat, id) => dispatch({ type: LEGG_TIL_KANDIDAT, kandidat, id }),
    resetHentKandidatMedFnr: () => dispatch({ type: HENT_KANDIDAT_MED_FNR_RESET }),
    setFodselsnummer: (fodselsnummer) => dispatch({ type: SET_FODSELSNUMMER, fodselsnummer })
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilKandidatModal);
