import React from 'react';
import PropTypes from 'prop-types';
import {
    Input, SkjemaGruppe, Radio, Checkbox
} from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Row } from 'nav-frontend-grid';
import { connect } from 'react-redux';
import {
    SET_APPLICATIONDUE,
    SET_EMPLOYER,
    SET_EMPLOYMENT_EXTENT,
    SET_EMPLOYMENT_POSITIONCOUNT,
    SET_EMPLOYMENT_SECTOR,
    SET_EMPLOYMENT_STARTTIME,
    SET_EMPLOYMENT_WORKDAY,
    SET_EMPLOYMENT_WORKHOURS
} from '../adDataReducer';
import './Edit.less';
import EngagementType from './engagementType/EngagementType';
import JobArrangement from './jobArrangement/JobArrangement';
import Requirements from './requirements/Requirements';
import Employer from './employer/Employer';
import JobDetails from './jobDetails/JobDetails';
import Loading from '../../common/loading/Loading';
import ContactPerson from './contactPerson/ContactPerson';
import Application from './application/Application';
import Location from './location/Location';
import { formatISOString } from '../../utils';

class Edit extends React.Component {
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

    render() {
        const { ad, isFetchingStilling } = this.props;

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
                            <JobDetails />
                            {/* <Ekspanderbartpanel
                                tittel="Hvem bør søke på stilingen"
                                tittelProps="undertittel"
                                border
                                apen
                            >
                                <Requirements />
                            </Ekspanderbartpanel> */}
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
                        <ContactPerson />
                        <Application />
                        <Location />
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Om annonsen"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <Input
                                label="Sist endret"
                                value={ad.updated !== ad.created ? formatISOString(ad.updated, 'DD.MM.YYYY') : ''}
                                disabled
                            />
                            <Input
                                label="Hentet fra/kilde"
                                value={ad.medium || ''}
                                disabled
                            />
                            <Input
                                label="Stillingsnummer"
                                value={ad.id || ''}
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
        title: PropTypes.string,
        updated: PropTypes.string,
        created: PropTypes.string,
        medium: PropTypes.string,
        id: PropTypes.number
    }),
    setExtent: PropTypes.func.isRequired,
    setPositionCount: PropTypes.func.isRequired,
    setSector: PropTypes.func.isRequired,
    setWorkDay: PropTypes.func.isRequired,
    setWorkHours: PropTypes.func.isRequired,
    setStartTime: PropTypes.func.isRequired,
    setApplicationDue: PropTypes.func.isRequired,
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
    setExtent: (extent) => dispatch({ type: SET_EMPLOYMENT_EXTENT, extent }),
    setPositionCount: (positioncount) => dispatch({ type: SET_EMPLOYMENT_POSITIONCOUNT, positioncount }),
    setSector: (sector) => dispatch({ type: SET_EMPLOYMENT_SECTOR, sector }),
    setWorkDay: (workday) => dispatch({ type: SET_EMPLOYMENT_WORKDAY, workday }),
    setWorkHours: (workhours) => dispatch({ type: SET_EMPLOYMENT_WORKHOURS, workhours }),
    setStartTime: (starttime) => dispatch({ type: SET_EMPLOYMENT_STARTTIME, starttime }),
    setApplicationDue: (applicationdue) => dispatch({ type: SET_APPLICATIONDUE, applicationdue }),
    setEmployer: (employer) => dispatch({ type: SET_EMPLOYER, employer })
});


export default connect(mapStateToProps, mapDispatchToProps)(Edit);
