import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Input, SkjemaGruppe, Radio, Checkbox, RadioGruppe } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Datepicker } from 'nav-datovelger';
import {
    fjernTidspunktFraISOString,
    isValidISOString,
    leggTilTimerPåISOString,
} from '../../../datoUtils.ts';
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
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import Skjemalegend from '../skjemaetikett/Skjemalegend';

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
        if (isValidISOString(date)) {
            this.props.setApplicationDue(leggTilTimerPåISOString(date, 12));
        } else {
            this.props.setApplicationDue(date);
        }
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
        if (isValidISOString(date)) {
            this.props.setStartTime(leggTilTimerPåISOString(date, 12));
        } else if (date.length === 0) {
            this.props.setStartTime(undefined);
        } else {
            this.props.setStartTime(date);
        }
    };

    onEtterAvtaleChange = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.setStartTime(value);
        } else {
            this.props.setStartTime(undefined);
        }
    };

    render() {
        const { ad, workday, workhours } = this.props;

        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel={<Undertittel>Praktiske opplysninger</Undertittel>}
                border
                apen
            >
                <EngagementType />
                <JobArrangement />
                <div className="Edit__border" />
                <RadioGruppe
                    className="blokk-xs typo-normal Edit__inline-fieldset"
                    feil={this.props.validation.extent}
                >
                    <Skjemalegend påkrevd>Omfang</Skjemalegend>
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
                </RadioGruppe>
                <SkjemaGruppe
                    className="blokk-xs typo-normal Edit__inline-fieldset"
                    feil={this.props.validation.workday}
                >
                    <Skjemalegend påkrevd>Arbeidsdager</Skjemalegend>
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
                <SkjemaGruppe
                    className="blokk-xs typo-normal Edit__inline-fieldset"
                    feil={this.props.validation.workhours}
                >
                    <Skjemalegend påkrevd>Arbeidstid</Skjemalegend>
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
                    className="typo-normal Edit__inline-fieldset"
                    feil={this.props.validation.sector}
                >
                    <Skjemalegend påkrevd>Sektor</Skjemalegend>
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
                <Skjemalabel påkrevd inputId="endre-stilling-antall-stillinger">
                    Antall stillinger
                </Skjemalabel>
                <Input
                    id="endre-stilling-antall-stillinger"
                    className="blokk-xs"
                    type="number"
                    min="1"
                    value={ad.properties.positioncount || ''}
                    onChange={this.onPositioncountChange}
                    feil={this.props.validation.positioncount}
                />
                <SkjemaGruppe
                    className={classnames('typo-normal', 'Edit__inline-fieldset', {
                        'blokk-xs': this.props.validation.applicationdue,
                    })}
                    feil={this.props.validation.applicationdue}
                >
                    <Skjemalabel påkrevd inputId="endre-stilling-søknadsfrist">
                        Søknadsfrist
                    </Skjemalabel>
                    <div className="PracticalInformation">
                        <div className="PracticalInformation__datepicker">
                            <Datepicker
                                id="applicationDue"
                                inputId="applicationDue__input"
                                inputProps={{
                                    name: 'applicationDue',
                                    placeholder: 'dd.mm.åååå',
                                    'aria-label': 'Sett søknadsfrist',
                                }}
                                value={fjernTidspunktFraISOString(ad.properties.applicationdue)}
                                onChange={this.onApplicationDueChange}
                                limitations={{
                                    minDate: fjernTidspunktFraISOString(new Date().toISOString()),
                                }}
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
                </SkjemaGruppe>
                <SkjemaGruppe className="typo-normal" feil={this.props.validation.starttime}>
                    <Skjemalegend>Oppstart</Skjemalegend>
                    <div className="PracticalInformation ">
                        <div className="PracticalInformation__datepicker">
                            <Datepicker
                                id="starttime"
                                inputId="starttime__input"
                                inputProps={{
                                    name: 'starttime',
                                    placeholder: 'dd.mm.åååå',
                                    'aria-label': 'Sett oppstart',
                                }}
                                value={fjernTidspunktFraISOString(ad.properties.starttime)}
                                onChange={this.onStarttimeChange}
                                limitations={{
                                    minDate: fjernTidspunktFraISOString(new Date().toISOString()),
                                }}
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
