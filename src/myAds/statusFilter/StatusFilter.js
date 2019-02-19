import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'nav-frontend-skjema';
import { FETCH_MY_ADS, CHANGE_STATUS_FILTER } from '../myAdsReducer';
import AdStatusEnum from '../../common/enums/AdStatusEnum';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';

class StatusFilter extends React.Component {
    onFilterChange = (e) => {
        if (e.target.value === 'alle') {
            this.props.changeStatusFilter(undefined, undefined);
        } else if (e.target.value === 'utløpt') {
            this.props.changeStatusFilter(undefined, true);
        } else {
            this.props.changeStatusFilter(e.target.value, false);
        }
        this.props.getAds();
    };

    // TODO: Dropp className="typo-normal" når Select har SourceSansPro som default font.
    render() {
        return (
            <div className="StatusFilter">
                <Select
                    onChange={this.onFilterChange}
                    value={this.props.status}
                    label=""
                    aria-label="Filtrér på status"
                    className="typo-normal StatusFilter-select"
                >
                    <option key="alle" value="alle">Alle status</option>
                    {Object.keys(AdStatusEnum)
                        .filter((key) => key !== AdStatusEnum.REJECTED && key !== AdStatusEnum.DELETED)
                        .map((key) => (
                            <option key={key} value={key}>
                                {getAdStatusLabel(AdStatusEnum[key])}
                            </option>
                        ))
                    }
                    <option key="utløpt" value="utløpt">Utløpt</option>
                </Select>
            </div>
        );
    }
}

StatusFilter.defaultProps = {
    status: undefined
};


StatusFilter.propTypes = {
    status: PropTypes.string,
    changeStatusFilter: PropTypes.func.isRequired,
    getAds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    status: state.myAds.status
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_MY_ADS }),
    changeStatusFilter: (status, deactivatedByExpiry) => dispatch({ type: CHANGE_STATUS_FILTER, status, deactivatedByExpiry })
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);
