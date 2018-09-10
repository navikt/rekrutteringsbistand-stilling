import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import './AdminStatusPreview.less';

class AdminStatusPreview extends React.Component {
    render() {
        const { reportee } = this.props;

        return (
            <div className="AdminStatusPreview">
                <Normaltekst><b>Saksbehandler:</b> {reportee || 'Ingen'}</Normaltekst>
            </div>
        );
    }
}

AdminStatusPreview.defaultProps = {
    reportee: undefined
};

AdminStatusPreview.propTypes = {
    reportee: PropTypes.string
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    reportee: state.adData.administration.reportee
});

export default connect(mapStateToProps)(AdminStatusPreview);
