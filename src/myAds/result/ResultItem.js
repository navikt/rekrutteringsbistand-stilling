import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import getEmployerName from '../../common/getEmployerName';
import { formatISOString } from '../../utils';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import AWithIcon from '../../common/aWithIcon/AWithIcon';
import './Icons.less';
import './Result.less';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import ResultItemDropDown from './ResultItemDropDown';

const ResultItem = ({ ad, copiedAds, reportee }) => {
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const isCopy = copiedAds.includes(ad.uuid);
    const isTransferredToOther =
        ad.rekruttering &&
        ad.rekruttering.eierNavident &&
        ad.administration &&
        ad.administration.navIdent &&
        ad.rekruttering.eierNavident !== ad.administration.navIdent &&
        reportee &&
        ad.rekruttering.eierNavident != reportee.navIdent;

    const colTitle = (
        <td className="Col-title">
            <div className="ResultItem__column Col-title-inner">
                <Link className="typo-normal lenke" to={`/stilling/${ad.uuid}`}>
                    {isCopy
                        ? (
                              <div>
                                  <b>{ad.title.substr(0, 5)}</b>
                                  {ad.title.substr(5)}
                              </div>
                          ) || ''
                        : ad.title || ''}
                </Link>
            </div>
        </td>
    );

    const colUpdated = (
        <td className="Col-updated">
            {ad.updated && (
                <Normaltekst className="ResultItem__column">
                    {formatISOString(ad.updated, 'DD.MM.YYYY')}
                </Normaltekst>
            )}
        </td>
    );

    if (isTransferredToOther) {
        return (
            <tr className={`ResultItem${isCopy ? ' copied' : ''}`}>
                {colUpdated}
                {colTitle}
                <td className="Col-id Col-transferred">
                    <Normaltekst className="ResultItem__column">
                        Overført til annen veileder.
                    </Normaltekst>
                </td>
                <td className="Col-employer"></td>
                <td className="Col-expires"></td>
                <td className="Col-privacy"></td>
                <td className="Col-status"></td>
                <td className="Col-candidate"></td>
                <td className="Col-edit center"></td>
                <td className="Col-menu"></td>
            </tr>
        );
    }

    return (
        <tr className={`ResultItem${isCopy ? ' copied' : ''}`}>
            {colUpdated}
            {colTitle}
            <td className="Col-id">
                {ad.id && <Normaltekst className="ResultItem__column">{ad.id}</Normaltekst>}
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
                        {ad.privacy === PrivacyStatusEnum.SHOW_ALL ? 'Arbeidsplassen' : 'Internt'}
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
                        state: { openInEditMode: true },
                    }}
                >
                    <i className="Edit__icon" />
                </Link>
            </td>
            <td className="Col-menu">
                <button
                    className="Inner__button Icon__button"
                    aria-label="Meny"
                    type="button"
                    title="meny"
                    tabIndex={0}
                    onClick={() => setDropDownVisible(!dropDownVisible)}
                >
                    <i className="Menu__icon" />
                </button>
                {dropDownVisible && (
                    <ResultItemDropDown
                        ad={ad}
                        visible={dropDownVisible}
                        setVisible={setDropDownVisible}
                    />
                )}
            </td>
        </tr>
    );
};

ResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string,
        deactivatedByExpiry: PropTypes.bool,
    }).isRequired,
    copiedAds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
    copiedAds: state.ad.copiedAds,
});

export default connect(mapStateToProps)(ResultItem);
