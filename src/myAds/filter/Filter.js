import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MY_ADS_STATUS_FILTER, CHANGE_MY_ADS_DEACTIVATED_FILTER } from '../myAdsReducer';
import AdStatusEnum, { ActiveAdStatusEnum } from '../../common/enums/AdStatusEnum';
import { Checkbox, Radio } from 'nav-frontend-skjema';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';

const Filter = () => {
    const { filter, deactivatedByExpiry } = useSelector(state => state.myAds);
    const dispatch = useDispatch();
    const { status } = filter;

    const onStatusToggle = e => {
        const statusToToggle = e.target.value;
        const nyttFilter = status.includes(statusToToggle)
            ? status.filter(status => status !== statusToToggle)
            : [...status, statusToToggle];

        dispatch({
            type: CHANGE_MY_ADS_STATUS_FILTER,
            status: nyttFilter,
        });
    };

    const onExpiredChange = e => {
        const deactivatedByExpiry = e.target.value === '' ? undefined : e.target.value === 'true';

        dispatch({
            type: CHANGE_MY_ADS_DEACTIVATED_FILTER,
            deactivatedByExpiry,
        });
    };

    return (
        <form>
            <fieldset>
                <legend className="typo-element">Synlighet</legend>
                <Radio
                    label="Aktive"
                    name="deactivatedByExpiry"
                    value="false"
                    checked={deactivatedByExpiry === false || deactivatedByExpiry === undefined}
                    onChange={onExpiredChange}
                />
                <Radio
                    label="Utløpte"
                    name="deactivatedByExpiry"
                    value="true"
                    checked={deactivatedByExpiry === true}
                    onChange={onExpiredChange}
                />
            </fieldset>
            <fieldset>
                <legend className="typo-element">Status på stilling</legend>
                {Object.keys(ActiveAdStatusEnum).map(statusKey => {
                    const statusValue = AdStatusEnum[statusKey];
                    const statusLabel = getAdStatusLabel(statusValue);

                    return (
                        <Checkbox
                            key={statusKey}
                            label={statusLabel}
                            value={statusValue}
                            disabled={deactivatedByExpiry === true}
                            checked={status.includes(statusValue)}
                            onChange={onStatusToggle}
                        />
                    );
                })}
            </fieldset>
        </form>
    );
};

export default Filter;
