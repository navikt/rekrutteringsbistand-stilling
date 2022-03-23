import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CHANGE_MY_ADS_STATUS_FILTER,
    CHANGE_MY_ADS_DEACTIVATED_FILTER,
} from '../mineStillingerReducer';
import AdStatusEnum, { ActiveAdStatusEnum } from '../../common/enums/AdStatusEnum';
import { Checkbox, Radio } from 'nav-frontend-skjema';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';

const Synlighet = {
    Aktive: false,
    Utløpte: true,
};

const Filter = () => {
    const { filter, deactivatedByExpiry } = useSelector((state) => state.mineStillinger);
    const dispatch = useDispatch();
    const { status } = filter;

    const onStatusToggle = (e) => {
        const statusToToggle = e.target.value;
        const nyttFilter = status.includes(statusToToggle)
            ? status.filter((status) => status !== statusToToggle)
            : [...status, statusToToggle];

        dispatch({
            type: CHANGE_MY_ADS_STATUS_FILTER,
            status: nyttFilter,
        });
    };

    const onExpiredChange = (e) => {
        dispatch({
            type: CHANGE_MY_ADS_DEACTIVATED_FILTER,
            deactivatedByExpiry: Synlighet[e.target.value],
        });
    };

    return (
        <form>
            <fieldset>
                <legend className="typo-element">Synlighet</legend>
                {Object.keys(Synlighet).map((key) => (
                    <Radio
                        key={key}
                        label={key}
                        name="deactivatedByExpiry"
                        value={key}
                        checked={deactivatedByExpiry === Synlighet[key]}
                        onChange={onExpiredChange}
                    />
                ))}
            </fieldset>
            {!deactivatedByExpiry && (
                <fieldset>
                    <legend className="typo-element">Status</legend>
                    {Object.keys(ActiveAdStatusEnum).map((statusKey) => {
                        const statusValue = AdStatusEnum[statusKey];
                        const statusLabel = getAdStatusLabel(statusValue);

                        return (
                            <Checkbox
                                key={statusKey}
                                label={statusLabel}
                                value={statusValue}
                                checked={status.includes(statusValue)}
                                onChange={onStatusToggle}
                            />
                        );
                    })}
                </fieldset>
            )}
        </form>
    );
};

export default Filter;
