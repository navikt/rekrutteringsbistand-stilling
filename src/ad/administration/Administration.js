import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler'
import { Hovedknapp, Fareknapp, Knapp } from 'nav-frontend-knapper';
import AlertStripe from 'nav-frontend-alertstriper';
import Remarks from './Remarks';
import { StatusEnum } from "./StatusEnum";
import { SET_STATUS } from './../adReducer';
import './Administration.less';
import { TOGGLE_REMARKS_FORM } from "./administrationReducer";
import RemarksEnum from "./RemarksEnum";

export class Administration extends React.Component {
    onApproveClick = () => {
        this.props.setStatus(StatusEnum.APPROVED);
    };

    onRejectClick = () => {
        this.props.toggleRemarksForm();
        this.props.setStatus(StatusEnum.REJECTED);
    };

    onReopenClick = () => {
        this.props.setStatus(StatusEnum.PENDING);
    };

    onToggleRemarksFormClick = () => {
        this.props.toggleRemarksForm();
    };

    render() {
        const { status, remarks, showRemarksForm } = this.props;
        return (
            <Panel border className="Administration detail-section">
                <Undertittel className="blokk-xs">Behandling av stillingen</Undertittel>
                {status === StatusEnum.APPROVED && (
                    <AlertStripe solid type='suksess' className="Administration__status">
                        Godkjent
                    </AlertStripe>
                )}
                {status === StatusEnum.REJECTED && (
                    <AlertStripe solid type='advarsel' className="Administration__status">
                        <b>Avvist</b>: {remarks.map(remark => (RemarksEnum[remark].label)).join(', ')}
                    </AlertStripe>
                )}
                {status === StatusEnum.PENDING && (
                    <AlertStripe solid type='info' className="Administration__status">
                        Ikke behandlet
                    </AlertStripe>
                )}

                {!showRemarksForm && status === StatusEnum.PENDING && (
                    <div>
                        <Hovedknapp className="Administration__button" onClick={this.onApproveClick}>
                            Godkjenn
                        </Hovedknapp>
                        <Fareknapp className="Administration__button" onClick={this.onToggleRemarksFormClick}>
                            Avvis
                        </Fareknapp>
                        <Knapp className="Administration__button">
                            Neste
                        </Knapp>
                    </div>
                )}
                {!showRemarksForm && (status === StatusEnum.APPROVED || status === StatusEnum.REJECTED) && (
                    <div>
                        <Knapp className="Administration__button" onClick={this.onReopenClick}>
                            Gjennåpne
                        </Knapp>
                        <Knapp className="Administration__button">
                            Neste
                        </Knapp>
                    </div>
                )}
                {showRemarksForm && (
                    <div>
                        <Remarks />
                        <Fareknapp className="Administration__button"  onClick={this.onRejectClick}>
                            Avvis
                        </Fareknapp>
                        <Knapp className="Administration__button" onClick={this.onToggleRemarksFormClick}>
                            Avbryt
                        </Knapp>
                    </div>
                )}
            </Panel>
        );
    }
}

Administration.defaultProps = {
    status: undefined,
    remarks: undefined
};

Administration.propTypes = {
    status: PropTypes.string,
    remarks: PropTypes.arrayOf(PropTypes.string),
    showRemarksForm: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    status: state.ad.data.administration.status,
    remarks: state.ad.data.administration.remarks,
    showRemarksForm: state.administration.showRemarksForm
});

const mapDispatchToProps = (dispatch) => ({
    setStatus: (status) => dispatch({ type: SET_STATUS, status }),
    toggleRemarksForm: () => dispatch({ type: TOGGLE_REMARKS_FORM })
});

export default connect(mapStateToProps, mapDispatchToProps)(Administration);