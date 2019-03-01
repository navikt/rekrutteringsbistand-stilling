/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ResultItemDropDown.less';
import { HjelpetekstVenstre } from 'nav-frontend-hjelpetekst';
import AdStatusEnum from '../../common/enums/AdStatusEnum';
import { COPY_AD_FROM_MY_ADS, SHOW_DELETE_MODAL_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../ad/adReducer';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';

const DropDownItem = ({ label, onClick, active, helpText, refProp }) => {
    const handleKeyDown = (event) => {
        if ((event.keyCode === 13 || event.keyCode === 32) && active) {
            onClick();
        }
    };

    const item = (
        <div
            className={`typo-normal${active ? '' : ' disabled'}`}
            onClick={active ? onClick : null}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={active ? 0 : -1}
            ref={refProp}
        >
            {label}
        </div>
    );

    return active ? item : (
        <HjelpetekstVenstre
            id={label}
            anchor={() => item}
            tittel={label}
            className="hjelpetekst__meny"
        >
            {helpText}
        </HjelpetekstVenstre>
    );
};

DropDownItem.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    helpText: PropTypes.string,
    refProp: PropTypes.object
};

DropDownItem.defaultProps = {
    helpText: '',
    refProp: undefined
};

const ResultItemDropDown = ({ ad, copyAd, stopAd, deleteAd, setVisible }) => {
    const listRef = useRef(null);
    const copyRef = useRef(null);
    const stopRef = useRef(null);
    const deleteRef = useRef(null);

    const hasFocus = () => {
        const active = document.activeElement;
        return listRef.current === active
            || copyRef.current === active
            || stopRef.current === active
            || deleteRef.current === active
            || active.className.includes('hjelpetekst')
            || active.className.includes('lukknapp');
    };

    const handleCloseMenu = () => {
        window.setTimeout(() => {
            if (!hasFocus()) {
                setVisible(false);
            }
        }, 0);
    };

    useEffect(() => {
        document.addEventListener('click', handleCloseMenu);
        return () => document.removeEventListener('click', handleCloseMenu);
    }, []);

    const willBePublished = ad.status === AdStatusEnum.INACTIVE && ad.activationOnPublishingDate;

    const onItemClick = (action) => {
        action(ad.uuid);
        setVisible(false);
    };

    return (
        <div>
            <ul
                className="ResultItemDropDown"
                ref={listRef}
                onBlur={handleCloseMenu}
            >
                <DropDownItem
                    label="Kopier"
                    onClick={() => onItemClick(copyAd)}
                    refProp={copyRef}
                    active
                />
                <DropDownItem
                    label="Stopp"
                    onClick={() => onItemClick(stopAd)}
                    active={
                        ad.status === AdStatusEnum.ACTIVE || (ad.status === AdStatusEnum.INACTIVE && willBePublished)
                    }
                    helpText={`Du kan ikke stoppe en stilling som er ${
                        getAdStatusLabel(ad.status, ad.deactivatedByExpiry).toLowerCase()
                    }`}
                    refProp={stopRef}
                />
                <DropDownItem
                    label="Slett"
                    onClick={() => onItemClick(deleteAd)}
                    active={!ad.publishedByAdmin}
                    helpText={`Du kan ikke slette en stilling som ${willBePublished
                        ? 'blir publisert frem i tid'
                        : 'har blitt publisert'} `
                    }
                    refProp={deleteRef}
                />
            </ul>
            <div className="arrow-up" />
        </div>
    );
};

ResultItemDropDown.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string,
        deactivatedByExpiry: PropTypes.bool
    }).isRequired,
    stopAd: PropTypes.func.isRequired,
    deleteAd: PropTypes.func.isRequired,
    copyAd: PropTypes.func.isRequired,
    setVisible: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    deleteAd: (uuid) => dispatch({ type: SHOW_DELETE_MODAL_MY_ADS, uuid }),
    copyAd: (uuid) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid })
});

export default connect(null, mapDispatchToProps)(ResultItemDropDown);
