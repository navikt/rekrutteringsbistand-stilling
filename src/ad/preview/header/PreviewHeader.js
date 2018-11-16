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


class PreviewMenu extends React.Component {
    onEditAdClick = () => {
        this.props.editAd();
    };

    onPrintClick = () => {
        window.print();
    };

    render() {
        const { stilling, status } = this.props;
        const showCandidateLinks = (status === AdminStatusEnum.DONE);
        const { reportee, navIdent } = stilling.administration;

        return (
            <div>
                <div className="Preview__TopSection">
                    <div className="Preview__TopSection__left">
                        <div>
                            <i className="Help__icon" />
                        </div>
                        <div>
                            <Element>Spørsmål om stillingen?</Element>
                            <Normaltekst>
                                Kontakt {reportee} {navIdent ? ` (${navIdent})` : '' }
                            </Normaltekst>
                        </div>
                    </div>
                    <div className="Preview__TopSection__right">
                        <Comment />
                    </div>
                </div>
                <AdTitle
                    title={stilling.title}
                    employer={stilling.properties.employer}
                    location={stilling.location}
                />
                <div className="Ad__preview__menu">
                    {showCandidateLinks && (
                        <AWithIcon
                            href={`/kandidater/stilling/${stilling.uuid}`}
                            classNameText="typo-element"
                            classNameLink="Ad__preview__menu-item FindCandidate"
                            text="Finn kandidater"
                        />
                    )}
                    {showCandidateLinks && stilling && stilling.source === 'DIR' && (
                        <AWithIcon
                            href={'#'}
                            classNameText="typo-element"
                            classNameLink="Ad__preview__menu-item AddCandidate"
                            text="Legg til kandidat"
                        />
                    )}
                    {showCandidateLinks && stilling && stilling.source === 'DIR' && (
                        <AWithIcon
                            href={`/kandidater/lister/stilling/${stilling.uuid}/detaljer`}
                            classNameText="typo-element"
                            classNameLink="Ad__preview__menu-item CandidateList"
                            text="Se kandidatliste"
                        />
                    )}
                    <Hovedknapp
                        className="Ad__preview__menu-button"
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
            </div>
        );
    }
}

PreviewMenu.defaultProps = {
    stilling: undefined,
    status: undefined
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
    status: PropTypes.string,
    editAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    stilling: state.adData,
    status: state.adData.administration.status
});

const mapDispatchToProps = (dispatch) => ({
    editAd: () => dispatch({ type: EDIT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
