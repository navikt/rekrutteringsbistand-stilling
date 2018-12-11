import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import AdminStatusEnum from '../../administration/adminStatus/AdminStatusEnum';
import './EditHeader.less';
import AWithIcon from '../../../common/aWithIcon/AWithIcon';
import { SAVE_AD, SET_EDIT_TITLE, TOGGLE_EDIT_TITLE } from '../../adReducer';
import { SET_AD_TITLE } from '../../adDataReducer';
import { connect } from 'react-redux';

const headerClassName = (feil) => {
    return `skjemaelement__input Ad__edit__top-section-input ${feil ? 'skjemaelement__input--harFeil' : ''}`;
};

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();

        this.state = {
            validationError: false
        };
    }

    handleTitleInput = (event) => {
        const { setEditTitle } = this.props;
        setEditTitle(event.target.value);
    };

    handleEditToggle = () => {
        const { isEditingTitle, toggleEditTitle, setEditTitle } = this.props;
        setEditTitle(this.props.stilling.title);

        if (isEditingTitle) {
            this.setState({ validationError: false });
        }

        toggleEditTitle();
    };

    handleSaveTitle = () => {
        const { toggleEditTitle, saveTitle, saveAd } = this.props;
        const value = this.titleInput.current.value;

        if (value && value !== '') {
            saveTitle(value);
            saveAd();
            toggleEditTitle();
        } else {
            this.setState({ validationError: true })
        }
    };

    render() {
        const { isEditingTitle, editTitle, onPreviewAdClick, isNew, validation } = this.props;
        const { uuid, status, title, source } = this.props.stilling;
        const showCandidateLinks = (status === AdminStatusEnum.DONE || status === AdminStatusEnum.ACTIVE) && source === 'DIR';

        return (
            <div>
                {isEditingTitle ? (
                    <div className={"Ad__edit__top-section"}>
                        <input
                            type="text"
                            onChange={this.handleTitleInput}
                            className={headerClassName(validation.title || this.state.validationError)}
                            value={editTitle}
                            ref={this.titleInput}
                            autoFocus
                        />
                        <Knapp
                            className="Ad__edit__top-section-button knapp--hoved"
                            onClick={this.handleSaveTitle}
                            mini
                        >
                            Lagre
                        </Knapp>
                        <Knapp
                            className="Ad__edit__top-section-button"
                            onClick={this.handleEditToggle}
                            mini
                        >
                            Avbryt
                        </Knapp>
                    </div>
                ) : (
                    <div className={"Ad__edit__top-section"}>
                        <Sidetittel className="Ad__edit__menu-title">{title || editTitle}</Sidetittel>
                        {!isNew &&
                            <div
                                role="button"
                                className="Ad__edit__top-section-item"
                                onClick={this.handleEditToggle}
                            >
                                <AWithIcon
                                    classNameText="typo-element"
                                    classNameLink="Ad__edit__menu-item EditAd"
                                    text="Rediger"
                                />
                            </div>
                        }
                    </div>
                )}
                <div role="alert" aria-live="assertive">
                    {(validation.title || this.state.validationError) && <div className="skjemaelement__feilmelding">{'Overskrift på stillingen mangler'}</div>}
                </div>
                <Normaltekst>* er obligatoriske felter du må fylle ut</Normaltekst>
                <div className="Ad__edit__menu">
                    {showCandidateLinks && (
                        <AWithIcon
                            href={`/kandidater/stilling/${uuid}`}
                            classNameText="typo-element"
                            classNameLink="Ad__edit__menu-item FindCandidate"
                            text="Finn kandidater"
                        />
                    )}
                    {showCandidateLinks && (
                        <AWithIcon
                            href={'#'}
                            classNameText="typo-element"
                            classNameLink="Ad__edit__menu-item AddCandidate"
                            text="Legg til kandidat"
                        />
                    )}
                    {showCandidateLinks && (
                        <AWithIcon
                            href={`/kandidater/lister/stilling/${uuid}/detaljer`}
                            classNameText="typo-element"
                            classNameLink="Ad__edit__menu-item CandidateList"
                            text="Se kandidatliste"
                        />
                    )}
                    <Knapp
                        className="Ad__edit__menu-button"
                        onClick={onPreviewAdClick}
                        mini
                    >
                        Forhåndsvis stillingen
                    </Knapp>
                </div>
            </div>
        );
    }
}

EditHeader.defaultProps = {
    status: undefined
};

EditHeader.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string,
        uuid: PropTypes.string,
        source: PropTypes.string
    }),
    onPreviewAdClick: PropTypes.func.isRequired,
    status: PropTypes.string,
    toggleEditTitle: PropTypes.func.isRequired,
    setEditTitle: PropTypes.func.isRequired,
    editTitle: PropTypes.string.isRequired,
    saveTitle: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    isNew: PropTypes.bool
};

const mapStateToProps = (state) => ({
    stilling: state.adData,
    status: state.adData.administration.status,
    isEditingTitle: state.ad.isEditingTitle,
    editTitle: state.ad.editTitle,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditTitle: () => dispatch({ type: TOGGLE_EDIT_TITLE }),
    setEditTitle: (title) => dispatch({ type: SET_EDIT_TITLE, title }),
    saveTitle: (title) => dispatch({ type: SET_AD_TITLE, title }),
    saveAd: () => dispatch({ type: SAVE_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHeader);
