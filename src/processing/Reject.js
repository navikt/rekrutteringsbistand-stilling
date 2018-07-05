import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Undertittel, Element } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler'
import { Fareknapp, Knapp } from 'nav-frontend-knapper';
import EtikettBase from 'nav-frontend-etiketter';
import { SkjemaGruppe, Checkbox } from "nav-frontend-skjema";
import './Processing.less';
import { AdNotesEnum } from "./AdNotesEnum";
import {
    SET_PROCESSING_STATUS,
    CHECK_REJECT,
    UNCHECK_REJECT,
    SET_COMMENTS
} from './processingReducer';

export class Reject extends React.Component {
    cancel = () => {
        this.props.setProcessingStatus('0');
    };

    onRejectClick = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.checkReject(value);
        } else {
            this.props.uncheckReject(value);
        }
    };

    render() {
        const { checkedReject } = this.props;
        return (
            <Panel border className="Processing detail-section">
                <Undertittel className="detail-section__head">Behandling av stillingen</Undertittel>
                <EtikettBase type='fokus' className="blokk-s">
                    Stillingen er ikke publisert
                </EtikettBase>
                <SkjemaGruppe title="Oppgi årsak til avvising">
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.DISKRIMINERENDE)}
                        value={AdNotesEnum.DISKRIMINERENDE}
                        label="Diskriminerende"/>
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.DUPLIKAT)}
                        value={AdNotesEnum.DUPLIKAT}
                        label="Duplikat"/>
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.IKKE_ANSATT)}
                        value={AdNotesEnum.IKKE_ANSATT}
                        label="Ikke ansatt"/>
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.IKKE_GODKJENT_BEMANNING_RENHOLD)}
                        value={AdNotesEnum.IKKE_GODKJENT_BEMANNING_RENHOLD}
                        label="Ikke godkjent bemanning/renhold"/>
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.AVVIST_PGA_KAPASITET)}
                        value={AdNotesEnum.AVVIST_PGA_KAPASITET}
                        label="Avvist pga kapasitet"/>
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.UTENLANDSK_STILLING)}
                        value={AdNotesEnum.UTENLANDSK_STILLING}
                        label="Utenlandsk stilling"/>
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.SAMLEANNONSE)}
                        value={AdNotesEnum.SAMLEANNONSE}
                        label="Samleannonse"/>
                    <Checkbox
                        onChange={this.onRejectClick}
                        checked={checkedReject.includes(AdNotesEnum.ANNET)}
                        value={AdNotesEnum.ANNET}
                        label="Annet"/>
                </SkjemaGruppe>
                <Fareknapp className="blokk-xxs fullWidth">
                    Avvis
                </Fareknapp>
                <Knapp className="blokk-xxs fullWidth" onClick={this.cancel}>
                    Avbryt
                </Knapp>
            </Panel>
        );
    }
}

Reject.propTypes = {};

const mapStateToProps = (state) => ({
    processingStatus: state.processing.processingStatus,
    checkedReject: state.processing.checkedReject
});

const mapDispatchToProps = (dispatch) => ({
    setProcessingStatus: (status) => dispatch({ type: SET_PROCESSING_STATUS, status }),
    checkReject: (value) => dispatch({ type: CHECK_REJECT, value }),
    uncheckReject: (value) => dispatch({ type: UNCHECK_REJECT, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Reject);