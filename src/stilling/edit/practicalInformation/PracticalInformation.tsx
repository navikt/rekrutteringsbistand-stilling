import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Datepicker } from 'nav-datovelger';
import { Radio, RadioGroup } from '@navikt/ds-react';

import {
    fjernTidspunktFraISOString,
    isValidISOString,
    leggTilTimerPåISOString,
} from '../../../utils/datoUtils';
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
import EngagementType from '../engagementType/EngagementType.js';
import JobArrangement from '../jobArrangement/JobArrangement.js';
import IsJson from './IsJson.js';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import Skjemalegend from '../skjemaetikett/Skjemalegend';
import css from './PracticalInformation.module.css';
import { Checkbox, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { State } from '../../../redux/store';
import Stilling from '../../../Stilling';
import { Omfang } from '../../../Stilling';
import { ValidertFelt } from '../../adValidationReducer';

type Props = {
    ad: Stilling;
    setExtent: (value: Omfang) => void;
    setPositionCount: (value: number) => void;
    setSector: (value: string) => void;
    workday: string;
    checkWorkday: (value: string) => void;
    uncheckWorkday: (value: string) => void;
    workhours: string;
    checkWorkhours: (value: string) => void;
    uncheckWorkhours: (value: string) => void;
    setStartTime: (value?: string) => void;
    setApplicationDue: (value: string) => void;
    validation: Record<ValidertFelt, string | undefined>;
};

class PracticalInformation extends React.Component<Props> {
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
            <>
                <EngagementType />
                <JobArrangement />
                <div className={css.skillelinje} />
                <RadioGroup
                    legend={<Skjemalegend påkrevd>Omfang</Skjemalegend>}
                    name="heltidDeltid"
                    value={ad.properties.extent}
                    onChange={this.props.setExtent}
                    error={this.props.validation.extent}
                    className={css.inlineFields}
                >
                    <Radio value="Heltid">Heltid</Radio>
                    <Radio value="Deltid">Deltid</Radio>
                </RadioGroup>

                <SkjemaGruppe feil={this.props.validation.workday}>
                    <Skjemalegend påkrevd>Arbeidsdager</Skjemalegend>
                    <Checkbox
                        className={css.inline}
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
                        className={css.inline}
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
                        className={css.inline}
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
                        className={css.inline}
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
                        className={css.inline}
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
                        className={css.inline}
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
                <RadioGroup
                    name="sektor"
                    legend={<Skjemalegend påkrevd>Sektor</Skjemalegend>}
                    value={ad.properties.sector}
                    onChange={this.props.setSector}
                    className={css.inlineFields}
                    error={this.props.validation.sector}
                >
                    <Radio value="Privat">Privat</Radio>
                    <Radio value="Offentlig">Offentlig</Radio>
                    <Radio value="Ikke oppgitt">Ikke oppgitt</Radio>
                </RadioGroup>
                <div className={css.skillelinje} />
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
                                // id={'applicationDue' as any}
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
                                // id="starttime"
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
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    ad: state.adData,
    workday: state.adData?.properties.workday,
    workhours: state.adData?.properties.workhours,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
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
