import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import capitalizeEmployerName from '../../ad/edit/employer/capitalizeEmployerName';
import { formatISOString } from '../../utils';
import AdStatusEnum from '../enums/AdStatusEnum';
import './SearchResult.less';
import PrivacyStatusEnum from '../../ad/administration/publishing/PrivacyStatusEnum';
import LinkWithIcon from '../../common/linkWithIcon/LinkWithIcon';

const SearchResultItem = ({ ad }) => (
    <Row className="SearchResultItem">
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                {ad.created ? formatISOString(ad.created, 'DD.MM.YYYY hh:mm') : ''}
            </Normaltekst>
        </Column>
        <Column md="3">
            <div className="SearchResultItem__column">
                <Link
                    className="typo-normal lenke"
                    to={`/ads/${ad.uuid}`}
                >
                    {ad.title ? ad.title : ''}
                </Link>
            </div>
        </Column>
        <Column md="2">
            <Normaltekst className="SearchResultItem__column">
                {ad.employer && ad.employer.name ? capitalizeEmployerName(ad.employer.name) : ''}
            </Normaltekst>
        </Column>
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                {ad.status ? AdStatusEnum[ad.status] : ''}
            </Normaltekst>
        </Column>
        <Column md="1">
            {ad.privacy && (
                <Normaltekst className="SearchResultItem__column">
                    {ad.privacy === PrivacyStatusEnum.SHOW_ALL
                        ? 'Arbeidsplassen' : 'Internt'}
                </Normaltekst>
            )}
        </Column>
        <Column md="2">
            <div className="SearchResultItem__column">
                <div className="SearchResultItem__column__flex">
                    <Normaltekst className="SearchResultItem__column__flex__ellipsis">
                        {ad.administration && ad.administration.reportee ? ad.administration.reportee : ''}
                        {ad.administration && ad.administration.navIdent ? ` (${ad.administration.navIdent})` : ''}
                    </Normaltekst>
                </div>
            </div>
        </Column>
        <Column md="2">
            {ad.source === 'DIR' && (
                <div className="SearchResultItem__column">
                    <LinkWithIcon
                        to={'#'}
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
