import React from 'react';
import PropTypes from 'prop-types';
import { Input, SkjemaGruppe, Radio } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';
import { connect } from 'react-redux';
import {
    SET_AD_TEXT,
    SET_AD_TITLE, SET_APPLICATIONDUE, SET_APPLICATIONEMAIL, SET_APPLICATIONURL,
    SET_EMPLOYER, SET_EMPLOYER_NAME, SET_EMPLOYER_ADDRESS, SET_EMPLOYER_HOMEPAGE, SET_EMPLOYERDESCRIPTION,
    SET_EMPLOYMENT_EXTENT,
    SET_EMPLOYMENT_JOBTITLE,
    SET_EMPLOYMENT_LOCATION, SET_EMPLOYMENT_POSITIONCOUNT,
    SET_EMPLOYMENT_SECTOR, SET_EMPLOYMENT_STARTTIME, SET_EMPLOYMENT_WORKDAY,
    SET_EMPLOYMENT_WORKHOURS, SET_EXPIRATION_DATE, SET_ID, SET_LAST_UPDATED,
    SET_MEDIUM, SET_PUBLISHED, SET_REFERENCE, SET_SOURCEURL
} from '../adDataReducer';
import './Edit.less';
import EngagementType from './engagementType/EngagementType';
import RichTextEditor from './richTextEditor/RichTextEditor';
import JobArrangement from './jobArrangement/JobArrangement';

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

    onEmployerDescriptionChange = (employerDescription) => {
        this.props.setEmployerDescription(employerDescription);
    };

    onEmployerNameChange = (e) => {
        this.props.setEmployerName(e.target.value);
    };

    onEmployerAddressChange = (e) => {
        this.props.setEmployerAddress(e.target.value);
    };

    onEmployerHomepageChange = (e) => {
        this.props.setEmployerHomepage(e.target.value);
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
        this.props.setAdText(adText);
    };

    render() {
        const { ad, validation } = this.props;

        const hardrequirements = ad.properties.hardrequirements
            ? JSON.parse(ad.properties.hardrequirements) : undefined;
        const softrequirements = ad.properties.softrequirements
            ? JSON.parse(ad.properties.softrequirements) : undefined;
        const personalattributes = ad.properties.personalattributes
            ? JSON.parse(ad.properties.personalattributes) : undefined;

        return (
            <div className="Edit">
                <Row className="Edit__inner">
                    <Column xs="12" md="8">
                        <div className="Edit__left">
                            <Ekspanderbartpanel
                                className="blokk-s"
                                tittel="Om bedriften"
                                tittelProps="undertittel"
                                border
                                apen
                            >
                                <Input
                                    label="Bedriftens navn hentet fra Enhetsregisteret*"
                                    value={ad.properties.employer || ''}
                                    onChange={this.onEmployerNameChange}
                                />
                                <Input
                                    label="Navn på bedriften"
                                    value={ad.properties.employer || ''}
                                    onChange={this.onEmployerNameChange}
                                />
                                <Normaltekst className="blokk-xxs">Kort om bedriften</Normaltekst>
                                <RichTextEditor
                                    text={ad.properties.employerdescription || ''}
                                    onChange={this.onEmployerDescriptionChange}
                                />
                                <Input
                                    label="Bedriftens nettsted"
                                    value={ad.properties.employerhomepage || ''}
                                    onChange={this.onEmployerHomepageChange}
                                />
                                {ad.properties.facebookpage === undefined
                                && (ad.properties.linkedinpage === undefined)
                                && (ad.properties.twitteraddress === undefined)
                                && (
                                    <Row className="blokk-l">
                                        <Column xs="12">
                                            <Flatknapp
                                                id="legg-til-addresser"
                                                onClick={this.onLeggTilAddresser}
                                                mini
                                            >
                                                + Legg til adresser for Facebook, LinkedIn og Twitter
                                            </Flatknapp >
                                        </Column>
                                    </Row>
                                )}
                            </Ekspanderbartpanel>
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
                                    value={ad.title || ''}
                                    onChange={this.onTitleChange}
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
                                <Input
                                    label={
                                        <div>
                                            <Normaltekst className="Requirements__label">
                                                Krav til kompetanse (maks 5)
                                            </Normaltekst>
                                            <HjelpetekstAuto>
                                                Absolutte krav til den som søker på
                                                stillingen. Det kan for eksempel
                                                være utdanningsnivå, spesiell
                                                erfaring eller språkkunnskaper.
                                            </HjelpetekstAuto>
                                        </div>
                                    }
                                    value={''}
                                    onChange={this.onHardrequirementsChange}
                                    placeholder="For eksempel: pedagogikk"
                                />
                                <Input
                                    label=""
                                    value={''}
                                    onChange={this.onHardrequirementsChange}
                                />
                                <Input
                                    label=""
                                    value={''}
                                    onChange={this.onHardrequirementsChange}
                                />
                                {(hardrequirements && hardrequirements.length > 3) && (
                                    <Input
                                        label=""
                                        value={''}
                                        onChange={this.onHardrequirementsChange}
                                        inputRef={(i) => {
                                            this.focusField = i;
                                        }}
                                    />
                                )}
                                {(hardrequirements && hardrequirements.length > 4) && (
                                    <Input
                                        label=""
                                        value={''}
                                        onChange={this.onHardrequirementsChange}
                                        inputRef={(i) => {
                                            this.focusField = i;
                                        }}
                                    />
                                )}
                                {(hardrequirements === undefined
                                    || hardrequirements.length < 5)
                                    ? (
                                        <Flatknapp
                                            onClick={this.onNewHardrequirement}
                                            mini
                                        >
                                            + Legg til et krav
                                        </Flatknapp>
                                    ) : null}
                                <div className="Requirements__separator"/>

                                <Input
                                    label={
                                        <div>
                                            <Normaltekst className="Requirements__label">
                                                Ønsket kompetanse (maks 5)
                                            </Normaltekst>
                                            <HjelpetekstAuto>
                                                Kompetanse som kan være relevant for stillingen,
                                                men som ikke er et absolutt krav for å kunne søke.
                                            </HjelpetekstAuto>
                                        </div>
                                    }
                                    value={''}
                                    onChange={this.onSoftrequirementsChange}
                                    placeholder="For eksempel: Førerkort klasse B"
                                />
                                <Input
                                    label=""
                                    value={''}
                                    onChange={this.onSoftrequirementsChange}
                                />
                                <Input
                                    id="boerkrav3"
                                    label=""
                                    value={ad.properties.boerkrav3
                                        ? (ad.properties.boerkrav3)
                                        : ('')}
                                    onChange={this.endreBoerKrav3}
                                />
                                {(ad.properties.boerkrav4 !== undefined) && (
                                    <Input
                                        label=""
                                        value={''}
                                        onChange={this.onSoftrequirementsChange}
                                        inputRef={(i) => {
                                            this.focusField = i;
                                        }}
                                    />
                                )}
                                {(ad.properties.boerkrav5 !== undefined) && (
                                    <Input
                                        label=""
                                        value={''}
                                        onChange={this.onSoftrequirementsChange}
                                        inputRef={(i) => {
                                            this.focusField = i;
                                        }}
                                    />
                                )}
                                {ad.properties
                                && (ad.properties.boerkrav4 === undefined
                                    || ad.properties.boerkrav5 === undefined)
                                    ? (
                                        <Flatknapp
                                            onClick={this.visNyInputBoerkrav}
                                            mini
                                        >
                                            + Legg til ønsket kompetanse
                                        </Flatknapp>
                                    ) : null}
                                <div className="Requirements__separator"/>
                                <Input
                                    label={
                                        <div>
                                            <Normaltekst className="Requirements__label">
                                                Personlige egenskaper (maks 5)
                                            </Normaltekst>
                                            <HjelpetekstAuto>
                                                Er det noen personlige egenskaper som vektlegges
                                                spesielt for denne stillingen?
                                            </HjelpetekstAuto>
                                        </div>
                                    }
                                    value={''}
                                    onChange={this.onPersonalAttributesChange}
                                    placeholder="For eksempel: ansvarsbevisst"
                                />
                                <Input
                                    id="personligeEgenskaper2"
                                    label=""
                                    value={ad.properties.personligeEgenskaper2
                                        ? (ad.properties.personligeEgenskaper2)
                                        : ('')}
                                    onChange={this.endrePersonligeEgenskaper2}
                                />
                                <Input
                                    id="personligeEgenskaper3"
                                    label=""
                                    value={ad.properties.personligeEgenskaper3
                                        ? (ad.properties.personligeEgenskaper3)
                                        : ('')}
                                    onChange={this.endrePersonligeEgenskaper3}
                                />
                                {(ad.properties.personligeEgenskaper4 !== undefined) && (
                                    <Input
                                        id="personligeEgenskaper4"
                                        label=""
                                        value={ad.properties.personligeEgenskaper4
                                            ? (ad.properties.personligeEgenskaper4)
                                            : ('')}
                                        onChange={this.endrePersonligeEgenskaper4}
                                        inputRef={(i) => {
                                            this.focusField = i;
                                        }}
                                    />
                                )}
                                {(ad.properties.personligeEgenskaper5 !== undefined) && (
                                    <Input
                                        id="personligeEgenskaper5"
                                        label=""
                                        value={ad.properties.personligeEgenskaper5
                                            ? (ad.properties.personligeEgenskaper5)
                                            : ('')}
                                        onChange={this.endrePersonligeEgenskaper5}
                                        inputRef={(i) => {
                                            this.focusField = i;
                                        }}
                                    />
                                )}
                                {(ad.properties.personligeEgenskaper4 === undefined
                                    || ad.properties.personligeEgenskaper5 === undefined)
                                    ? (
                                        <Flatknapp
                                            id="ny-egenskap"
                                            onClick={this.visNyInputEgenskaper}
                                            mini
                                        >
                                            + Legg til en personlig egenskap
                                        </Flatknapp>
                                    ) : null}

                            </Ekspanderbartpanel>
                        </div>
                    </Column>
                    <Column xs="12" md="4">
                        <Ekspanderbartpanel
                            className="Edit__panel-details"
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
                            tittel="Om stillingen"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <Input
                                label="Stillingstittel"
                                value={ad.properties.jobtitle || ''}
                                onChange={this.onJobtitleChange}
                            />
                            <Input
                                label="Arbeidssted"
                                value={ad.properties.location || ''}
                                onChange={this.onLocationChange}
                            />
                            <div className="Edit__border" />
                            <EngagementType />
                            <JobArrangement />
                            <div className="Edit__border" />
                            <SkjemaGruppe
                                className="Edit__SkjemaGruppe-title blokk-xs"
                                title="Heltid/Deltid"
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
                            <Input
                                label="Arbeidsdager"
                                value={ad.properties.workday || ''}
                                onChange={this.onWorkdayChange}
                            />
                            <Input
                                label="Arbeidstid"
                                value={ad.properties.workhours || ''}
                                onChange={this.onWorkhoursChange}
                            />
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
                                label="Antall stillinger"
                                value={ad.properties.positioncount || ''}
                                onChange={this.onPositioncountChange}
                            />
                            <Input
                                label="Oppstart"
                                value={ad.properties.starttime || ''}
                                onChange={this.onStarttimeChange}
                            />
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Om annonsen"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <Input
                                label="Hentet fra"
                                value={ad.medium || ''}
                                onChange={this.onMediumChange}
                            />
                            <Input
                                label="Sist endret"
                                value={ad.updated || ''}
                                onChange={this.onLastUpdatedChange}
                                disabled
                            />
                            <Input
                                label="Stillingsnummer"
                                value={ad.id || ''}
                                onChange={this.onIdChange}
                                disabled
                            />
                            <Input
                                label="Referanse"
                                value={ad.reference || ''}
                                onChange={this.onReferenceChange}
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
    setEmployerName: PropTypes.func.isRequired,
    setEmployerAddress: PropTypes.func.isRequired,
    setEmployerHomepage: PropTypes.func.isRequired,
    setEmployerDescription: PropTypes.func.isRequired,
    setLastUpdated: PropTypes.func.isRequired,
    setMedium: PropTypes.func.isRequired,
    setId: PropTypes.func.isRequired,
    setReference: PropTypes.func.isRequired,
    setExpirationDate: PropTypes.func.isRequired,
    setAdText: PropTypes.func.isRequired,
    setPublished: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    ad: state.adData,
    validation: state.adValidation.errors
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
    setEmployerName: (employername) => dispatch({ type: SET_EMPLOYER_NAME, employername }),
    setEmployerAddress: (employeraddress) => dispatch({ type: SET_EMPLOYER_ADDRESS, employeraddress }),
    setEmployerHomepage: (employerhomepage) => dispatch({ type: SET_EMPLOYER_HOMEPAGE, employerhomepage }),
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
