import React from 'react';
import { SET_PRIVACY } from '../../adDataReducer';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';
import { useDispatch, useSelector } from 'react-redux';

import { Radio, RadioGroup } from '@navikt/ds-react';

export default function Privacy() {
    const dispatch = useDispatch();

    const privacy = useSelector((state: any) => state.adData.privacy);

    const onPrivacyChange = (e) => {
        dispatch({ type: SET_PRIVACY, privacy: e.target.value });
    };

    return (
        <RadioGroup legend="Hvor skal stillingen publiseres?" value={privacy}>
            <Radio
                value={PrivacyStatusEnum.INTERNAL_NOT_SHOWN}
                name="privacy"
                onChange={onPrivacyChange}
                size="small"
            >
                Kun internt i NAV
            </Radio>
            <Radio
                value={PrivacyStatusEnum.SHOW_ALL}
                name="privacy"
                onChange={onPrivacyChange}
                size="small"
            >
                Eksternt på Arbeidsplassen
            </Radio>
        </RadioGroup>
    );
}
