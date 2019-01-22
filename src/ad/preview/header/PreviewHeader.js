import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Comment from './comment/Comment';
import { EDIT_AD } from '../../adReducer';
import AdminStatusEnum from '../../administration/adminStatus/AdminStatusEnum';
import AdTitle from './AdTitle';
import './PreviewHeader.less';
import AWithIcon from '../../../common/aWithIcon/AWithIcon';
import LeggTilKandidatModal from '../../kandidatModal/LeggTilKandidatModal';

class PreviewMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKandidatModal: false
        };
    }

    onEditAdClick = () => {
        this.props.editAd();
    };

    onPrintClick = () => {
        window.print();
    };

    toggleKandidatModal = () => {
        this.setState({
            showKandidatModal: !this.state.showKandidatModal
        });
    };

    render() {
        const { stilling, adminStatus, comments } = this.props;
        const showCandidateLinks = (adminStatus === AdminStatusEnum.DONE) && stilling && stilling.source === 'DIR';
        const showContactHelp = (stilling && stilling.source === 'DIR');
        const { reportee, navIdent } = stilling.administration;

        return (
            <div>
                {this.state.showKandidatModal &&
                    <LeggTilKandidatModal
                        vis={this.state.showKandidatModal}
                        onClose={this.toggleKandidatModal}
                        stillingsId={stilling.id}
                    />
                }
                <div className="Ad__actions">
                    {showCandidateLinks && (
                        <AWithIcon
                            href={`/kandidater/stilling/${stilling.uuid}`}
                            classNameText="typo-element"
                            classNameLink="Ad__actions-link FindCandidate"
                            text="Finn kandidater"
                        />
                    )}
                    {showCandidateLinks && (
                        <div
                            role="button"
                            className="Ad__actions-link"
                            onClick={this.toggleKandidatModal}
                        >
                            <AWithIcon
                                href={'#'}
                                classNameText="typo-element"
                                classNameLink="AddCandidate"
                                text="Legg til kandidat"
                            />
                        </div>
                    )}
                    {showCandidateLinks && (
                        <AWithIcon
                            href={`/kandidater/lister/stilling/${stilling.uuid}/detaljer`}
                            classNameText="typo-element"
                            classNameLink="Ad__actions-link CandidateList"
                            text="Se kandidatliste"
                        />
                    )}
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
    adminStatus: undefined,
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
    adminStatus: PropTypes.string,
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
