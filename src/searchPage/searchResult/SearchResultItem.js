import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                    <div className="SearchResultItem__column typo-normal">
                        {ad.administration && ad.administration.reportee ? ad.administration.reportee : ''}
                        {ad.administration && ad.administration.reportee && ad.administration.reportee !== '' ? (
                            <LinkButton disabled={adsBeingSaved.includes(ad.uuid)} onClick={this.onUnAssignClick}>
                                <span className="SearchResultItem__column__unassign" aria-label="Fjern saksbehandler">
                                    <svg
                                        contentScriptType="text/ecmascript"
                                        zoomAndPan="magnify"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        contentStyleType="text/css"
                                        id="Filled_Version"
                                        enableBackground="new 0 0 24 24"
                                        version="1.1"
                                        xmlSpace="preserve"
                                        width="12px"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        height="12px"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                    >
                                        <path
                                            fill="#0067c5"
                                            d="M17.207,12.01l6.658-6.634c0.096-0.093,0.149-0.22,0.149-0.353c0-0.133-0.053-0.26-0.146-0.354L19.375,0.16  c-0.092-0.094-0.221-0.147-0.352-0.147h-0.002c-0.133,0-0.26,0.052-0.352,0.146l-6.66,6.634L5.375,0.134  C5.283,0.04,5.154-0.013,5.023-0.014H5.021c-0.133,0-0.258,0.053-0.352,0.146L0.16,4.624c-0.195,0.194-0.195,0.511-0.002,0.707  l6.635,6.659l-6.66,6.634c-0.195,0.194-0.195,0.511,0,0.707l4.49,4.509c0.094,0.094,0.221,0.146,0.354,0.146h0.002  c0.131,0,0.258-0.052,0.352-0.146l6.66-6.634l6.633,6.659c0.098,0.099,0.227,0.148,0.355,0.148c0.127,0,0.254-0.049,0.352-0.146  l4.51-4.491c0.195-0.194,0.195-0.511,0-0.707L17.207,12.01z"
                                        />
                                    </svg>
                                </span>
                            </LinkButton>
                        ) : (
                            <LinkButton disabled={adsBeingSaved.includes(ad.uuid)} onClick={this.onAssignToMeClick}>
                                Marker som min
                            </LinkButton>
                        )}
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
