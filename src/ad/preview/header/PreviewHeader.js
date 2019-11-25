import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { EDIT_AD, LEGG_TIL_I_MINE_STILLINGER } from '../../adReducer';
import AdTitle from './AdTitle';
import CandidateActions from '../../candidateActions/CandidateActions';
import Alertstripe from 'nav-frontend-alertstriper';
import './PreviewHeader.less';

class PreviewMenu extends React.Component {
    onEditAdClick = () => {
        this.props.editAd();
    };

    onPrintClick = () => {
        window.print();
    };

    onLeggTilIMineStillingerClick = () => {
        this.props.leggTilIMineStillinger();
    };

    render() {
        const { stilling, limitedAccess, rekruttering } = this.props;

        const kanOverfoereStilling = rekruttering && limitedAccess && !rekruttering.eierNavident;

        return (
            <div>
                <div className="Ad__actions">
                    <CandidateActions />
                    <div>
                        {!limitedAccess && (
                            <Hovedknapp
                                className="Ad__actions-button"
                                onClick={this.onEditAdClick}
                                mini
                            >
                                Rediger stillingen
                            </Hovedknapp>
                        )}
                        {kanOverfoereStilling && (
                            <Knapp
                                className="button-legg-i-mine-stillinger"
                                onClick={this.onLeggTilIMineStillingerClick}
                                mini
                            >
                                Opprett kandidatliste
                            </Knapp>
                        )}
                        <Knapp className="button-print" onClick={this.onPrintClick} mini>
                            Skriv ut
                        </Knapp>
                    </div>
                </div>
                {limitedAccess && (
                    <div className="Ad__info">
                        <Alertstripe
                            className="AdStatusPreview__Alertstripe"
                            type="info"
                            solid="true"
                        >
                            Dette er en eksternt utlyst stilling. Du kan <b>ikke</b> endre
                            stillingen.
                        </Alertstripe>
                    </div>
                )}
                <AdTitle
                    title={stilling.title}
                    employer={stilling.properties.employer}
                    location={stilling.location}
                />
            </div>
        );
    }
}

PreviewMenu.defaultProps = {
    stilling: undefined,
};

PreviewMenu.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string,
        location: PropTypes.shape({
            address: PropTypes.string,
            municipal: PropTypes.string,
            country: PropTypes.string,
        }),
        properties: PropTypes.shape({
            employer: PropTypes.string,
        }),
    }),
    editAd: PropTypes.func.isRequired,
    rekruttering: PropTypes.shape({
        stillingsid: PropTypes.string,
        eierNavident: PropTypes.string,
        eierNavn: PropTypes.string,
    }),
};

const mapStateToProps = state => ({
    rekruttering: state.recruitmentData,
    stilling: state.adData,
    adminStatus: state.adData.administration.status,
    limitedAccess: state.adData.createdBy !== 'pam-rekrutteringsbistand',
    reportee: state.reportee.data,
});

const mapDispatchToProps = dispatch => ({
    editAd: () => dispatch({ type: EDIT_AD }),
    leggTilIMineStillinger: () => dispatch({ type: LEGG_TIL_I_MINE_STILLINGER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
