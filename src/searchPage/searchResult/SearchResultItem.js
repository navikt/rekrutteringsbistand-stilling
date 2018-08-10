import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { formatISOString } from '../../utils';
import AdStatusEnum from '../enums/AdStatusEnum';
import './SearchResult.less';

export default class SearchResultItem extends React.Component {
    render() {
        const { ad } = this.props;
        const { properties } = ad;
        return (
            <Row className="SearchResultItem">
                <Column md="1">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.id ? ad.id : ''}
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
                        {properties.jobtitle ? properties.jobtitle : ''}
                    </Normaltekst>
                </Column>
                <Column md="2">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.employer && ad.employer.name ? ad.employer.name : ''}
                    </Normaltekst>
                </Column>
                <Column md="1">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.source ? ad.source : ''}
                    </Normaltekst>
                </Column>
                <Column md="2">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.published ? formatISOString(ad.published, 'D. MMMM YYYY') : ''}
                    </Normaltekst>
                </Column>
                <Column md="1">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.status ? AdStatusEnum[ad.status] : ''}
                    </Normaltekst>
                </Column>
            </Row>
        );
    }
}

SearchResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};
