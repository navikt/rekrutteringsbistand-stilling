import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import getEmployerName from '../../common/getEmployerName';
import { formatISOString, toDate } from '../../utils';
import { COPY_AD_FROM_MY_ADS, SHOW_DELETE_MODAL_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../ad/adReducer';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import AWithIcon from '../../common/aWithIcon/AWithIcon';
import './Icons.less';
import './Result.less';
import {getAdStatusLabel} from '../../common/enums/getEnumLabels';
import DropDown from './DropDown';

const ResultItem = ({ ad, copiedAds, stopAd, deleteAd, copyAd }) => {
    const [visible, setVisible ] = useState(false);
    const onDropDownClick = () => {
        setVisible(!visible);
    };

    const isCopy = copiedAds.includes(ad.uuid);

    return (
        <tr className={`ResultItem${isCopy ? ' copied' : ''}`}>
            <td className="Col-updated">
                {ad.updated && (
                    <Normaltekst className="ResultItem__column">
                        {formatISOString(ad.updated, 'DD.MM.YYYY')}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-title">
                <div className="ResultItem__column Col-title-inner">
                    <Link
                        className="typo-normal lenke"
                        to={`/stilling/${ad.uuid}`}
                    >
                        {isCopy ? (
                            <div><b>{ad.title.substr(0, 5)}</b>{ad.title.substr(5)}</div> || ''
                        ) : (
                            ad.title || ''
                        )}
                    </Link>
                </div>
            </td>
            <td className="Col-id">
                {ad.id && (
                    <Normaltekst className="ResultItem__column">
                        {ad.id}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-employer">
                <Normaltekst className="ResultItem__column Col-employer-inner">
                    {getEmployerName(ad)}
                </Normaltekst>
            </td>
            <td className="Col-expires">
                {ad.expires && (
                    <Normaltekst className="ResultItem__column">
                        {formatISOString(ad.expires)}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-privacy">
                {ad.privacy && (
                    <Normaltekst className="ResultItem__column">
                        {ad.privacy === PrivacyStatusEnum.SHOW_ALL
                            ? 'Nav.no' : 'Internt'}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-status">
                {ad.status && (
                    <Normaltekst className="ResultItem__column">
                        {getAdStatusLabel(ad.status, ad.deactivatedByExpiry)}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-candidate">
                <AWithIcon
                    href={`/kandidater/lister/stilling/${ad.uuid}/detaljer`}
                    classNameText="typo-normal"
                    classNameLink="CandidateList"
                    text="Se kandidatliste"
                />
            </td>
            <td className="Col-edit center">
                <Link
                    className="Icon__button Inner__button"
                    aria-label="Rediger"
                    title="rediger"
                    to={{
                        pathname: `/stilling/${ad.uuid}`,
                        state: { openInEditMode: true }
                    }}
                >
                    <i className="Edit__icon" />
                </Link>
            </td>
            <td className="Col-menu">
                <div
                    className="Inner__button"
                    aria-label="Meny"
                    role="button"
                    title="meny"
                    onClick={onDropDownClick}
                >
                    <i className="Menu__icon" />
                </div>
                <DropDown
                    items={[
                        { label: 'Kopier', onClick: () => undefined },
                        { label: 'Stopp', onClick: () => undefined },
                        { label: 'Slett', onClick: () => undefined },
                        { label: 'Arkiver', onClick: () => undefined }
                    ]}
                    visible={visible}
                />
            </td>
        </tr>
    );
}

ResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string,
        deactivatedByExpiry: PropTypes.bool
    }).isRequired,
    stopAd: PropTypes.func.isRequired,
    deleteAd: PropTypes.func.isRequired,
    copyAd: PropTypes.func.isRequired,
    copiedAds: PropTypes.arrayOf(PropTypes.string).isRequired
};


const mapStateToProps = (state) => ({
    copiedAds: state.ad.copiedAds,
});

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    deleteAd: (uuid) => dispatch({ type: SHOW_DELETE_MODAL_MY_ADS, uuid }),
    copyAd: (uuid) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid })
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultItem);
