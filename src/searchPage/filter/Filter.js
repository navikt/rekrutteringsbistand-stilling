import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio } from 'nav-frontend-skjema';
import {
    CHANGE_PRIVACY_FILTER,
    CHANGE_SOURCE_FILTER,
    CHANGE_STATUS_FILTER,
    FETCH_ADS,
} from '../searchReducer';
import AdStatusEnum from '../../common/enums/AdStatusEnum';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import FilterLocation from './location/FilterLocation';
import Inkluderingsfilter from './inkludering/Inkluderingsfilter.tsx';
import { getAdStatusLabel, getPrivacyStatusLabel } from '../../common/enums/getEnumLabels';
import Filterpanel from './Filterpanel';
import { erDirektemeldtStilling } from '../../ad/adUtils';

const Filter = ({
    search,
    source,
    adStatus,
    privacy,
    deactivatedByExpiry,
    changePrivacyFilter,
    changeStatusFilter,
    changeSourceFilter,
}) => {
    const onPrivacyFilterChange = (e) => {
        if (e.target.value !== 'Alle') {
            changePrivacyFilter(e.target.value);
        } else {
            changePrivacyFilter(undefined);
        }
    };

    const onStatusFilterChange = (e) => {
        if (e.target.value === 'Alle') {
            changeStatusFilter(undefined, undefined);
        } else if (e.target.value === 'Utløpt') {
            changeStatusFilter(undefined, true);
        } else {
            changeStatusFilter(e.target.value, false);
        }
    };

    const onSourceFilterChange = (e) => {
        if (e.target.value !== 'Alle') {
            changeSourceFilter(e.target.value);
        } else {
            changeSourceFilter(undefined);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        search();
    };

    return (
        <form onSubmit={onSubmit}>
            <Filterpanel label="Status">
                {Object.keys(AdStatusEnum)
                    .filter(
                        (key) =>
                            key !== AdStatusEnum.INACTIVE &&
                            key !== AdStatusEnum.REJECTED &&
                            key !== AdStatusEnum.DELETED
                    )
                    .map((key) => (
                        <Radio
                            key={key}
                            label={getAdStatusLabel(AdStatusEnum[key])}
                            value={key}
                            checked={adStatus === key && deactivatedByExpiry !== true}
                            name="adStatus"
                            onChange={onStatusFilterChange}
                        />
                    ))}
                <Radio
                    label="Utløpt"
                    value="Utløpt"
                    checked={adStatus === undefined && deactivatedByExpiry === true}
                    name="adStatus"
                    onChange={onStatusFilterChange}
                />
                <Radio
                    label="Alle"
                    value="Alle"
                    checked={adStatus === undefined && deactivatedByExpiry === undefined}
                    name="adStatus"
                    onChange={onStatusFilterChange}
                />
            </Filterpanel>
            <Filterpanel label="Publisert">
                <Radio
                    label="Alle"
                    value="Alle"
                    checked={privacy === undefined}
                    name="privacyStatus"
                    onChange={onPrivacyFilterChange}
                />
                {Object.keys(PrivacyStatusEnum).map((key) => (
                    <Radio
                        key={key}
                        label={getPrivacyStatusLabel(PrivacyStatusEnum[key])}
                        value={key}
                        name="privacyStatus"
                        checked={privacy === key}
                        onChange={onPrivacyFilterChange}
                    />
                ))}
            </Filterpanel>
            <Filterpanel label="Kilde">
                <Radio
                    label="Alle"
                    value="Alle"
                    checked={source === undefined}
                    name="source"
                    onChange={onSourceFilterChange}
                />
                <Radio
                    label="Direktemeldt stilling"
                    value="DIR"
                    checked={erDirektemeldtStilling(source)}
                    name="source"
                    onChange={onSourceFilterChange}
                />
            </Filterpanel>
            <FilterLocation />
            <Filterpanel label="Inkludering">
                <Inkluderingsfilter />
            </Filterpanel>
        </form>
    );
};

Filter.defaultProps = {
    adStatus: undefined,
    source: undefined,
    privacy: undefined,
    deactivatedByExpiry: undefined,
};

Filter.propTypes = {
    search: PropTypes.func.isRequired,
    changeStatusFilter: PropTypes.func.isRequired,
    changePrivacyFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    adStatus: PropTypes.string,
    source: PropTypes.string,
    privacy: PropTypes.string,
    deactivatedByExpiry: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    adStatus: state.search.status,
    source: state.search.source,
    privacy: state.search.privacy,
    deactivatedByExpiry: state.search.deactivatedByExpiry,
});

const mapDispatchToProps = (dispatch) => ({
    search: () => dispatch({ type: FETCH_ADS }),
    changePrivacyFilter: (value) => dispatch({ type: CHANGE_PRIVACY_FILTER, value }),
    changeStatusFilter: (status, deactivatedByExpiry) =>
        dispatch({ type: CHANGE_STATUS_FILTER, status, deactivatedByExpiry }),
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
