import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Undertekst } from 'nav-frontend-typografi';
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
                        <Undertekst><b>Saksbehandler:</b> {reportee || 'Ingen'}</Undertekst>
                        <Undertekst>
                            <b>Saksbehandlingsstatus:</b> Mottatt{' ('}
                            <button className="AdStatusEdit__links__lenke-button" onClick={this.onAssignToMeClick}>
                                Marker som min
                            </button>
                            {')'}
                        </Undertekst>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <div>
                        <Undertekst><b>Saksbehandler:</b> {reportee || 'Ingen'}</Undertekst>
                        <Undertekst>
                            <b>Saksbehandlingsstatus:</b> Under arbeid{' ('}
                            <button className="AdStatusEdit__links__lenke-button" onClick={this.onSetToReceivedClick}>
                               Avbryt
                            </button>
                            {')'}
                        </Undertekst>
                    </div>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <div>
                        <Undertekst><b>Saksbehandler:</b> {reportee || 'Ingen'}</Undertekst>
                        <Undertekst>
                            <b>Saksbehandlingsstatus:</b> Ferdig
                        </Undertekst>
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
