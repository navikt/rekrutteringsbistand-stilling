import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'nav-frontend-skjema';
import { FETCH_MY_ADS } from '../myAdsReducer';
import { CHANGE_STATUS_FILTER } from '../myAdsReducer';
import AdStatusEnum from '../../searchPage/enums/AdStatusEnum';

class StatusFilter extends React.Component {
    onFilterChange = (e) => {
        this.props.changeStatusFilter(e.target.value);
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
                    <option key="alle" value="alle">Alle</option>
                    {Object.keys(AdStatusEnum).map((key) => (
                        <option key={key} value={key}>
                            {AdStatusEnum[key]}
                        </option>
                    ))}
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
    changeStatusFilter: (status) => dispatch({ type: CHANGE_STATUS_FILTER, status })
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);
