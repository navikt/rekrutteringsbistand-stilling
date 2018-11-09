import React from 'react';
import PropTypes from 'prop-types';
import {
    Input, SkjemaGruppe, Radio, Checkbox
} from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovelger from 'nav-datovelger';
import { formatISOString } from '../../../utils';
import {
    SET_EMPLOYMENT_EXTENT,
    SET_EMPLOYMENT_WORKDAY,
    SET_EMPLOYMENT_WORKHOURS,
    SET_EMPLOYMENT_SECTOR,
    SET_EMPLOYMENT_POSITIONCOUNT,
    SET_APPLICATIONDUE,
    SET_EMPLOYMENT_STARTTIME
} from '../../adDataReducer';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import EngagementType from '../engagementType/EngagementType';
import JobArrangement from '../jobArrangement/JobArrangement';
import './PracticalInformation.less';

class PracticalInformation extends React.Component {
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

    createErrorObject = (errorMessage) => {
        return errorMessage ? {feilmelding: errorMessage} : null;
    };

    render() {
        const { ad } = this.props;

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
                <Normaltekst className="PracticalInformation__label">Omfang*</Normaltekst>
                <SkjemaGruppe
                    className="blokk-xs typo-normal"
                    feil={this.createErrorObject(this.props.validation.extent)}
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
                <Normaltekst className="PracticalInformation__label">Arbeidsdager*</Normaltekst>
                <SkjemaGruppe
                    className="blokk-xs"
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
                <Normaltekst className="PracticalInformation__label">Arbeidstid*</Normaltekst>
                <SkjemaGruppe
                    className="blokk-xs"
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
                <Normaltekst className="PracticalInformation__label">Sektor*</Normaltekst>
                <SkjemaGruppe
                    className="typo-normal"
                    feil={this.createErrorObject(this.props.validation.sector)}
                >
                    <div>
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
                    </div>
                </SkjemaGruppe>
                <div className="Edit__border" />
                <Input
                    type="number"
                    min="1"
                    label="Antall stillinger*"
                    value={ad.properties.positioncount || ''}
                    onChange={this.onPositioncountChange}
                    feil={this.createErrorObject(this.props.validation.positioncount)}
                />
                <Normaltekst className="PracticalInformation__label">Søknadsfrist*</Normaltekst>
                <SkjemaGruppe
                    className={this.createErrorObject(this.props.validation.applicationdue) ? "typo-normal blokk-xs" : "typo-normal"}
                    feil={this.createErrorObject(this.props.validation.applicationdue)}
                >
                    <div className="PracticalInformation">
                        <div className="PracticalInformation__datepicker">
                            <Datovelger
                                id="applicationDue"
                                dato={formatISOString(ad.properties.applicationdue, 'DD.MM.YYYY') || ''}
                                onChange={this.onApplicationDueChange}
                                ref={(instance) => { this.refapplicationDue = instance; }}
                                avgrensninger={{ minDato: new Date(Date.now()) }}
                                inputProps={{ placeholder: 'dd.mm.åååå' }}
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
                <Normaltekst className="PracticalInformation__label">Oppstart</Normaltekst>
                <SkjemaGruppe>
                    <div className="PracticalInformation typo-normal">
                        <div className="PracticalInformation__datepicker">
                            <Datovelger
                                id="starttime"
                                dato={formatISOString(ad.properties.starttime, 'DD.MM.YYYY') || ''}
                                onChange={this.onStarttimeChange}
                                ref={(instance) => { this.refStarttime = instance; }}
                                avgrensninger={{ minDato: new Date(Date.now()) }}
                                inputProps={{ placeholder: 'dd.mm.åååå' }}
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
        starttime: PropTypes.string
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
    }).isRequired
};
const mapStateToProps = (state) => ({
    ad: state.adData,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setExtent: (extent) => dispatch({ type: SET_EMPLOYMENT_EXTENT, extent }),
    setWorkDay: (workday) => dispatch({ type: SET_EMPLOYMENT_WORKDAY, workday }),
    setWorkHours: (workhours) => dispatch({ type: SET_EMPLOYMENT_WORKHOURS, workhours }),
    setSector: (sector) => dispatch({ type: SET_EMPLOYMENT_SECTOR, sector }),
    setPositionCount: (positioncount) => dispatch({ type: SET_EMPLOYMENT_POSITIONCOUNT, positioncount }),
    setApplicationDue: (applicationdue) => dispatch({ type: SET_APPLICATIONDUE, applicationdue }),
    setStartTime: (starttime) => dispatch({ type: SET_EMPLOYMENT_STARTTIME, starttime })
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticalInformation);
