import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import getWorkLocation from '../../common/getWorkLocation';
import getEmployerName from '../../common/getEmployerName';
import { formatISOString } from '../../utils';
import './SearchResult.less';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import AWithIcon from '../../common/aWithIcon/AWithIcon';

const SearchResultItem = ({ ad }) => (
    <Row className="SearchResultItem">
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                {ad.published ? formatISOString(ad.published) : ''}
            </Normaltekst>
        </Column>
        <Column md="3">
            <div className="SearchResultItem__column">
                <Link
                    className="typo-normal lenke"
                    to={`/stilling/${ad.uuid}`}
                >
                    {ad.title ? ad.title : ''}
                </Link>
            </div>
        </Column>
        <Column md="3">
            <Normaltekst className="SearchResultItem__column">
                {getEmployerName(ad)}
            </Normaltekst>
        </Column>
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                {getWorkLocation(ad.locationList, true) || ''}
            </Normaltekst>
        </Column>
        <Column md="1">
            {ad.privacy && (
                <Normaltekst className="SearchResultItem__column">
                    {ad.privacy === PrivacyStatusEnum.SHOW_ALL
                        ? 'Nav.no' : 'Internt'}
                </Normaltekst>
            )}
        </Column>
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                {ad.expires ? formatISOString(ad.expires) : ''}
            </Normaltekst>
        </Column>
        <Column md="2">
            {ad.source === 'DIR' && (
                <div className="SearchResultItem__column">
                    <AWithIcon
                        href={`/kandidater/lister/stilling/${ad.uuid}/detaljer`}
                        classNameText="typo-normal"
                        classNameLink="CandidateList"
                        text="Se kandidatliste"
                    />
                </div>
            )}
        </Column>
    </Row>
);

SearchResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

export default SearchResultItem;
