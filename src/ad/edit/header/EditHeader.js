import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import './EditHeader.less';
import { DEFAULT_TITLE_NEW_AD, SHOW_HAS_CHANGES_MODAL } from '../../adReducer';
import { SET_AD_TITLE } from '../../adDataReducer';
import { createErrorObject } from '../../../common/utils';
import CandidateActions from '../../candidateActions/CandidateActions';


class EditHeader extends React.Component {

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

    render() {
        const { onPreviewAdClick, validation } = this.props;

        return (
            <div>
                <div className="Ad__actions">
                    <CandidateActions />
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
                    placeholder="For eksempel: engasjert barnehagelærer til Oslo-skole"
                    onChange={this.onTitleChange}
                    feil={createErrorObject(validation.title)}
                />
                <Normaltekst className="blokk-xs">* felter du må fylle ut</Normaltekst>
            </div>
        );
    }
}

EditHeader.defaultProps = {
    status: undefined
};

EditHeader.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        uuid: PropTypes.string,
        source: PropTypes.string
    }).isRequired,
    onPreviewAdClick: PropTypes.func.isRequired,
    status: PropTypes.string,
    hasChanges: PropTypes.bool.isRequired,
    setAdTitle: PropTypes.func.isRequired,
    showHasChangesModal: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    status: state.adData.administration.status,
    validation: state.adValidation.errors,
    hasChanges: state.ad.hasChanges
});

const mapDispatchToProps = (dispatch) => ({
    setAdTitle: (title) => dispatch({ type: SET_AD_TITLE, title }),
    showHasChangesModal: (leaveUrl) => dispatch({ type: SHOW_HAS_CHANGES_MODAL, leaveUrl })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHeader);
