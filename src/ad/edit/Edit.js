import React from 'react';
import PropTypes from 'prop-types';
import { Input, SkjemaGruppe, Radio, Checkbox } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import {
    SET_AD_TEXT,
    SET_AD_TITLE, SET_APPLICATIONDUE, SET_APPLICATIONEMAIL, SET_APPLICATIONURL,
    SET_EMPLOYER, SET_EMPLOYER_ADDRESS,
    SET_EMPLOYMENT_EXTENT,
    SET_EMPLOYMENT_JOBTITLE,
    SET_EMPLOYMENT_LOCATION, SET_EMPLOYMENT_POSITIONCOUNT,
    SET_EMPLOYMENT_SECTOR, SET_EMPLOYMENT_STARTTIME, SET_EMPLOYMENT_WORKDAY,
    SET_EMPLOYMENT_WORKHOURS, SET_ID, SET_LAST_UPDATED,
    SET_MEDIUM, SET_REFERENCE, SET_SOURCEURL
} from '../adDataReducer';
import './Edit.less';
import EngagementType from './engagementType/EngagementType';
import RichTextEditor from './richTextEditor/RichTextEditor';
import JobArrangement from './jobArrangement/JobArrangement';
import Requirements from './requirements/Requirements'
import Employer from './employer/Employer';
import Loading from '../../common/loading/Loading';
import ContactPerson from './contactPerson/ContactPerson';

class Edit extends React.Component {
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

    onStarttimeChange = (e) => {
        this.props.setStartTime(e.target.value);
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

    onEmployerAddressChange = (e) => {
        this.props.setEmployerAddress(e.target.value);
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

    onAdTextChange = (adText) => {
        this.props.setAdText(adText);
    };

    render() {
        const { ad, isFetchingStilling, validation } = this.props;

        if (isFetchingStilling) {
            return (
                <Loading />
            );
        }

        return (
            <div className="Edit">
                <Row className="Edit__inner">
                    <Column xs="12" md="8">
                        <div className="Edit__left">
                            <Employer />
                            <Ekspanderbartpanel
                                tittel="Om Stillingen"
                                tittelProps="undertittel"
                                className="blokk-s"
                                border
                                apen
                            >
                                <Input
                                    label="Overskift på annonsen*"
                                    value={ad.title || ''}
                                    onChange={this.onTitleChange}
                                    feil={validation.title ? { feilmelding: validation.title } : undefined}
                                />
                                <Input
                                    label="Stilling/yrke*"
                                    value={ad.properties.jobtitle || ''}
                                    onChange={this.onJobtitleChange}
                                    feil={validation.title ? { feilmelding: validation.title } : undefined}
                                />
                                <div className="blokk-xxs"><Normaltekst>Annonsetekst*</Normaltekst></div>
                                <RichTextEditor
                                    text={ad.properties.adtext || ''}
                                    onChange={this.onAdTextChange}
                                />
                            </Ekspanderbartpanel>
                            <Ekspanderbartpanel
                                tittel="Hvem bør søke på stilingen"
                                tittelProps="undertittel"
                                border
                                apen
                            >
                                <Requirements />
                            </Ekspanderbartpanel>
                        </div>
                    </Column>
                    <Column xs="12" md="4">
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Praktiske opplysninger"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <EngagementType />
                            <JobArrangement />
                            <div className="Edit__border" />
                            <SkjemaGruppe
                                className="Edit__SkjemaGruppe-title blokk-xs"
                                title="Omfang*"
                            >
                                <Radio
                                    className="Edit__inline"
                                    label="Heltid"
                                    value="Heltid"
                                    name="heltidDeltid"
                                    checked={ad.properties.extent === 'Heltid'}
                                    onChange={this.onExtentChange}
                                />
                                <Radio
                                    className="Edit__inline"
                                    label="Deltid"
                                    value="Deltid"
                                    name="heltidDeltid"
                                    checked={ad.properties.extent === 'Deltid'}
                                    onChange={this.onExtentChange}
                                />
                            </SkjemaGruppe>
                            <SkjemaGruppe
                                className="Edit__SkjemaGruppe-title blokk-xs"
                                title="Arbeidsdager*"
                            >
                                <Checkbox
                                    className="Edit__inline"
                                    label="Ukedager"
                                    value={ad.properties.workday || ''}
                                    onChange={this.onWorkdayChange}
                                />
                                <Checkbox
                                    className="Edit__inline"
                                    label="Lørdag"
                                    value={ad.properties.workday || ''}
                                    onChange={this.onWorkdayChange}
                                />
                                <Checkbox
                                    className="Edit__inline"
                                    label="Søndag"
                                    value={ad.properties.workday || ''}
                                    onChange={this.onWorkdayChange}
                                />
                            </SkjemaGruppe>
                            <SkjemaGruppe
                                className="Edit__SkjemaGruppe-title blokk-xs"
                                title="Arbeidstid*"
                            >
                                <Checkbox
                                    className="Edit__inline"
                                    label="Dagtid"
                                    value={ad.properties.workhours || ''}
                                    onChange={this.onWorkhoursChange}
                                />
                                <Checkbox
                                    className="Edit__inline"
                                    label="Kveld"
                                    value={ad.properties.workhours || ''}
                                    onChange={this.onWorkhoursChange}
                                />
                                <Checkbox
                                    className="Edit__inline"
                                    label="Natt"
                                    value={ad.properties.workhours || ''}
                                    onChange={this.onWorkhoursChange}
                                />
                            </SkjemaGruppe>
                            <SkjemaGruppe
                                className="Edit__SkjemaGruppe-title"
                                title="Sektor"
                            >
                                <Radio
                                    className="Edit__inline"
                                    label="Privat"
                                    value="Privat"
                                    name="sektor"
                                    checked={ad.properties.sector === 'Privat'}
                                    onChange={this.onSectorChange}
                                />
                                <Radio
                                    className="Edit__inline"
                                    label="Offentlig"
                                    value="Offentlig"
                                    name="sektor"
                                    checked={ad.properties.sector === 'Offentlig'}
                                    onChange={this.onSectorChange}
                                />
                                <Radio
                                    className="Edit__inline"
                                    label="Ikke oppgitt"
                                    value="Ikke oppgitt"
                                    name="sektor"
                                    checked={ad.properties.sector === 'Ikke oppgitt'}
                                    onChange={this.onSectorChange}
                                />
                            </SkjemaGruppe>

                            <div className="Edit__border" />
                            <Input
                                type="number"
                                label="Antall stillinger"
                                value={ad.properties.positioncount || ''}
                                onChange={this.onPositioncountChange}
                            />
                            <Input
                                label="Søknadsfrist"
                                value={ad.properties.applicationdue || ''}
                                onChange={this.onApplicationDueChange}
                            />
                            <Input
                                label="Oppstart"
                                value={ad.properties.starttime || ''}
                                onChange={this.onStarttimeChange}
                            />
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Søknad"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <Input
                                label="Søknadsfrist"
                                value={ad.properties.applicationdue || ''}
                                onChange={this.onApplicationDueChange}
                            />
                            <Input
                                label="Send søknad til"
                                value={ad.properties.applicationemail || ''}
                                onChange={this.onApplicationEmailChange}
                            />
                            <Input
                                label="Søknadslenke"
                                value={ad.properties.applicationurl || ''}
                                onChange={this.onApplicationUrlChange}
                            />
                            <Input
                                label="Kildelenke"
                                value={ad.properties.sourceurl || ''}
                                onChange={this.onSourceUrlChange}
                            />
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Kontaktinformasjon"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <ContactPerson />
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Arbeidsstedets adresse*"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Hvordan ønsker arbeidsgiver å motta søknader?"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Om annonsen"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <Input
                                label="Sist endret"
                                value={ad.updated || ''}
                                onChange={this.onLastUpdatedChange}
                                disabled
                            />
                            <Input
                                label="Hentet fra"
                                value={ad.medium || ''}
                                onChange={this.onMediumChange}
                            />
                            <Input
                                label="Stillingsnummer"
                                value={ad.id || ''}
                                onChange={this.onIdChange}
                                disabled
                            />
                        </Ekspanderbartpanel>
                    </Column>
                </Row>
            </div>
        );
    }
}

Edit.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string
    }),
    setAdTitle: PropTypes.func.isRequired,
    setJobTitle: PropTypes.func.isRequired,
    setEmploymentLocation: PropTypes.func.isRequired,
    setExtent: PropTypes.func.isRequired,
    setPositionCount: PropTypes.func.isRequired,
    setSector: PropTypes.func.isRequired,
    setWorkDay: PropTypes.func.isRequired,
    setWorkHours: PropTypes.func.isRequired,
    setStartTime: PropTypes.func.isRequired,
    setApplicationDue: PropTypes.func.isRequired,
    setApplicationEmail: PropTypes.func.isRequired,
    setApplicationUrl: PropTypes.func.isRequired,
    setSourceUrl: PropTypes.func.isRequired,
    setEmployerAddress: PropTypes.func.isRequired,
    setLastUpdated: PropTypes.func.isRequired,
    setMedium: PropTypes.func.isRequired,
    setId: PropTypes.func.isRequired,
    setReference: PropTypes.func.isRequired,
    setAdText: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    isFetchingStilling: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    validation: state.adValidation.errors,
    isFetchingStilling: state.ad.isFetchingStilling
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
    setStartTime: (starttime) => dispatch({ type: SET_EMPLOYMENT_STARTTIME, starttime }),
    setApplicationDue: (applicationdue) => dispatch({ type: SET_APPLICATIONDUE, applicationdue }),
    setApplicationEmail: (applicationemail) => dispatch({ type: SET_APPLICATIONEMAIL, applicationemail }),
    setApplicationUrl: (applicationurl) => dispatch({ type: SET_APPLICATIONURL, applicationurl }),
    setSourceUrl: (sourceurl) => dispatch({ type: SET_SOURCEURL, sourceurl }),
    setEmployer: (employer) => dispatch({ type: SET_EMPLOYER, employer }),
    setEmployerAddress: (employeraddress) => dispatch({ type: SET_EMPLOYER_ADDRESS, employeraddress }),
    setLastUpdated: (updated) => dispatch({ type: SET_LAST_UPDATED, updated }),
    setMedium: (medium) => dispatch({ type: SET_MEDIUM, medium }),
    setId: (id) => dispatch({ type: SET_ID, id }),
    setReference: (reference) => dispatch({ type: SET_REFERENCE, reference }),
    setAdText: (adtext) => dispatch({ type: SET_AD_TEXT, adtext })
});


export default connect(mapStateToProps, mapDispatchToProps)(Edit);
