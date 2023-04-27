import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import PropTypes from 'prop-types';

import { DEFAULT_TITLE_NEW_AD } from '../../adReducer';
import { SET_AD_TITLE } from '../../adDataReducer';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import { Accordion } from '@navikt/ds-react';

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
            <>
                <Accordion.Header title="Tittel på annonsen">Tittel på annonsen</Accordion.Header>
                <Accordion.Content>
                    <Skjemalabel
                        påkrevd
                        inputId="endre-stilling-tittel"
                        beskrivelse={`For eksempel «engasjert barnehagelærer til Oslo-skole»`}
                        className="blokk-s"
                    >
                        Overskrift på annonsen
                    </Skjemalabel>
                    <Input
                        id="endre-stilling-tittel"
                        className="blokk-xs"
                        value={this.getAdTitle()}
                        onChange={this.onTitleChange}
                        aria-describedby="endre-stilling-tittel-beskrivelse"
                        feil={validation.title}
                    />
                </Accordion.Content>
            </>
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
