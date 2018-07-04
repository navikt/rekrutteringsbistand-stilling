import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler'
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import  EtikettBase  from 'nav-frontend-etiketter';
import { Checkbox, TextareaControlled } from "nav-frontend-skjema";
import './Processing.less';
import {AdNotesEnum} from "./AdNotesEnum";
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

    changeComments = (e) => {
        this.props.setComments(e.target.value);
    };

    render() {
        const { checkedReject, comments } = this.props;
        return (
            <Panel border className="Processing detail-section">
                <Undertittel className="detail-section__head">Behandling av stillingen</Undertittel>
                <EtikettBase type='fokus' className="blokk-s">
                    Stillingen er ikke publisert
                </EtikettBase>
                <Undertittel className="detail-section__head">Oppgi årsak til avvising</Undertittel>
                <Checkbox id="chbx-notes-1"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.DISKRIMINERENDE)}
                          value={AdNotesEnum.DISKRIMINERENDE}
                          label="Diskriminerende"/>
                <Checkbox id="chbx-notes-2"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.DUPLIKAT)}
                          value={AdNotesEnum.DUPLIKAT}
                          label="Duplikat"/>
                <Checkbox id="chbx-notes-3"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.IKKE_ANSATT)}
                          value={AdNotesEnum.IKKE_ANSATT}
                          label="Ikke ansatt"/>
                <Checkbox id="chbx-notes-4"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.IKKE_GODKJENT_BEMANNING_RENHOLD)}
                          value={AdNotesEnum.IKKE_GODKJENT_BEMANNING_RENHOLD}
                          label="Ikke godkjent bemanning/renhold"/>
                <Checkbox id="chbx-notes-5"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.AVVIST_PGA_KAPASITET)}
                          value={AdNotesEnum.AVVIST_PGA_KAPASITET}
                          label="Avvist pga kapasitet"/>
                <Checkbox id="chbx-notes-6"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.UTENLANDSK_STILLING)}
                          value={AdNotesEnum.UTENLANDSK_STILLING}
                          label="Utenlandsk stilling"/>
                <Checkbox id="chbx-notes-7"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.SAMLEANNONSE)}
                          value={AdNotesEnum.SAMLEANNONSE}
                          label="Samleannonse"/>
                <Checkbox id="chbx-notes-8"
                          onChange={this.onRejectClick}
                          checked={checkedReject.includes(AdNotesEnum.ANNET)}
                          value={AdNotesEnum.ANNET}
                          label="Annet, kommenter"/>
                <TextareaControlled label=''
                                    maxLength={200}
                                    onChange={this.changeComments}
                                    value={comments ? comments : ""} />
                <Hovedknapp className="blokk-xxs pull-right"
                >
                    OK
                </Hovedknapp>
                <Hovedknapp className="blokk-xxs fullWidth" onClick={this.cancel}
                >
                    Avbryt
                </Hovedknapp>
            </Panel>
        );
    }
}

Reject.propTypes = {
};

const mapStateToProps = (state) => ({
    processingStatus: state.processing.processingStatus,
    checkedReject: state.processing.checkedReject,
    comments: state.processing.comments
});

const mapDispatchToProps = (dispatch) => ({
    setProcessingStatus: (status) => dispatch({ type: SET_PROCESSING_STATUS, status }),
    checkReject: (value) => dispatch({ type: CHECK_REJECT, value }),
    uncheckReject: (value) => dispatch({ type: UNCHECK_REJECT, value }),
    setComments: (comments) => dispatch({ type: SET_COMMENTS, comments })
});

export default connect(mapStateToProps, mapDispatchToProps)(Reject);