import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdStatusEnum from '../../common/enums/AdStatusEnum';
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@navikt/ds-react';
import { MineStillingerActionType } from '../MineStillingerAction';
import { State } from '../../redux/store';
import css from './Filter.module.css';

const Synlighet = {
    Aktive: false,
    Utløpte: true,
};

const Filter = () => {
    const { filter, deactivatedByExpiry } = useSelector((state: State) => state.mineStillinger);
    const dispatch = useDispatch();
    const { status } = filter;

    const onStatusToggle = (nyeStatuser: string[]) => {
        dispatch({
            type: MineStillingerActionType.ChangeMyAdsStatusFilter,
            status: nyeStatuser,
        });
    };

    const onExpiredChange = (deactivatedByExpiry: boolean) => {
        dispatch({
            type: MineStillingerActionType.ChangeMyAdsDeactivatedFilter,
            deactivatedByExpiry: deactivatedByExpiry,
        });
    };

    return (
        <aside className={css.filter}>
            <RadioGroup legend="Synlighet" onChange={onExpiredChange} value={deactivatedByExpiry}>
                <Radio value={Synlighet.Aktive}>Aktive</Radio>
                <Radio value={Synlighet.Utløpte}>Utløpte</Radio>
            </RadioGroup>
            {!deactivatedByExpiry && (
                <CheckboxGroup legend="Status" onChange={onStatusToggle} value={status}>
                    <Checkbox value={AdStatusEnum.ACTIVE}>Publisert</Checkbox>
                    <Checkbox value={AdStatusEnum.INACTIVE}>Ikke Publisert</Checkbox>
                    <Checkbox value={AdStatusEnum.STOPPED}>Stoppet</Checkbox>
                </CheckboxGroup>
            )}
        </aside>
    );
};

export default Filter;
