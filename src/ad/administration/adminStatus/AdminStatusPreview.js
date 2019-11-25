import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './AdminStatusPreview.less';
import { Flatknapp } from 'nav-frontend-knapper';
import { SET_REPORTEE, SET_NAV_IDENT } from '../../adDataReducer';
import { SAVE_AD } from '../../adReducer';

class AdminStatusPreview extends React.Component {
    onMarkAsMineClick = () => {
        const { reportee, setReportee, setNavIdent, saveAd } = this.props;
        setReportee(reportee.displayName);
        setNavIdent(reportee.navIdent);
        saveAd();
    };

    render() {
        const { administration, reportee } = this.props;
        return (
            <div className="AdminStatusPreview">
                <div>
                    <Normaltekst>
                        <b>Registrert av: </b>
                        {administration.reportee || ''}
                        {administration.navIdent ? ` (${administration.navIdent})` : ''}
                    </Normaltekst>
                </div>
                {reportee && reportee.navIdent !== administration.navIdent && (
                    <div>
                        <Flatknapp mini onClick={this.onMarkAsMineClick}>
                            Marker som min
                        </Flatknapp>
                    </div>
                )}
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
    reportee: PropTypes.shape({
        navIdent: PropTypes.string,
        displayName: PropTypes.string,
    }).isRequired,
    setReportee: PropTypes.func.isRequired,
    setNavIdent: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    setReportee: reportee => dispatch({ type: SET_REPORTEE, reportee }),
    setNavIdent: navIdent => dispatch({ type: SET_NAV_IDENT, navIdent }),
    saveAd: () => dispatch({ type: SAVE_AD }),
});

const mapStateToProps = state => ({
    administration: state.adData.administration,
    reportee: state.reportee.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusPreview);
