import React from 'react';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { SET_PRIVACY } from '../../adDataReducer';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';
import Skjemalegend from '../../edit/skjemaetikett/Skjemalegend';
import { Undertittel } from 'nav-frontend-typografi';
import { useDispatch, useSelector } from 'react-redux';

import './Privacy.less';

export default function Privacy() {
    const dispatch = useDispatch();

    const privacy = useSelector((state: any) => state.adData.privacy);

    const onPrivacyChange = (e) => {
        dispatch({ type: SET_PRIVACY, privacy: e.target.value });
    };

    return (
        <RadioGruppe className="Privacy">
            <Skjemalegend className="Privacy__legend" påkrevd>
                <Undertittel className="Privacy__tittel">
                    Hvor skal stillingen publiseres?
                </Undertittel>
            </Skjemalegend>
            <Radio
                label="Kun internt i NAV"
                value={PrivacyStatusEnum.INTERNAL_NOT_SHOWN}
                name="privacy"
                checked={privacy === PrivacyStatusEnum.INTERNAL_NOT_SHOWN}
                onChange={onPrivacyChange}
            />
            <Radio
                label="Eksternt på Arbeidsplassen"
                value={PrivacyStatusEnum.SHOW_ALL}
                name="privacy"
                checked={privacy === PrivacyStatusEnum.SHOW_ALL}
                onChange={onPrivacyChange}
            />
        </RadioGruppe>
    );
}
