import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Comment from './comment/Comment';
import { EDIT_AD } from '../../adReducer';
import AdTitle from './AdTitle';
import CandidateActions from '../../candidateActions/CandidateActions';
import './PreviewHeader.less';


class PreviewMenu extends React.Component {

    onEditAdClick = () => {
        this.props.editAd();
    };

    onPrintClick = () => {
        window.print();
    };

    render() {
        const { stilling, comments } = this.props;
        const showContactHelp = (stilling && stilling.source === 'DIR');
        const { reportee, navIdent } = stilling.administration;

        return (
            <div>
                <div className="Ad__actions">
                    <CandidateActions />
                    <Hovedknapp
                        className="Ad__actions-button"
                        onClick={this.onEditAdClick}
                        mini
                    >
                        Rediger stillingen
                    </Hovedknapp>
                    <Knapp
                        className="button-print"
                        onClick={this.onPrintClick}
                        mini
                    >
                        Skriv ut
                    </Knapp>
                </div>
                { (showContactHelp || comments) && (
                    <div className="PreviewHeader">
                        {showContactHelp && (
                            <div className="PreviewHeader__Contact">
                                <div>
                                    <i className="Help__icon"/>
                                </div>
                                <div>
                                    <Element>Spørsmål om stillingen?</Element>
                                    <Normaltekst>
                                        Kontakt: {reportee} {navIdent ? ` (${navIdent})` : ''}
                                    </Normaltekst>
                                </div>
                            </div>
                        )}
                        <Comment />
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
    comments: undefined
};

PreviewMenu.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string,
        uuid: PropTypes.string,
        location: PropTypes.shape({
            address: PropTypes.string,
            municipal: PropTypes.string,
            country: PropTypes.string
        }),
        properties: PropTypes.shape({
            employer: PropTypes.string
        }),
        source: PropTypes.string
    }),
    editAd: PropTypes.func.isRequired,
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    stilling: state.adData,
    adminStatus: state.adData.administration.status,
    comments: state.adData.administration.comments
});

const mapDispatchToProps = (dispatch) => ({
    editAd: () => dispatch({ type: EDIT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
