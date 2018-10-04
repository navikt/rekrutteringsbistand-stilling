import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminStatusEnum2 from '../../ad/administration/adminStatus/AdminStatusEnum';
import capitalizeEmployerName from '../../ad/administration/employer/capitalizeEmployerName';
import LinkButton from '../../common/linkbutton/LinkButton';
import { formatISOString } from '../../utils';
import AdminStatusEnum from '../enums/AdminStatusEnum';
import AdStatusEnum from '../enums/AdStatusEnum';
import { ASSIGN_TO_ME_SEARCH_RESULT_ITEM, UN_ASSIGN_SEARCH_RESULT_ITEM } from '../searchReducer';
import './SearchResult.less';

class SearchResultItem extends React.Component {
    onUnAssignClick = () => {
        this.props.unAssign(this.props.ad);
    };

    onAssignToMeClick = () => {
        this.props.assignToMe(this.props.ad);
    };

    render() {
        const { ad, adsBeingSaved } = this.props;
        return (
            <Row className="SearchResultItem">
                <Column md="1">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.created ? formatISOString(ad.created, 'DD.MM.YYYY') : ''}
                    </Normaltekst>
                </Column>
                <Column md="4">
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
                        {ad.source ? ad.source : ''}
                    </Normaltekst>
                </Column>
                <Column md="1">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.status ? AdStatusEnum[ad.status] : ''}
                    </Normaltekst>
                </Column>
                <Column md="1">
                    <Normaltekst className="SearchResultItem__column">
                        {ad.administration && ad.administration.status && AdminStatusEnum[ad.administration.status] ?
                            AdminStatusEnum[ad.administration.status] : ''}
                    </Normaltekst>
                </Column>
                <Column md="2">
                    <div className="SearchResultItem__column">
                        <div className="SearchResultItem__column__flex">
                            <Normaltekst className="SearchResultItem__column__flex__ellipsis">
                                {ad.administration && ad.administration.reportee ? ad.administration.reportee : ''}
                            </Normaltekst>
                            {ad.administration &&
                                ad.administration.status === AdminStatusEnum2.PENDING &&
                                ad.administration.reportee &&
                                ad.administration.reportee !== '' && (
                                    <LinkButton
                                        className="SearchResultItem__column__unassign"
                                        disabled={adsBeingSaved.includes(ad.uuid)}
                                        onClick={this.onUnAssignClick}
                                        aria-label="Fjern saksbehandler"
                                        title="Fjern saksbehandler"
                                    >
                                        Fjern
                                    </LinkButton>
                                )
                            }
                            {ad.administration &&
                                ad.administration.status === AdminStatusEnum2.RECEIVED &&
                                !ad.administration.reportee && (
                                    <LinkButton
                                        disabled={adsBeingSaved.includes(ad.uuid)}
                                        onClick={this.onAssignToMeClick}
                                    >
                                        Marker som min
                                    </LinkButton>
                                )
                            }
                        </div>
                    </div>
                </Column>
                <Column md="1" />
            </Row>
        );
    }
}

SearchResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired,
    unAssign: PropTypes.func.isRequired,
    assignToMe: PropTypes.func.isRequired,
    adsBeingSaved: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state) => ({
    adsBeingSaved: state.search.adsBeingSaved
});

const mapDispatchToProps = (dispatch) => ({
    assignToMe: (ad) => dispatch({ type: ASSIGN_TO_ME_SEARCH_RESULT_ITEM, ad }),
    unAssign: (ad) => dispatch({ type: UN_ASSIGN_SEARCH_RESULT_ITEM, ad })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultItem);
