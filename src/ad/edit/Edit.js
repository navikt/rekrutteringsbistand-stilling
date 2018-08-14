import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import {
    SET_AD_TEXT,
    SET_AD_TITLE, SET_APPLICATIONDUE, SET_APPLICATIONEMAIL, SET_APPLICATIONURL,
    SET_EMPLOYER, SET_EMPLOYERDESCRIPTION,
    SET_EMPLOYMENT_EXTENT,
    SET_EMPLOYMENT_JOBARRANGEMENT,
    SET_EMPLOYMENT_JOBTITLE,
    SET_EMPLOYMENT_LOCATION, SET_EMPLOYMENT_POSITIONCOUNT,
    SET_EMPLOYMENT_SECTOR, SET_EMPLOYMENT_STARTTIME, SET_EMPLOYMENT_WORKDAY,
    SET_EMPLOYMENT_WORKHOURS, SET_EXPIRATION_DATE, SET_ID, SET_LAST_UPDATED,
    SET_LOCATION_ADDRESS, SET_MEDIUM, SET_PUBLISHED, SET_REFERENCE, SET_SOURCEURL
} from '../adReducer';
import PostalCode from './postalCode/PostalCode';
import './Edit.less';
import Styrk from './styrk/Styrk';
import EngagementType from './engagementType/EngagementType';

export const createEmptyOrHTMLStringFromRTEValue = (rteValue) => {
    const emptySpaceOrNotWordRegex = /^(\s|\W)+$/g;
    const textMarkdown = rteValue.toString('markdown');
    let newText = '';
    if (textMarkdown.search(emptySpaceOrNotWordRegex) < 0) {
        newText = rteValue.toString('html');
    }

    return newText;
};

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adText: this.props.ad.properties.adtext ? RichTextEditor.createValueFromString(this.props.ad.properties.adtext, 'html') : null,
            employerDescription: this.props.ad.properties.employerdescription ? RichTextEditor.createValueFromString(this.props.ad.properties.employerdescription, 'html') : null
        };
    }

    onTitleChange = (e) => {
        this.props.setAdTitle(e.target.value);
    };

    onJobtitleChange = (e) => {
        this.props.setJobTitle(e.target.value);
    };

    onLocationChange = (e) => {
        this.props.setEmploymentLocation(e.target.value);
    };

    onExtentChange = (e) => {
        this.props.setExtent(e.target.value);
    };

    onPositioncountChange = (e) => {
        this.props.setPositionCount(e.target.value);
    };

    onSectorChange = (e) => {
        this.props.setSector(e.target.value);
    };

    onWorkdayChange = (e) => {
        this.props.setWorkDay(e.target.value);
    };

    onWorkhoursChange = (e) => {
        this.props.setWorkHours(e.target.value);
    };

    onJobarrangementChange = (e) => {
        this.props.setJobArrangement(e.target.value);
    };

    onStarttimeChange = (e) => {
        this.props.setStartTime(e.target.value);
    };

    onAddressChange = (e) => {
        this.props.setAddress(e.target.value);
    };

    onApplicationDueChange = (e) => {
        this.props.setApplicationDue(e.target.value);
    };

    onApplicationEmailChange = (e) => {
        this.props.setApplicationEmail(e.target.value);
    };

    onApplicationUrlChange = (e) => {
        this.props.setApplicationUrl(e.target.value);
    };

    onSourceUrlChange = (e) => {
        this.props.setSourceUrl(e.target.value);
    };

    onEmployerChange = (e) => {
        this.props.setEmployer(e.target.value);
    };

    onEmployerDescriptionChange = (employerDescription) => {
        this.setState({
            employerDescription
        });
        const newText = createEmptyOrHTMLStringFromRTEValue(employerDescription);
        this.props.setEmployerDescription(newText);
    };

    onPublishedChange = (e) => {
        this.props.setPublished(e.target.value);
    };

    onLastUpdatedChange = (e) => {
        this.props.setLastUpdated(e.target.value);
    };

    onMediumChange = (e) => {
        this.props.setMedium(e.target.value);
    };

    onIdChange = (e) => {
        this.props.setId(e.target.value);
    };

    onReferenceChange = (e) => {
        this.props.setReference(e.target.value);
    };

    onExpiresChange = (e) => {
        this.props.setExpirationDate(e.target.value);
    };

    onAdTextChange = (adText) => {
        this.setState({
            adText
        });
        const newText = createEmptyOrHTMLStringFromRTEValue(adText);
        this.props.setAdText(newText);
    };

    render() {
        const { ad, validation } = this.props;
        const toolbarConfig = {
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
                { label: 'Fet', style: 'BOLD', className: 'custom-css-class' },
                { label: 'Kursiv', style: 'ITALIC' },
                { label: 'Gjennomstreking', style: 'STRIKETHROUGH' },
                { label: 'Monospace', style: 'CODE' },
                { label: 'Understreking', style: 'UNDERLINE' }
            ],
            BLOCK_TYPE_DROPDOWN: [
                { label: 'Normal', style: 'unstyled' },
                { label: 'Overskrift stor', style: 'header-one' },
                { label: 'Overskrift medium', style: 'header-two' },
                { label: 'Overskrift liten', style: 'header-three' }
            ],
            BLOCK_TYPE_BUTTONS: [
                { label: 'Punkt', style: 'unordered-list-item' },
                { label: 'Tall', style: 'ordered-list-item' },
                { label: 'Sitat', style: 'blockquote' }
            ]
        };

        return (
            <div className="Edit__details">
                <Input
                    label="Tittel"
                    value={ad.title}
                    onChange={this.onTitleChange}
                    className="typo-normal Edit__title"
                    feil={validation.title ? { feilmelding: validation.title } : undefined}
                />
                <RichTextEditor
                    toolbarConfig={toolbarConfig}
                    className="Edit__rte"
                    value={this.state.adText || RichTextEditor.createEmptyValue()}
                    onChange={this.onAdTextChange}
                />
                <Undertittel className="Edit__title-employer">Om arbeidsgiver</Undertittel>
                <RichTextEditor
                    toolbarConfig={toolbarConfig}
                    className="Edit__rte"
                    value={this.state.employerDescription || RichTextEditor.createEmptyValue()}
                    onChange={this.onEmployerDescriptionChange}
                />
                <Ekspanderbartpanel className="Edit__panel" tittel="STYRK-kode" tittelProps="undertittel" border apen>
                    <Styrk />
                </Ekspanderbartpanel>
                <Ekspanderbartpanel className="Edit__panel" tittel="Sted" tittelProps="undertittel" border apen>
                    <Input
                        label="Gateadresse"
                        value={ad.location && ad.location.address ? ad.location.address : ''}
                        onChange={this.onAddressChange}
                        className="typo-normal"
                    />
                    <PostalCode />
                </Ekspanderbartpanel>
                <Ekspanderbartpanel className="Edit__panel" tittel="Søknad" tittelProps="undertittel" border>
                    <Input
                        label="Søknadsfrist"
                        value={ad.properties.applicationdue || ''}
                        onChange={this.onApplicationDueChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Send søknad til"
                        value={ad.properties.applicationemail || ''}
                        onChange={this.onApplicationEmailChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Søknadslenke"
                        value={ad.properties.applicationurl || ''}
                        onChange={this.onApplicationUrlChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Kildelenke"
                        value={ad.properties.sourceurl || ''}
                        onChange={this.onSourceUrlChange}
                        className="typo-normal"
                    />
                </Ekspanderbartpanel>
                <Ekspanderbartpanel className="Edit__panel" tittel="Om stillingen" tittelProps="undertittel" border>
                    <Input
                        label="Stillingstittel"
                        value={ad.properties.jobtitle || ''}
                        onChange={this.onJobtitleChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Arbeidssted"
                        value={ad.properties.location || ''}
                        onChange={this.onLocationChange}
                        className="typo-normal"
                    />
                    <EngagementType />
                    <Input
                        label="Heltid/deltid"
                        value={ad.properties.extent || ''}
                        onChange={this.onExtentChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Antall stillinger"
                        value={ad.properties.positioncount || ''}
                        onChange={this.onPositioncountChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Sektor"
                        value={ad.properties.sector || ''}
                        onChange={this.onSectorChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Arbeidsdager"
                        value={ad.properties.workday || ''}
                        onChange={this.onWorkdayChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Arbeidstid"
                        value={ad.properties.workhours || ''}
                        onChange={this.onWorkhoursChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Arb.tidordning"
                        value={ad.properties.jobarrangement || ''}
                        onChange={this.onJobarrangementChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Oppstart"
                        value={ad.properties.starttime || ''}
                        onChange={this.onStarttimeChange}
                        className="typo-normal"
                    />
                </Ekspanderbartpanel>
                <Ekspanderbartpanel className="Edit__panel" tittel="Om arbeidsgiver" tittelProps="undertittel" border>
                    <Input
                        label="Arbeidsgiver"
                        value={ad.properties.employer || ''}
                        onChange={this.onEmployerChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Arbeidsgiver"
                        value={ad.properties.employerdescription || ''}
                        onChange={this.onEmployerDescriptionChange}
                        className="typo-normal"
                    />
                </Ekspanderbartpanel>
                <Ekspanderbartpanel className="Edit__panel" tittel="Om annonsen" tittelProps="undertittel" border>
                    <Input
                        label="Publisert"
                        value={ad.published || ''}
                        onChange={this.onPublishedChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Sist endret"
                        value={ad.updated || ''}
                        onChange={this.onLastUpdatedChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Hentet fra"
                        value={ad.medium || ''}
                        onChange={this.onMediumChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Løpenr"
                        value={ad.id || ''}
                        onChange={this.onIdChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Referanse"
                        value={ad.reference || ''}
                        onChange={this.onReferenceChange}
                        className="typo-normal"
                    />
                    <Input
                        label="Utløpsdato"
                        value={ad.expires || ''}
                        onChange={this.onExpiresChange}
                        className="typo-normal"
                    />
                </Ekspanderbartpanel>
            </div>
        );
    }
}


Edit.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    setAdTitle: PropTypes.func.isRequired,
    setJobTitle: PropTypes.func.isRequired,
    setEmploymentLocation: PropTypes.func.isRequired,
    setExtent: PropTypes.func.isRequired,
    setPositionCount: PropTypes.func.isRequired,
    setSector: PropTypes.func.isRequired,
    setWorkDay: PropTypes.func.isRequired,
    setWorkHours: PropTypes.func.isRequired,
    setJobArrangement: PropTypes.func.isRequired,
    setStartTime: PropTypes.func.isRequired,
    setAddress: PropTypes.func.isRequired,
    setApplicationDue: PropTypes.func.isRequired,
    setApplicationEmail: PropTypes.func.isRequired,
    setApplicationUrl: PropTypes.func.isRequired,
    setSourceUrl: PropTypes.func.isRequired,
    setEmployer: PropTypes.func.isRequired,
    setEmployerDescription: PropTypes.func.isRequired,
    setLastUpdated: PropTypes.func.isRequired,
    setMedium: PropTypes.func.isRequired,
    setId: PropTypes.func.isRequired,
    setReference: PropTypes.func.isRequired,
    setExpirationDate: PropTypes.func.isRequired,
    setAdText: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ad: state.ad.data,
    validation: state.ad.validation
});

const mapDispatchToProps = (dispatch) => ({
    setAdTitle: (title) => dispatch({ type: SET_AD_TITLE, title }),
    setJobTitle: (jobtitle) => dispatch({ type: SET_EMPLOYMENT_JOBTITLE, jobtitle }),
    setEmploymentLocation: (location) => dispatch({ type: SET_EMPLOYMENT_LOCATION, location }),
    setExtent: (extent) => dispatch({ type: SET_EMPLOYMENT_EXTENT, extent }),
    setPositionCount: (positioncount) => dispatch({ type: SET_EMPLOYMENT_POSITIONCOUNT, positioncount }),
    setSector: (sector) => dispatch({ type: SET_EMPLOYMENT_SECTOR, sector }),
    setWorkDay: (workday) => dispatch({ type: SET_EMPLOYMENT_WORKDAY, workday }),
    setWorkHours: (workhours) => dispatch({ type: SET_EMPLOYMENT_WORKHOURS, workhours }),
    setJobArrangement: (jobarrangement) => dispatch({ type: SET_EMPLOYMENT_JOBARRANGEMENT, jobarrangement }),
    setStartTime: (starttime) => dispatch({ type: SET_EMPLOYMENT_STARTTIME, starttime }),
    setAddress: (address) => dispatch({ type: SET_LOCATION_ADDRESS, address }),
    setApplicationDue: (applicationdue) => dispatch({ type: SET_APPLICATIONDUE, applicationdue }),
    setApplicationEmail: (applicationemail) => dispatch({ type: SET_APPLICATIONEMAIL, applicationemail }),
    setApplicationUrl: (applicationurl) => dispatch({ type: SET_APPLICATIONURL, applicationurl }),
    setSourceUrl: (sourceurl) => dispatch({ type: SET_SOURCEURL, sourceurl }),
    setEmployer: (employer) => dispatch({ type: SET_EMPLOYER, employer }),
    setEmployerDescription: (employerdescription) => dispatch({ type: SET_EMPLOYERDESCRIPTION, employerdescription }),
    setPublished: (published) => dispatch({ type: SET_PUBLISHED, published }),
    setLastUpdated: (updated) => dispatch({ type: SET_LAST_UPDATED, updated }),
    setMedium: (medium) => dispatch({ type: SET_MEDIUM, medium }),
    setId: (id) => dispatch({ type: SET_ID, id }),
    setReference: (reference) => dispatch({ type: SET_REFERENCE, reference }),
    setExpirationDate: (expires) => dispatch({ type: SET_EXPIRATION_DATE, expires }),
    setAdText: (adtext) => dispatch({ type: SET_AD_TEXT, adtext })
});


export default connect(mapStateToProps, mapDispatchToProps)(Edit);
