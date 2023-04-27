import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import AdStatusEnum from '../../common/enums/AdStatusEnum';
import { COPY_AD_FROM_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../stilling/adReducer';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import { Dropdown } from '@navikt/ds-react-internal';
import Stilling from '../../Stilling';
import { Button, Tooltip } from '@navikt/ds-react';
import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import css from './ResultItemDropDown.module.css';

type ResultItemDropDownProps = {
    stilling: Stilling;
    stopAd: (uuid: string) => void;
    copyAd: (uuid: string) => void;
};

const ResultItemDropDown: FunctionComponent<ResultItemDropDownProps> = ({
    stilling,
    copyAd,
    stopAd,
}) => {
    const willBePublished =
        stilling.status === AdStatusEnum.INACTIVE && stilling.activationOnPublishingDate;

    const onItemClick = (action) => {
        action(stilling.uuid);
    };
    const kanStoppeStilling =
        stilling.status === AdStatusEnum.ACTIVE ||
        (stilling.status === AdStatusEnum.INACTIVE && willBePublished);

    return (
        <Dropdown closeOnSelect={false}>
            <Button
                as={Dropdown.Toggle}
                variant="tertiary"
                icon={<MenuHamburgerIcon />}
                aria-label="Meny for stilling"
            />
            <Dropdown.Menu>
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
            </Dropdown.Menu>
        </Dropdown>
    );
};

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid: string) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    copyAd: (uuid: string) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid }),
});

export default connect(null, mapDispatchToProps)(ResultItemDropDown);
