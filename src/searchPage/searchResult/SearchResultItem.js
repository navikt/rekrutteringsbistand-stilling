import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getTruncatedWorkLocation } from '../../common/getWorkLocation';
import getEmployerName from '../../common/getEmployerName';
import { formatISOString } from '../../utils';
import './SearchResult.less';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import AWithIcon from '../../common/aWithIcon/AWithIcon';

const SearchResultItem = ({ ad }) => {
    const overfoert = ad.rekruttering && ad.rekruttering.rekrutteringUuid;
    return(
    <tr className="SearchResultItem">
        <td>
            <Normaltekst className="SearchResultItem__column">
                {ad.published ? formatISOString(ad.published) : ''}
            </Normaltekst>
        </td>
        <td>
            <div className="SearchResultItem__column">
                <Link
                    className="AdTitle_link typo-normal lenke"
                    to={`/stilling/${ad.uuid}`}
                >
                    {ad.title ? ad.title : ''}
                </Link>
            </div>
        </td>
        <td>
            <Normaltekst className="SearchResultItem__column">
                {getEmployerName(ad)}
            </Normaltekst>
        </td>
        <td>
            <Normaltekst className="SearchResultItem__column">
                {getTruncatedWorkLocation(ad.locationList) || ''}
            </Normaltekst>
        </td>
        <td>
            {ad.privacy && (
                <Normaltekst className="SearchResultItem__column">
                    {ad.privacy === PrivacyStatusEnum.SHOW_ALL
                        ? 'Nav.no' : 'Internt'}
                </Normaltekst>
            )}
        </td>
        <td>
            <Normaltekst className="SearchResultItem__column">
                {ad.expires ? formatISOString(ad.expires) : ''}
            </Normaltekst>
        </td>
        <td>
            {(ad.source === 'DIR' || overfoert) && (
                <div className="SearchResultItem__column">
                    <AWithIcon
                        href={`/kandidater/lister/stilling/${ad.uuid}/detaljer`}
                        classNameText="typo-normal"
                        classNameLink="CandidateList"
                        text="Se kandidatliste"
                    />
                </div>
            )}
        </td>
    </tr>)
};

SearchResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

export default SearchResultItem;
