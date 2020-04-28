import React from 'react';
import PropTypes from 'prop-types';
import { Input, SkjemaGruppe, Radio, Checkbox } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import 'nav-datovelger/dist/datovelger/styles/datovelger.css';
import { formatISOString } from '../../../utils';
import {
    SET_EMPLOYMENT_EXTENT,
    CHECK_EMPLOYMENT_WORKDAY,
    UNCHECK_EMPLOYMENT_WORKDAY,
    CHECK_EMPLOYMENT_WORKHOURS,
    UNCHECK_EMPLOYMENT_WORKHOURS,
    SET_EMPLOYMENT_SECTOR,
    SET_EMPLOYMENT_POSITIONCOUNT,
    SET_APPLICATIONDUE,
    SET_EMPLOYMENT_STARTTIME,
} from '../../adDataReducer';
import EngagementType from '../engagementType/EngagementType';
import JobArrangement from '../jobArrangement/JobArrangement';
import './PracticalInformation.less';
import IsJson from './IsJson';
import { createErrorObject } from '../../../common/utils';

class PracticalInformation extends React.Component {
    onWorkdayChange = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.checkWorkday(value);
        } else {
            this.props.uncheckWorkday(value);
        }
    };

    onWorkhoursChange = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.checkWorkhours(value);
        } else {
            this.props.uncheckWorkhours(value);
        }
    };

    onExtentChange = (e) => {
        this.props.setExtent(e.target.value);
    };

    onSectorChange = (e) => {
        this.props.setSector(e.target.value);
    };

    onPositioncountChange = (e) => {
        this.props.setPositionCount(e.target.value);
    };

    onApplicationDueChange = (date) => {
        let applicationDue;
        if (date && !Number.isNaN(Date.parse(date))) {
            date.setHours(12);
            applicationDue = date.toISOString();
        }
        this.props.setApplicationDue(applicationDue);
    };

    onSnarestChange = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.setApplicationDue(value);
        } else {
            this.props.setApplicationDue('');
        }
    };

    onStarttimeChange = (date) => {
        let starttime;
        if (date && !Number.isNaN(Date.parse(date))) {
            date.setHours(12);
            starttime = date.toISOString();
        }
        this.props.setStartTime(starttime);
    };

    onEtterAvtaleChange = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.setStartTime(value);
        } else {
            this.props.setStartTime('');
        }
    };

    render() {
        const { ad, workday, workhours } = this.props;

        return (
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
                    className="blokk-xs typo-normal"
                    feil={createErrorObject(this.props.validation.extent)}
                >
                    <fieldset className="fieldset">
                        <legend className="blokk-xxs">Omfang*</legend>
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
                    </fieldset>
                </SkjemaGruppe>
                <Normaltekst className="PracticalInformation__label">Arbeidsdager*</Normaltekst>
                <SkjemaGruppe
                    className="blokk-xs typo-normal"
                    feil={createErrorObject(this.props.validation.workday)}
                >
                    <Checkbox
                        className="Edit__inline"
                        label="Ukedager"
                        value="Ukedager"
                        checked={
                            workday
                                ? IsJson(workday)
                                    ? JSON.parse(workday).includes('Ukedager')
                                    : false
                                : false
                        }
                        onChange={this.onWorkdayChange}
                    />
                    <Checkbox
                        className="Edit__inline"
                        label="Lørdag"
                        value="Lørdag"
                        checked={
                            workday
                                ? IsJson(workday)
                                    ? JSON.parse(workday).includes('Lørdag')
                                    : false
                                : false
                        }
                        onChange={this.onWorkdayChange}
                    />
                    <Checkbox
                        className="Edit__inline"
                        label="Søndag"
                        value="Søndag"
                        checked={
                            workday
                                ? IsJson(workday)
                                    ? JSON.parse(workday).includes('Søndag')
                                    : false
                                : false
                        }
                        onChange={this.onWorkdayChange}
                    />
                </SkjemaGruppe>
                <Normaltekst className="PracticalInformation__label">Arbeidstid*</Normaltekst>
                <SkjemaGruppe
                    className="blokk-xs typo-normal"
                    feil={createErrorObject(this.props.validation.workhours)}
                >
                    <Checkbox
                        className="Edit__inline"
                        label="Dagtid"
                        value="Dagtid"
                        checked={
                            workhours
                                ? IsJson(workhours)
                                    ? JSON.parse(workhours).includes('Dagtid')
                                    : false
                                : false
                        }
                        onChange={this.onWorkhoursChange}
                    />
                    <Checkbox
                        className="Edit__inline"
                        label="Kveld"
                        value="Kveld"
                        checked={
                            workhours
                                ? IsJson(workhours)
                                    ? JSON.parse(workhours).includes('Kveld')
                                    : false
                                : false
                        }
                        onChange={this.onWorkhoursChange}
                    />
                    <Checkbox
                        className="Edit__inline"
                        label="Natt"
                        value="Natt"
                        checked={
                            workhours
                                ? IsJson(workhours)
                                    ? JSON.parse(workhours).includes('Natt')
                                    : false
                                : false
                        }
                        onChange={this.onWorkhoursChange}
                    />
                </SkjemaGruppe>
                <SkjemaGruppe
                    className="typo-normal"
                    feil={createErrorObject(this.props.validation.sector)}
                >
                    <fieldset className="fieldset">
                        <legend className="blokk-xxs">Sektor*</legend>
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
                    </fieldset>
                </SkjemaGruppe>
                <div className="Edit__border" />
                <Input
                    type="number"
                    min="1"
                    label="Antall stillinger*"
                    value={ad.properties.positioncount || ''}
                    onChange={this.onPositioncountChange}
                    feil={createErrorObject(this.props.validation.positioncount)}
                />
                <SkjemaGruppe
                    className={
                        createErrorObject(this.props.validation.applicationdue)
                            ? 'typo-normal blokk-xs'
                            : 'typo-normal'
                    }
                    feil={createErrorObject(this.props.validation.applicationdue)}
                >
                    <fieldset className="fieldset">
                        <legend className="blokk-xxs" id="soknadsfrist">
                            Søknadsfrist*
                        </legend>
                        <div className="PracticalInformation">
                            <div className="PracticalInformation__datepicker">
                                <Datovelger
                                    input={{
                                        id: 'applicationDue__input',
                                        name: 'applicationDue',
                                        placeholder: 'dd.mm.åååå',
                                        ariaLabel: 'Sett søknadsfrist',
                                    }}
                                    input={{
                                        id: 'applicationDue__input',
                                        name: 'applicationDue',
                                        placeholder: 'dd.mm.åååå',
                                        ariaLabel: 'Sett søknadsfrist',
                                    }}
                                    id="applicationDue"
                                    dato={
                                        formatISOString(
                                            ad.properties.applicationdue,
                                            'DD.MM.YYYY'
                                        ) || ''
                                    }
                                    onChange={this.onApplicationDueChange}
                                    ref={(instance) => {
                                        this.refapplicationDue = instance;
                                    }}
                                    avgrensninger={{ minDato: new Date(Date.now()) }}
                                    disabled={ad.properties.applicationdue === 'Snarest'}
                                />
                            </div>
                            <div className="PracticalInformation__top">
                                <Checkbox
                                    id="chbx-snarest"
                                    onChange={this.onSnarestChange}
                                    checked={ad.properties.applicationdue === 'Snarest'}
                                    value="Snarest"
                                    label="Snarest"
                                />
                            </div>
                        </div>
                    </fieldset>
                </SkjemaGruppe>
                <SkjemaGruppe className="typo-normal">
                    <fieldset className="fieldset">
                        <legend className="blokk-xxs" id="oppstart">
                            Oppstart
                        </legend>
                        <div className="PracticalInformation ">
                            <div className="PracticalInformation__datepicker">
                                <Datovelger
                                    id="starttime"
                                    input={{
                                        id: 'starttime__input',
                                        name: 'starttime',
                                        placeholder: 'dd.mm.åååå',
                                        ariaLabel: 'Sett oppstart',
                                    }}
                                    dato={
                                        formatISOString(ad.properties.starttime, 'DD.MM.YYYY') || ''
                                    }
                                    onChange={this.onStarttimeChange}
                                    avgrensninger={{ minDato: new Date(Date.now()) }}
                                    disabled={ad.properties.starttime === 'Etter avtale'}
                                />
                            </div>
                            <div className="PracticalInformation__top">
                                <Checkbox
                                    id="chbx-etterAvtale"
                                    onChange={this.onEtterAvtaleChange}
                                    checked={ad.properties.starttime === 'Etter avtale'}
                                    value="Etter avtale"
                                    label="Etter avtale"
                                />
                            </div>
                        </div>
                    </fieldset>
                </SkjemaGruppe>
            </Ekspanderbartpanel>
        );
    }
}

PracticalInformation.propTypes = {
    ad: PropTypes.shape({
        extent: PropTypes.string,
        workday: PropTypes.string,
        workhours: PropTypes.string,
        sector: PropTypes.string,
        positioncount: PropTypes.string,
        applicationdue: PropTypes.string,
        starttime: PropTypes.string,
    }),
    setExtent: PropTypes.func.isRequired,
    setPositionCount: PropTypes.func.isRequired,
    setSector: PropTypes.func.isRequired,
    checkWorkday: PropTypes.func.isRequired,
    uncheckWorkday: PropTypes.func.isRequired,
    checkWorkhours: PropTypes.func.isRequired,
    uncheckWorkhours: PropTypes.func.isRequired,
    setStartTime: PropTypes.func.isRequired,
    setApplicationDue: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
};
const mapStateToProps = (state) => ({
    ad: state.adData,
    workday: state.adData.properties.workday,
    workhours: state.adData.properties.workhours,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setExtent: (extent) => dispatch({ type: SET_EMPLOYMENT_EXTENT, extent }),
    checkWorkday: (value) => dispatch({ type: CHECK_EMPLOYMENT_WORKDAY, value }),
    uncheckWorkday: (value) => dispatch({ type: UNCHECK_EMPLOYMENT_WORKDAY, value }),
    checkWorkhours: (value) => dispatch({ type: CHECK_EMPLOYMENT_WORKHOURS, value }),
    uncheckWorkhours: (value) => dispatch({ type: UNCHECK_EMPLOYMENT_WORKHOURS, value }),
    setSector: (sector) => dispatch({ type: SET_EMPLOYMENT_SECTOR, sector }),
    setPositionCount: (positioncount) =>
        dispatch({ type: SET_EMPLOYMENT_POSITIONCOUNT, positioncount }),
    setApplicationDue: (applicationdue) => dispatch({ type: SET_APPLICATIONDUE, applicationdue }),
    setStartTime: (starttime) => dispatch({ type: SET_EMPLOYMENT_STARTTIME, starttime }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticalInformation);
