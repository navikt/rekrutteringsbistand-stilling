import React, { FunctionComponent } from 'react';
import { Tooltip } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import Stilling, { Status } from '../../Stilling';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import { COPY_AD_FROM_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../stilling/adReducer';
import { connect } from 'react-redux';
import css from '../MineStillinger.module.css';

type Props = {
    stilling: Stilling;
    stopAd: (uuid: string) => void;
    copyAd: (uuid: string) => void;
};

const DropdownMeny: FunctionComponent<Props> = ({ stilling, stopAd, copyAd }) => {
    const onItemClick = (action) => {
        action(stilling.uuid);
    };

    const vilBliPublisert =
        stilling.status === Status.Inaktiv && stilling.activationOnPublishingDate;

    const kanStoppeStilling =
        stilling.status === Status.Aktiv || (stilling.status === Status.Inaktiv && vilBliPublisert);

    return (
        <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item onClick={() => onItemClick(copyAd)}>
                Kopier
            </Dropdown.Menu.GroupedList.Item>
            {!kanStoppeStilling ? (
                <Tooltip
                    content={`Du kan ikke stoppe en stilling som har status: "${getAdStatusLabel(
                        stilling.status,
                        stilling.deactivatedByExpiry!
                    ).toLowerCase()}"`}
                >
                    <Dropdown.Menu.GroupedList.Item className={css.disabledValg}>
                        Stopp
                    </Dropdown.Menu.GroupedList.Item>
                </Tooltip>
            ) : (
                <Dropdown.Menu.GroupedList.Item onClick={() => onItemClick(stopAd)}>
                    Stopp
                </Dropdown.Menu.GroupedList.Item>
            )}
        </Dropdown.Menu.GroupedList>
    );
};

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid: string) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    copyAd: (uuid: string) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid }),
});

export default connect(null, mapDispatchToProps)(DropdownMeny);
