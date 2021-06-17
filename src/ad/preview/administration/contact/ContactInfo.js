import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import {
    MARKER_EKSTERN_STILLING_SOM_MIN,
    MARKER_INTERN_STILLING_SOM_MIN,
} from '../../../adReducer';
import './ContactInfo.less';
import { erDirektemeldtStilling } from '../../../adUtils';
import MarkerSomMinModal from '../markerSomMinModal/MarkerSomMinModal';

class ContactInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMarkerSomMinStillingErÅpen: false,
        };
    }
    onMarkerSomMinKlikkEksternStilling = () => {
        this.props.markerEksternStillingSomMin();
        this.setState({ markerSomMinStillingModalErÅpen: false });
    };

    onMarkerSomMinKlikkInternStilling = () => {
        this.props.markerInternStillingSomMin();
        this.setState({ markerSomMinStillingModalErÅpen: false });
    };

    render() {
        const { stilling, stillingsinfo, innlogget } = this.props;
        const isDir = stilling && erDirektemeldtStilling(stilling.source);
        const hasStillingsinfo = stillingsinfo && stillingsinfo.eierNavident;
        const { reportee, navIdent } = stilling.administration;

        const markerSomMinKnappOgModal = () => (
            <>
                <Knapp
                    className="button-marker_som_min"
                    onClick={() => this.setState({ markerSomMinStillingModalErÅpen: true })}
                    mini
                >
                    Marker som min
                </Knapp>
                <MarkerSomMinModal
                    erÅpen={this.state.markerSomMinStillingModalErÅpen}
                    onAvbryt={() => this.setState({ markerSomMinStillingModalErÅpen: false })}
                    onMarkerSomMin={
                        isDir
                            ? this.onMarkerSomMinKlikkInternStilling
                            : this.onMarkerSomMinKlikkEksternStilling
                    }
                />
            </>
        );

        return isDir ? (
            <div className="ContactInfo__preview">
                <Element>Spørsmål om stillingen?</Element>
                <Normaltekst>
                    Kontaktperson hos NAV: {reportee} {navIdent ? ` (${navIdent})` : ''}
                </Normaltekst>
                {innlogget &&
                    innlogget.navIdent !== stilling.administration.navIdent &&
                    markerSomMinKnappOgModal()}
            </div>
        ) : (
            <>
                {hasStillingsinfo && (
                    <div className="ContactInfo__preview">
                        <Element>Spørsmål om stillingen?</Element>
                        <Normaltekst>
                            Kontaktperson hos NAV: {stillingsinfo.eierNavn}{' '}
                            {stillingsinfo.eierNavident ? ` (${stillingsinfo.eierNavident})` : ''}
                        </Normaltekst>
                        {(!stillingsinfo.eierNavident ||
                            (innlogget && stillingsinfo.eierNavident !== innlogget.navIdent)) &&
                            markerSomMinKnappOgModal()}
                    </div>
                )}
            </>
        );
    }
}

ContactInfo.defaultProps = {
    stilling: undefined,
    stillingsinfo: undefined,
};

ContactInfo.propTypes = {
    stilling: PropTypes.shape({
        source: PropTypes.string,
        administration: PropTypes.shape({
            reportee: PropTypes.string,
            navIdent: PropTypes.string,
        }),
    }),
    stillingsinfo: PropTypes.shape({
        stillingsid: PropTypes.string,
        eierNavident: PropTypes.string,
        eierNavn: PropTypes.string,
    }),
};

const mapStateToProps = (state) => ({
    stilling: state.adData,
    stillingsinfo: state.stillingsinfoData,
    innlogget: state.reportee.data,
});

const mapDispatchToProps = (dispatch) => ({
    markerEksternStillingSomMin: () => dispatch({ type: MARKER_EKSTERN_STILLING_SOM_MIN }),
    markerInternStillingSomMin: () => dispatch({ type: MARKER_INTERN_STILLING_SOM_MIN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
