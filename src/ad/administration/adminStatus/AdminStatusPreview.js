import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import AdminStatusEnum from './AdminStatusEnum';
import { SET_TO_RECEIVED, ASSIGN_TO_ME } from '../../adReducer';

class AdminStatusPreview extends React.Component {
    onSetToReceivedClick = (e) => {
        e.preventDefault();
        this.props.setToReceived();
    };

    onAssignToMeClick = (e) => {
        e.preventDefault();
        this.props.assignToMe();
    };

    render() {
        const { adminStatus, reportee } = this.props;

        return (
            <div className="AdminStatusPreview">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <div>
                        <Normaltekst><b>Saksbehandler:</b> {reportee || 'Ingen'}</Normaltekst>
                        <Normaltekst>
                            <b>Saksbehandlingsstatus:</b> Mottatt{' ('}
                            <button className="AdStatusEdit__links__lenke-button" onClick={this.onAssignToMeClick}>
                                Marker som min
                            </button>
                            {')'}
                        </Normaltekst>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <div>
                        <Normaltekst><b>Saksbehandler:</b> {reportee || 'Ingen'}</Normaltekst>
                        <Normaltekst>
                            <b>Saksbehandlingsstatus:</b> Under arbeid{' ('}
                            <button className="AdStatusEdit__links__lenke-button" onClick={this.onSetToReceivedClick}>
                               Sett tilbake til mottatt
                            </button>
                            {')'}
                        </Normaltekst>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <div>
                        <Normaltekst><b>Saksbehandler:</b> {reportee || 'Ingen'}</Normaltekst>
                        <Normaltekst>
                            <b>Saksbehandlingsstatus:</b> Ferdig
                        </Normaltekst>
                    </div>
                )}
            </div>
        );
    }
}

AdminStatusPreview.defaultProps = {
    reportee: undefined
};

AdminStatusPreview.propTypes = {
    setToReceived: PropTypes.func.isRequired,
    assignToMe: PropTypes.func.isRequired,
    adminStatus: PropTypes.string.isRequired,
    reportee: PropTypes.string
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    reportee: state.adData.administration.reportee
});

const mapDispatchToProps = (dispatch) => ({
    setToReceived: () => dispatch({ type: SET_TO_RECEIVED }),
    assignToMe: () => dispatch({ type: ASSIGN_TO_ME })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusPreview);
