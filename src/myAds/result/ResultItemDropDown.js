import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ResultItemDropDown.less';
import AdStatusEnum from '../../common/enums/AdStatusEnum';
import { COPY_AD_FROM_MY_ADS, SHOW_DELETE_MODAL_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../ad/adReducer';
import { connect } from 'react-redux';
import { HjelpetekstUnderVenstre } from 'nav-frontend-hjelpetekst';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';

const DropDownItem = ({ label, onClick, active, helpText, refProp }) => {
    const item = (
        <li
            className={`typo-normal${active ? '' : ' disabled'}`}
            onClick={active ? onClick : null}
            tabIndex={active ? 0 : -1}
            ref={refProp}
        >{label}</li>
    );

    return active ? item : (
        <HjelpetekstUnderVenstre
            id={label}
            anchor={() => item}
            tittel={label}
            children={helpText}
        />
    );
};

DropDownItem.propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

const ResultItemDropDown = ({ ad, copyAd, stopAd, deleteAd, visible, setVisible }) => {
    const listRef = useRef(null);
    const copyRef = useRef(null);
    const stopRef = useRef(null);
    const deleteRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleCloseMenu);
        return () => document.removeEventListener("click", handleCloseMenu);
    }, []);

    const willBePublished = ad.status === AdStatusEnum.INACTIVE && ad.activationOnPublishingDate;

    const onItemClick = (action) => {
        action(ad.uuid);
        setVisible(false);
    };

    const handleCloseMenu = () => {
        window.setTimeout(() => {
            if (!hasFocus()) {
                setVisible(false);
            }
        }, 0);
    };

    const hasFocus = () => {
        const active = document.activeElement;
        return listRef.current === active
            || copyRef.current === active
            || stopRef.current === active
            || deleteRef.current === active
            || active.className.includes('hjelpetekst');
    };

    return (
        <div>
            <ul
                className="ResultItemDropDown"
                ref={listRef}
                onBlur={handleCloseMenu}
            >
                <DropDownItem
                    label={'Kopier'}
                    onClick={() => onItemClick(copyAd)}
                    active={true}
                    refProp={copyRef}
                />
                <DropDownItem
                    label={'Stopp'}
                    onClick={() => onItemClick(stopAd)}
                    active={ad.status === AdStatusEnum.ACTIVE && !willBePublished}
                    helpText={`Du kan ikke stoppe en stilling som er ${
                            getAdStatusLabel(ad.status, ad.deactivatedByExpiry).toLowerCase()
                        }`
                    }
                    refProp={stopRef}
                />
                <DropDownItem
                    label={'Slett'}
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
    items: PropTypes.arrayOf(PropTypes.shape(DropDownItem)),
    stopAd: PropTypes.func.isRequired,
    deleteAd: PropTypes.func.isRequired,
    copyAd: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    deleteAd: (uuid) => dispatch({ type: SHOW_DELETE_MODAL_MY_ADS, uuid }),
    copyAd: (uuid) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid })
});

export default connect(null, mapDispatchToProps)(ResultItemDropDown);
