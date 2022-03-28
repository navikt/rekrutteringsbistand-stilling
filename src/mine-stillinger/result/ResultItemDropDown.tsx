import React, { FunctionComponent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdStatusEnum from '../../common/enums/AdStatusEnum';
import { COPY_AD_FROM_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../ad/adReducer';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import { Flatknapp } from 'nav-frontend-knapper';
import Stilling from '../../Stilling';
import './ResultItemDropDown.less';

const DropDownItem = ({ label, onClick, active, helpText, onToggleHjelpetekst }) => {
    const onHjelpetekstClick = (event: MouseEvent<HTMLDivElement>) => {
        onToggleHjelpetekst({ anker: event.currentTarget, tekst: helpText });
        event.stopPropagation();
    };

    return active ? (
        <Flatknapp mini onClick={onClick} className="ResultItemDropDown__knapp">
            {label}
        </Flatknapp>
    ) : (
        <>
            <div className="ResultItemDropDown__item" onClick={onHjelpetekstClick}>
                {label}
            </div>
        </>
    );
};

DropDownItem.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    helpText: PropTypes.string,
    refProp: PropTypes.object,
};

DropDownItem.defaultProps = {
    helpText: '',
    refProp: undefined,
};

type ResultItemDropDownProps = {
    stilling: Stilling;
    onToggleHjelpetekst: (nyHjelpetekst: any) => void;
    stopAd: (uuid: string) => void;
    copyAd: (uuid: string) => void;
};

const ResultItemDropDown: FunctionComponent<ResultItemDropDownProps> = ({
    stilling,
    copyAd,
    stopAd,
    onToggleHjelpetekst,
}) => {
    const willBePublished =
        stilling.status === AdStatusEnum.INACTIVE && stilling.activationOnPublishingDate;

    const onItemClick = (action) => {
        action(stilling.uuid);
    };

    return (
        <div>
            <ul className="ResultItemDropDown">
                <DropDownItem
                    label="Kopier"
                    onClick={() => onItemClick(copyAd)}
                    active
                    onToggleHjelpetekst={onToggleHjelpetekst}
                />
                <DropDownItem
                    label="Stopp"
                    onClick={() => onItemClick(stopAd)}
                    active={
                        stilling.status === AdStatusEnum.ACTIVE ||
                        (stilling.status === AdStatusEnum.INACTIVE && willBePublished)
                    }
                    helpText={`Du kan ikke stoppe en stilling som har status: "${getAdStatusLabel(
                        stilling.status,
                        stilling.deactivatedByExpiry
                    ).toLowerCase()}"`}
                    onToggleHjelpetekst={onToggleHjelpetekst}
                />
            </ul>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid: string) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    copyAd: (uuid: string) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid }),
});

export default connect(null, mapDispatchToProps)(ResultItemDropDown);
