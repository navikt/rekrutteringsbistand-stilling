import React, { Fragment } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { CHANGE_MY_ADS_STATUS_FILTER } from '../myAdsReducer';
import { Element } from 'nav-frontend-typografi';
import AdStatusEnum from '../../common/enums/AdStatusEnum';
import { Checkbox } from 'nav-frontend-skjema';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';

const Filter = () => {
    const { status, deactivatedByExpiry } = useSelector(state => state.myAds);
    const dispatch = useDispatch();

    const changeStatusFilter = (status, deactivatedByExpiry) => {
        dispatch({
            type: CHANGE_MY_ADS_STATUS_FILTER,
            status,
            deactivatedByExpiry,
        });
    };

    const onStatusToggle = e => {
        e.target.value === 'utløpt'
            ? changeStatusFilter(undefined, true)
            : changeStatusFilter(e.target.value, false);
    };

    return (
        <fieldset>
            <legend className="typo-element">Annonsestatus</legend>
            {Object.keys(AdStatusEnum).map(statusKey => {
                const statusValue = AdStatusEnum[statusKey];
                const statusLabel = getAdStatusLabel(statusValue);

                return (
                    <Checkbox
                        key={statusKey}
                        label={statusLabel}
                        value={statusValue}
                        checked={Boolean(statusValue === status)}
                        onChange={onStatusToggle}
                    />
                );
            })}
            <Checkbox
                label="Utløpt"
                value="utløpt"
                checked={deactivatedByExpiry}
                onChange={onStatusToggle}
            />
        </fieldset>
    );
};

export default Filter;
