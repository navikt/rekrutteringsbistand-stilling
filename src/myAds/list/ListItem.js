import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import capitalizeEmployerName from '../../ad/edit/employer/capitalizeEmployerName';
import { formatISOString } from '../../utils';
import AdStatusEnum from '../../searchPage/enums/AdStatusEnum';
import PrivacyStatusEnum from '../../ad/administration/publishing/PrivacyStatusEnum';

const ListItem = ({ ad }) => (
    <Row className="SearchResultItem">
        <Column md="1">
            {ad.updated && (
                <Normaltekst className="SearchResultItem__column">
                    {formatISOString(ad.updated, 'DD.MM.YYYY')}
                </Normaltekst>
            )}
        </Column>
        <Column md="2">
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
            {ad.employer && ad.employer.name && (
                <Normaltekst className="SearchResultItem__column">
                    {capitalizeEmployerName(ad.employer.name)}
                </Normaltekst>
            )}
        </Column>
        <Column md="1">
            {ad.status && AdStatusEnum[ad.status] && (
                <Normaltekst className="SearchResultItem__column">
                    {AdStatusEnum[ad.status]}
                </Normaltekst>
            )}
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
            <Normaltekst className="SearchResultItem__column">
                Kandidatliste
            </Normaltekst>
        </Column>
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                Kopier
            </Normaltekst>
        </Column>
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                Rediger
            </Normaltekst>
        </Column>
        <Column md="1">
            <Normaltekst className="SearchResultItem__column">
                Slett
            </Normaltekst>
        </Column>
    </Row>
);

ListItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

export default ListItem;
