import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './AdminStatusPreview.less';

const AdminStatusPreview = ({ reportee, navIdent }) => (
    <div className="AdminStatusPreview">
        <Normaltekst>
            <b>Registrert av: </b>
            {reportee || ''}
            {navIdent ? ` (${navIdent})` : ''}
        </Normaltekst>
    </div>
);

AdminStatusPreview.defaultProps = {
    reportee: undefined,
    navIdent: undefined
};

AdminStatusPreview.propTypes = {
    reportee: PropTypes.string,
    navIdent: PropTypes.string
};

const mapStateToProps = (state) => ({
    reportee: state.adData.administration.reportee,
    navIdent: state.adData.administration.navIdent
});

export default connect(mapStateToProps)(AdminStatusPreview);
