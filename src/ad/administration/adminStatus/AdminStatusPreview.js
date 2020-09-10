import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './AdminStatusPreview.less';

class AdminStatusPreview extends React.Component {
    render() {
        const { administration } = this.props;
        return (
            <div className="AdminStatusPreview">
                <Normaltekst>
                    <b>Registrert av: </b>
                    {administration.reportee || ''}
                    {administration.navIdent ? ` (${administration.navIdent})` : ''}
                </Normaltekst>
            </div>
        );
    }
}

AdminStatusPreview.defaultProps = {
    administration: {},
};

AdminStatusPreview.propTypes = {
    administration: PropTypes.shape({
        reportee: PropTypes.string,
        navIdent: PropTypes.string,
    }),
};

const mapStateToProps = (state) => ({
    administration: state.adData.administration,
});

export default connect(mapStateToProps, null)(AdminStatusPreview);
