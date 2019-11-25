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
        const { stilling, recruitment, innlogget } = this.props;
        const isDir = stilling && stilling.source === 'DIR';
        const hasRecruitment = recruitment && recruitment.eierNavident;
        const { reportee, navIdent } = stilling.administration;
        const contact =
            stilling.contactList && stilling.contactList.length
                ? stilling.contactList[0]
                : undefined;

        return isDir ? (
            <div className="ContactInfo__preview">
                <Element>Spørsmål om stillingen?</Element>
                <Normaltekst>
                    Kontaktperson hos NAV: {reportee} {navIdent ? ` (${navIdent})` : ''}
                </Normaltekst>
                {contact && contact.email && <Normaltekst>E-post: {contact.email}</Normaltekst>}
                {contact && contact.phone && <Normaltekst>Telefon: {contact.phone}</Normaltekst>}
            </div>
        ) : (
            <div>
                {hasRecruitment && (
                    <div className="ContactInfo__preview">
                        <Element>Spørsmål om stillingen?</Element>
                        <Normaltekst>
                            Kontaktperson hos NAV: {recruitment.eierNavn}{' '}
                            {recruitment.eierNavident ? ` (${recruitment.eierNavident})` : ''}
                        </Normaltekst>
                        {(!recruitment.eierNavident ||
                            (innlogget && recruitment.eierNavident != innlogget.navIdent)) && (
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
    recruitment: undefined,
};

ContactInfo.propTypes = {
    stilling: PropTypes.shape({
        source: PropTypes.string,
        administration: PropTypes.shape({
            reportee: PropTypes.string,
            navIdent: PropTypes.string,
        }),
    }),
    recruitment: PropTypes.shape({
        stillingsid: PropTypes.string,
        eierNavident: PropTypes.string,
        eierNavn: PropTypes.string,
    }),
};

const mapStateToProps = state => ({
    stilling: state.adData,
    recruitment: state.recruitmentData,
    innlogget: state.reportee.data,
});

const mapDispatchToProps = dispatch => ({
    markerSomMin: () => dispatch({ type: MARKER_SOM_MIN }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
