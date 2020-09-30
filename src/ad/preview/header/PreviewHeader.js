import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { EDIT_AD, LEGG_TIL_I_MINE_STILLINGER } from '../../adReducer';
import { CLOSE_TRANSFERRED_ALERT } from '../../../stillingsinfo/stillingsinfoReducer';
import AdTitle from './AdTitle';
import CandidateActions from '../../candidateActions/CandidateActions';
import Alertstripe from 'nav-frontend-alertstriper';
import { Xknapp } from 'nav-frontend-ikonknapper';
import KopierTekst from '../../kopierTekst/KopierTekst';
import { hentAnnonselenke, stillingErPublisert } from '../../adUtils';
import OpprettKandidatlisteModal from './OpprettKandidatlisteModal';
import './PreviewHeader.less';

class PreviewMenu extends React.Component {
    constructor() {
        this.state = {
            opprettKandidatlisteModalÅpen: false,
        };
    }

    onEditAdClick = () => {
        this.props.editAd();
    };

    onPrintClick = () => {
        window.print();
    };

    onLeggTilIMineStillingerClick = () => {
        this.setState({
            opprettKandidatlisteModalÅpen: true,
        });
    };

    lukkOpprettKandidatlisteModal = () => {
        this.setState({
            opprettKandidatlisteModalÅpen: false,
        });
    };

    bekreftOpprettKandidatliste = () => {
        this.props.leggTilIMineStillinger();
        this.lukkOpprettKandidatlisteModal();
    };

    onCloseAlertstripe = () => {
        this.props.closeAlertstripe();
    };

    componentWillUnmount() {
        this.props.closeAlertstripe();
    }

    render() {
        const {
            stilling,
            limitedAccess,
            stillingsinfoData,
            stillingsinfo: { showAdTransferredAlert, showAdMarkedAlert },
        } = this.props;

        const kanOverfoereStilling =
            stillingsinfoData && limitedAccess && !stillingsinfoData.eierNavident;

        const stillingsLenke = hentAnnonselenke(stilling.uuid);

        return (
            <div>
                <div className="Ad__actions">
                    <CandidateActions />
                    <div className="blokk-xs">
                        {!limitedAccess && (
                            <Hovedknapp
                                className="Ad__actions-button"
                                onClick={this.onEditAdClick}
                                mini
                            >
                                Rediger stillingen
                            </Hovedknapp>
                        )}
                        {stillingErPublisert(stilling) && (
                            <KopierTekst
                                className="PreviewHeader__kopier-lenke-knapp"
                                tooltipTekst="Kopier stillingslenke"
                                skalKopieres={stillingsLenke}
                            />
                        )}
                        {kanOverfoereStilling && (
                            <Knapp
                                className="button-legg-i-mine-stillinger"
                                onClick={this.onLeggTilIMineStillingerClick}
                                mini
                            >
                                Opprett kandidatliste
                            </Knapp>
                        )}
                        <Knapp className="button-print" onClick={this.onPrintClick} mini>
                            Skriv ut
                        </Knapp>
                    </div>
                </div>
                {limitedAccess && (
                    <div>
                        {(showAdTransferredAlert || showAdMarkedAlert) && (
                            <div className="Ad__info">
                                <Alertstripe
                                    className="Adtransferred__Alertstripe"
                                    type="suksess"
                                    solid="true"
                                >
                                    <div className="Adtransferred_text">
                                        {(showAdTransferredAlert
                                            ? 'Kandidatlisten er opprettet.'
                                            : 'Kandidatlisten er markert som din.') +
                                            ' Du er nå eier av stillingen og kandidatlisten.'}
                                    </div>
                                    <Xknapp
                                        className="alertstripe-lukk-knapp"
                                        onClick={this.onCloseAlertstripe}
                                        mini={true}
                                    />
                                </Alertstripe>
                            </div>
                        )}
                        <div className="Ad__info">
                            <Alertstripe
                                className="AdStatusPreview__Alertstripe"
                                type="info"
                                solid="true"
                            >
                                Dette er en eksternt utlyst stilling. Du kan <b>ikke</b> endre
                                stillingen.
                            </Alertstripe>
                        </div>
                    </div>
                )}
                <AdTitle
                    title={stilling.title}
                    employer={stilling.properties.employer}
                    location={stilling.location}
                />
                <OpprettKandidatlisteModal
                    åpen={this.state.opprettKandidatlisteModalÅpen}
                    onClose={this.lukkOpprettKandidatlisteModal}
                    onBekreft={this.bekreftOpprettKandidatliste}
                />
            </div>
        );
    }
}

PreviewMenu.defaultProps = {
    stilling: undefined,
};

PreviewMenu.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string,
        location: PropTypes.shape({
            address: PropTypes.string,
            municipal: PropTypes.string,
            country: PropTypes.string,
        }),
        properties: PropTypes.shape({
            employer: PropTypes.string,
        }),
    }),
    editAd: PropTypes.func.isRequired,
    stillingsinfoData: PropTypes.shape({
        stillingsid: PropTypes.string,
        eierNavident: PropTypes.string,
        eierNavn: PropTypes.string,
    }),
    stilingsinfo: PropTypes.shape({
        showAdTransferredAlert: PropTypes.bool,
        showAdMarkedAlert: PropTypes.bool,
    }),
};

const mapStateToProps = (state) => ({
    stillingsinfoData: state.stillingsinfoData,
    stillingsinfo: state.stillingsinfo,
    stilling: state.adData,
    limitedAccess: state.adData.createdBy !== 'pam-rekrutteringsbistand',
});

const mapDispatchToProps = (dispatch) => ({
    editAd: () => dispatch({ type: EDIT_AD }),
    leggTilIMineStillinger: () => dispatch({ type: LEGG_TIL_I_MINE_STILLINGER }),
    closeAlertstripe: () => dispatch({ type: CLOSE_TRANSFERRED_ALERT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
