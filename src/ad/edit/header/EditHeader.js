import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PropTypes from 'prop-types';

import { createErrorObject } from '../../../common/utils';
import { DEFAULT_TITLE_NEW_AD } from '../../adReducer';
import { SET_AD_TITLE } from '../../adDataReducer';
import Skjemaetikett from '../skjemaetikett/Skjemaetikett';

class EditHeader extends React.Component {
    onTitleChange = (e) => {
        this.props.setAdTitle(e.target.value.replace(/^\s+/g, '')); // Regex for å fjerne whitespace
    };

    getAdTitle = () => {
        // Hack for hiding the default title coming from backend
        if (this.props.ad.title === DEFAULT_TITLE_NEW_AD) {
            return '';
        }
        return this.props.ad.title || '';
    };

    render() {
        const { validation } = this.props;

        return (
            <Ekspanderbartpanel apen border tittel="Tittel på annonsen" className="blokk-s">
                <Skjemaetikett
                    påkrevd
                    inputId="endre-stilling-tittel"
                    beskrivelse={`For eksempel "engasjert barnehagelærer til Oslo-skole"`}
                    beskrivelseId="endre-stilling-tittel-hint"
                >
                    Overskrift på annonsen
                </Skjemaetikett>
                <Input
                    id="endre-stilling-tittel"
                    inputClassName="blokk-xs"
                    value={this.getAdTitle()}
                    onChange={this.onTitleChange}
                    aria-describedby="endre-stilling-tittel-hint"
                    feil={createErrorObject(validation.title)}
                />
            </Ekspanderbartpanel>
        );
    }
}

EditHeader.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        uuid: PropTypes.string,
        source: PropTypes.string,
    }).isRequired,
    onPreviewAdClick: PropTypes.func.isRequired,
    setAdTitle: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setAdTitle: (title) => dispatch({ type: SET_AD_TITLE, title }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHeader);
