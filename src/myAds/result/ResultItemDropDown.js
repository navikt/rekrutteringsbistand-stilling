import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdStatusEnum from '../../common/enums/AdStatusEnum';
import {
    COPY_AD_FROM_MY_ADS,
    SHOW_DELETE_MODAL_MY_ADS,
    SHOW_STOP_MODAL_MY_ADS,
} from '../../ad/adReducer';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import './ResultItemDropDown.less';

const DropDownItem = ({ label, onClick, active, helpText, onToggleHjelpetekst }) => {
    const onHjelpetekstClick = (event) => {
        onToggleHjelpetekst({ anker: event.currentTarget, tekst: helpText });
        event.stopPropagation();
    };

    return active ? (
        <div
            role="button"
            tabIndex="0"
            className="ResultItemDropDown__item lenke"
            onClick={active ? onClick : null}
        >
            {label}
        </div>
    ) : (
        <>
            <div
                className="ResultItemDropDown__item ResultItemDropDown__item--disabled"
                onClick={onHjelpetekstClick}
            >
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

const ResultItemDropDown = ({ ad, copyAd, stopAd, deleteAd, onToggleHjelpetekst }) => {
    const willBePublished = ad.status === AdStatusEnum.INACTIVE && ad.activationOnPublishingDate;

    const onItemClick = (action) => {
        action(ad.uuid);
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
                        ad.status === AdStatusEnum.ACTIVE ||
                        (ad.status === AdStatusEnum.INACTIVE && willBePublished)
                    }
                    helpText={`Du kan ikke stoppe en stilling som har status: "${getAdStatusLabel(
                        ad.status,
                        ad.deactivatedByExpiry
                    ).toLowerCase()}"`}
                    onToggleHjelpetekst={onToggleHjelpetekst}
                />
                <DropDownItem
                    label="Slett"
                    onClick={() => onItemClick(deleteAd)}
                    active={!ad.publishedByAdmin}
                    helpText={`Du kan ikke slette en stilling som har status: "${
                        willBePublished ? 'blir publisert frem i tid' : 'publisert'
                    }"`}
                    onToggleHjelpetekst={onToggleHjelpetekst}
                />
            </ul>
        </div>
    );
};

ResultItemDropDown.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string,
        deactivatedByExpiry: PropTypes.bool,
    }).isRequired,
    onToggleHjelpetekst: PropTypes.func.isRequired,
    stopAd: PropTypes.func.isRequired,
    deleteAd: PropTypes.func.isRequired,
    copyAd: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    deleteAd: (uuid) => dispatch({ type: SHOW_DELETE_MODAL_MY_ADS, uuid }),
    copyAd: (uuid) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid }),
});

export default connect(null, mapDispatchToProps)(ResultItemDropDown);
