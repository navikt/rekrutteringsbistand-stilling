import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MARKER_SOM_MIN } from '../../../adReducer';
import './ContactInfo.less';

class ContactInfo extends React.Component {
    onMarkerSomMinClick = () => {
        this.props.markerSomMin();
    };

    render() {
        const { stilling, stillingsinfo, innlogget } = this.props;
        const isDir = stilling && stilling.source === 'DIR';
        const hasStillingsinfo = stillingsinfo && stillingsinfo.eierNavident;
        const { reportee, navIdent } = stilling.administration;

        return isDir ? (
            <div className="ContactInfo__preview">
                <Element>Spørsmål om stillingen?</Element>
                <Normaltekst>
                    Kontaktperson hos NAV: {reportee} {navIdent ? ` (${navIdent})` : ''}
                </Normaltekst>
            </div>
        ) : (
            <div>
                {hasStillingsinfo && (
                    <div className="ContactInfo__preview">
                        <Element>Spørsmål om stillingen?</Element>
                        <Normaltekst>
                            Kontaktperson hos NAV: {stillingsinfo.eierNavn}{' '}
                            {stillingsinfo.eierNavident ? ` (${stillingsinfo.eierNavident})` : ''}
                        </Normaltekst>
                        {(!stillingsinfo.eierNavident ||
                            (innlogget && stillingsinfo.eierNavident != innlogget.navIdent)) && (
                            <Knapp
                                className="button-marker_som_min"
                                onClick={this.onMarkerSomMinClick}
                                mini
                            >
                                Marker som min
                            </Knapp>
                        )}
                    </div>
                )}
            </div>
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
    markerSomMin: () => dispatch({ type: MARKER_SOM_MIN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
