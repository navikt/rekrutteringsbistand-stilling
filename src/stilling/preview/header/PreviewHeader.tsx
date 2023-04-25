import React from 'react';
import { connect } from 'react-redux';
import { Alert, BodyShort, Button } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';
import { DocPencilIcon, PrinterSmallIcon, XMarkIcon } from '@navikt/aksel-icons';

import {
    CLOSE_TRANSFERRED_ALERT,
    StillingsinfoState,
} from '../../../stillingsinfo/stillingsinfoReducer';
import { EDIT_AD, LEGG_TIL_I_MINE_STILLINGER } from '../../adReducer';
import { hentAnnonselenke, stillingErPublisert } from '../../adUtils';
import { Kandidatliste } from '../../legg-til-kandidat-modal/kandidatlistetyper';
import { Nettressurs } from '../../../api/Nettressurs';
import { State } from '../../../redux/store';
import { Stillingsinfo } from '../../../Stilling';
import { AdDataState } from '../../adDataReducer';
import OpprettKandidatlisteModal from './OpprettKandidatlisteModal';
import Stillingstittel from './Stillingstittel';
import Stillingsheader from '../../header/Stillingsheader';
import css from './PreviewHeader.module.css';

type Props = {
    stilling: AdDataState;
    stillingsinfoData: Stillingsinfo;
    stillingsinfo: StillingsinfoState;
    kandidatliste: Nettressurs<Kandidatliste>;
    limitedAccess: boolean;

    editAd: () => void;
    leggTilIMineStillinger: () => void;
    closeAlertstripe: () => void;
};

class PreviewMenu extends React.Component<Props> {
    state: {
        opprettKandidatlisteModalÅpen: boolean;
    };

    constructor(props: Props) {
        super(props);
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

        return (
            <>
                <Stillingsheader kandidatliste={this.props.kandidatliste}>
                    {!limitedAccess && (
                        <Button onClick={this.onEditAdClick} size="small" icon={<DocPencilIcon />}>
                            Rediger stillingen
                        </Button>
                    )}
                    {kanOverfoereStilling && (
                        <Button onClick={this.onLeggTilIMineStillingerClick} size="small">
                            Opprett kandidatliste
                        </Button>
                    )}
                    {stillingErPublisert(stilling) && (
                        <CopyToClipboard
                            popoverText="Kopierte annonselenken til clipboard!"
                            copyText={hentAnnonselenke(stilling.uuid)}
                            variant={'secondary' as 'tertiary'}
                            size="small"
                        >
                            Kopier annonselenke
                        </CopyToClipboard>
                    )}
                    <Button
                        variant="secondary"
                        onClick={this.onPrintClick}
                        size="small"
                        icon={<PrinterSmallIcon />}
                    >
                        Skriv ut
                    </Button>
                </Stillingsheader>
                {limitedAccess && (
                    <>
                        {(showAdTransferredAlert || showAdMarkedAlert) && (
                            <div className="Ad__info">
                                <Alert className={css.stillingBleOverførtAlert} variant="success">
                                    <BodyShort>
                                        {(showAdTransferredAlert
                                            ? 'Kandidatlisten er opprettet.'
                                            : 'Kandidatlisten er markert som din.') +
                                            ' Du er nå eier av stillingen og kandidatlisten.'}
                                    </BodyShort>
                                    <Button
                                        variant="secondary-neutral"
                                        className={css.stillingBleOverførtKnapp}
                                        onClick={this.onCloseAlertstripe}
                                        size="small"
                                        icon={<XMarkIcon />}
                                    ></Button>
                                </Alert>
                            </div>
                        )}
                        <div className="Ad__info">
                            <Alert variant="info">
                                Dette er en eksternt utlyst stilling. Du kan <b>ikke</b> endre
                                stillingen.
                            </Alert>
                        </div>
                    </>
                )}
                <Stillingstittel
                    tittel={stilling.title}
                    employer={stilling.properties.employer}
                    location={stilling.location}
                />
                <OpprettKandidatlisteModal
                    åpen={this.state.opprettKandidatlisteModalÅpen}
                    onClose={this.lukkOpprettKandidatlisteModal}
                    onBekreft={this.bekreftOpprettKandidatliste}
                />
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    stillingsinfoData: state.stillingsinfoData,
    stillingsinfo: state.stillingsinfo,
    stilling: state.adData,
    limitedAccess: state.adData.createdBy !== 'pam-rekrutteringsbistand',
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    editAd: () => dispatch({ type: EDIT_AD }),
    leggTilIMineStillinger: () => dispatch({ type: LEGG_TIL_I_MINE_STILLINGER }),
    closeAlertstripe: () => dispatch({ type: CLOSE_TRANSFERRED_ALERT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
