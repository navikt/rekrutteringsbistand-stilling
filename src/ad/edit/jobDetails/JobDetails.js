import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import RichTextEditor from '../richTextEditor/RichTextEditor';
import {
    SET_AD_TITLE,
    SET_AD_TEXT,
    SET_EMPLOYMENT_JOBTITLE,
} from '../../adDataReducer';
import {DEFAULT_TITLE, DEFAULT_TITLE_NEW_AD} from '../../adReducer';
import Styrk from './styrk/Styrk';


class JobDetails extends React.Component {


    getAdTitle = () => {
        // Hack for hiding the default title coming from backend
        if (this.props.ad.title === DEFAULT_TITLE || this.props.ad.title === DEFAULT_TITLE_NEW_AD) {
            return '';
        } else {
            return this.props.ad.title || '';
        }
    };

    onTitleChange = (e) => {
        this.props.setAdTitle(e.target.value);
    };

    onJobtitleChange = (e) => {
        this.props.setJobTitle(e.target.value);
    };

    onAdTextChange = (adText) => {
        // This function is triggered first time adText is in focus before any letter is written.
        // In this case, just return to avoid the error message from showing before any edits are done.
        if((this.props.ad.properties.adtext === undefined) && (adText === '')){
            return;
        }

        this.props.setAdText(adText);
    };

    createErrorObject = (errorMessage) => {
        return errorMessage ? {feilmelding: errorMessage} : null;
    };

    render() {
        const { ad, isNew } = this.props;
        return (
            <Ekspanderbartpanel
                tittel="Om stillingen"
                tittelProps="undertittel"
                className="blokk-s"
                border
                apen
            >

                {isNew &&
                    <Input
                        label={`${DEFAULT_TITLE}*`}
                        value={this.getAdTitle()}
                        placeholder="For eksempel: Engasjert barnehagelærer til Oslo-skole"
                        onChange={this.onTitleChange}
                        feil={this.createErrorObject(this.props.validation.title)}
                    />
                }
                <Styrk />
                <Input
                    label="Stilling/yrke"
                    value={ad.properties.jobtitle || ''}
                    onChange={this.onJobtitleChange}
                    placeholder="Yrket som vises på stillingen"
                />
                <div className="blokk-xxs"><Normaltekst>Stillingstekst*</Normaltekst></div>
                <div className="Edit__JobDetails__rteEditor-content">
                    <RichTextEditor
                        text={ad.properties.adtext || ''}
                        onChange={this.onAdTextChange}
                        errorMessage={this.props.validation.adText}
                    />
                </div>
            </Ekspanderbartpanel>
        );
    }
}

JobDetails.defaultProps = {
};

JobDetails.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string
    }),
    setAdText: PropTypes.func.isRequired,
    setAdTitle: PropTypes.func.isRequired,
    setJobTitle: PropTypes.func.isRequired,
    isSaved: PropTypes.bool
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setAdTitle: (title) => dispatch({ type: SET_AD_TITLE, title }),
    setJobTitle: (jobtitle) => dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle }),
    setAdText: (adtext) => dispatch({ type: SET_AD_TEXT, adtext })
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
