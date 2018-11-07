import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Comment from './comment/Comment'
import { EDIT_AD } from '../../adReducer';
import AdminStatusEnum from '../../administration/adminStatus/AdminStatusEnum';
import LinkWithIcon from '../../../common/linkWithIcon/LinkWithIcon';
import AdTitle from './AdTitle';
import './PreviewHeader.less';


class PreviewMenu extends React.Component {
    onEditAdClick = () => {
        this.props.editAd();
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
                            <Normaltekst className="TopSection__text">
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
                    {showCandidateLinks &&
                        <LinkWithIcon
                            to={`/kandidater/?id=${stilling.uuid}`}
                            classNameText="typo-element"
                            classNameLink="Ad__preview__menu-item FindCandidate"
                            text="Finn kandidater"/>
                    }
                    {showCandidateLinks &&
                        <LinkWithIcon
                            to={'#'}
                            classNameText="typo-element"
                            classNameLink="Ad__preview__menu-item AddCandidate"
                            text="Legg til kandidat"/>
                    }
                    {showCandidateLinks &&
                        <LinkWithIcon
                            to={'#'}
                            classNameText="typo-element"
                            classNameLink="Ad__preview__menu-item CandidateList"
                            text="Se kandidatliste"/>
                    }
                    <Knapp
                        className="Ad__preview__menu-button"
                        onClick={this.onEditAdClick}
                        mini
                    >
                        Rediger stillingen
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
        })
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
