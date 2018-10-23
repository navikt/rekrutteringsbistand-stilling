import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './AdminStatusPreview.less';

const AdminStatusPreview = ({ reportee }) => (
    <div className="AdminStatusPreview">
        <Normaltekst>
            <b>Saksbehandler: </b>
            {reportee || ''}
        </Normaltekst>
    </div>
);

AdminStatusPreview.defaultProps = {
    reportee: undefined
};

AdminStatusPreview.propTypes = {
    reportee: PropTypes.string
};

const mapStateToProps = (state) => ({
    reportee: state.adData.administration.reportee
});

export default connect(mapStateToProps)(AdminStatusPreview);
