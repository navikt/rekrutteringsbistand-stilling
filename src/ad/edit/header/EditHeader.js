import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import AdminStatusEnum from '../../administration/adminStatus/AdminStatusEnum';
import './EditHeader.less';
import AWithIcon from '../../../common/aWithIcon/AWithIcon';
import { DEFAULT_TITLE_NEW_AD } from '../../adReducer';
import { SET_AD_TITLE } from '../../adDataReducer';
import { createErrorObject } from '../../../common/utils';
import LeggTilKandidatModal from '../../kandidatModal/LeggTilKandidatModal';


class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKandidatModal: false
        };
    }

    onTitleChange = (e) => {
        this.props.setAdTitle(e.target.value);
    };

    getAdTitle = () => {
        // Hack for hiding the default title coming from backend
        if (this.props.ad.title === DEFAULT_TITLE_NEW_AD) {
            return '';
        } else {
            return this.props.ad.title || '';
        }
    };

    toggleKandidatModal = () => {
        this.setState({
            showKandidatModal: !this.state.showKandidatModal
        });
    };

    render() {
        const { onPreviewAdClick, validation, ad, status } = this.props;
        const { uuid, source } = ad;
        const showCandidateLinks = (status === AdminStatusEnum.DONE || status === AdminStatusEnum.ACTIVE)
            && source === 'DIR';

        return (
            <div>
                {this.state.showKandidatModal && (
                    <LeggTilKandidatModal
                        vis={this.state.showKandidatModal}
                        onClose={this.toggleKandidatModal}
                        stillingsId={ad.id}
                    />
                )}
                <div className="Ad__actions">
                    {showCandidateLinks && (
                        <AWithIcon
                            href={`/kandidater/stilling/${uuid}`}
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
                            href={`/kandidater/lister/stilling/${uuid}/detaljer`}
                            classNameText="typo-element"
                            classNameLink="Ad__actions-link CandidateList"
                            text="Se kandidatliste"
                        />
                    )}
                    <Knapp
                        className="Ad__actions-button"
                        onClick={onPreviewAdClick}
                        mini
                    >
                        Forhåndsvis stillingen
                    </Knapp>
                </div>
                <Input
                    inputClassName="EditHeader__AdTitle"
                    label={<Element>Overskrift på annonsen* </Element>}
                    value={this.getAdTitle()}
                    placeholder="For eksempel engasjert barnehagelærer til Oslo-skole"
                    onChange={this.onTitleChange}
                    feil={createErrorObject(validation.title)}
                />
                <Normaltekst className="blokk-xs">* felter du må fylle ut</Normaltekst>
            </div>
        );
    }
}

EditHeader.defaultProps = {
    status: undefined,
};

EditHeader.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        uuid: PropTypes.string,
        source: PropTypes.string
    }).isRequired,
    onPreviewAdClick: PropTypes.func.isRequired,
    status: PropTypes.string,
    setAdTitle: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    status: state.adData.administration.status,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setAdTitle: (title) => dispatch({ type: SET_AD_TITLE, title })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHeader);
