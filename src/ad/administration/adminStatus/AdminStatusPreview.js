import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import AdminStatusEnum from './AdminStatusEnum';

class AdminStatusPreview extends React.Component {
    render() {
        const { adminStatus, reportee } = this.props;

        return (
            <div className="AdminStatusPreview">
                {adminStatus === AdminStatusEnum.RECEIVED && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.PENDING && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
                    </Normaltekst>
                )}
                {adminStatus === AdminStatusEnum.DONE && (
                    <Normaltekst>
                        <b>Saksbehandler:</b> {reportee || 'Ingen'}
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
    reportee: PropTypes.string
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    reportee: state.adData.administration.reportee
});

export default connect(mapStateToProps)(AdminStatusPreview);
