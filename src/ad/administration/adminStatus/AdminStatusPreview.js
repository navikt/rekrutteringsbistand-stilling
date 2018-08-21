import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import AdminStatusEnum from './AdminStatusEnum';
import { DISCARD_AD_CHANGES } from '../../adReducer';

class AdminStatusPreview extends React.Component {
    onCancelClick = (e) => {
        e.preventDefault();
        this.props.discardAdChanges();
    };

    render() {
        const { adminStatus, reportee } = this.props;

        return (
            <div className="AdminStatusPreview">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                        <br /><b>Saksbehandling:</b> Mottatt
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                        <br /><b>Saksbehandling:</b> Under behandling {' ('}
                        <a href="#" className="lenke typo-normal" onClick={this.onCancelClick}>
                            Avbryt
                        </a>{')'}
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                        <br /><b>Saksbehandling:</b> Ferdig
                    </Normaltekst>
                )}
            </div>
        );
    }
}

AdminStatusPreview.defaultProps = {
    reportee: undefined
};

AdminStatusPreview.propTypes = {
    adminStatus: PropTypes.string.isRequired,
    reportee: PropTypes.string,
    discardAdChanges: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    reportee: state.adData.administration.reportee
});

const mapDispatchToProps = (dispatch) => ({
    discardAdChanges: () => dispatch({ type: DISCARD_AD_CHANGES })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusPreview);
