import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio, SkjemaGruppe, Fieldset } from 'nav-frontend-skjema';
import {
    CHANGE_PRIVACY_FILTER,
    CHANGE_SOURCE_FILTER,
    CHANGE_STATUS_FILTER,
    FETCH_ADS
} from '../searchReducer';
import AdStatusEnum from '../../common/enums/AdStatusEnum';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import FilterLocation from './location/FilterLocation';
import {getAdStatusLabel, getPrivacyStatusLabel} from '../../common/enums/getEnumLabels';

class Filter extends React.Component {
    onPrivacyFilterChange = (e) => {
        const { changePrivacyFilter } = this.props;
        if (e.target.value !== 'Alle') {
            changePrivacyFilter(e.target.value);
        } else {
            changePrivacyFilter(undefined);
        }
    };

    onStatusFilterChange = (e) => {
        const { changeStatusFilter } = this.props;
        if (e.target.value === 'Alle') {
            changeStatusFilter(undefined, undefined);
        } else if (e.target.value === 'Utløpt') {
            changeStatusFilter(undefined, true);
        } else {
            changeStatusFilter(e.target.value, false);
        }
    };

    onSourceFilterChange = (e) => {
        const { changeSourceFilter } = this.props;
        if (e.target.value !== 'Alle') {
            changeSourceFilter(e.target.value);
        } else {
            changeSourceFilter(undefined);
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.search();
    };

    render() {
        const { adStatus, privacy, source, deactivatedByExpiry } = this.props;
        return (
            <form onSubmit={this.onSubmit}>
                <SkjemaGruppe className="blokk-l">
                    <Fieldset
                        legend="Status"
                    >
                        {Object.keys(AdStatusEnum)
                            .filter((key) => key !== AdStatusEnum.INACTIVE && key !== AdStatusEnum.REJECTED
                                && key !== AdStatusEnum.DELETED)
                            .map((key) => (
                                <Radio
                                    key={key}
                                    label={getAdStatusLabel(AdStatusEnum[key])}
                                    value={key}
                                    checked={(adStatus === key) && (deactivatedByExpiry !== true)}
                                    name="adStatus"
                                    onChange={this.onStatusFilterChange}
                                />
                            ))}
                        <Radio
                            label="Utløpt"
                            value="Utløpt"
                            checked={(adStatus === undefined) && (deactivatedByExpiry === true)}
                            name="adStatus"
                            onChange={this.onStatusFilterChange}
                        />
                        <Radio
                            label="Alle"
                            value="Alle"
                            checked={(adStatus === undefined) && (deactivatedByExpiry === undefined)}
                            name="adStatus"
                            onChange={this.onStatusFilterChange}
                        />
                    </Fieldset>
                </SkjemaGruppe>
                <SkjemaGruppe className="blokk-l">
                    <Fieldset
                        legend="Publisert"
                    >
                        <Radio
                            label="Alle"
                            value="Alle"
                            checked={privacy === undefined}
                            name="privacyStatus"
                            onChange={this.onPrivacyFilterChange}
                        />
                        {Object.keys(PrivacyStatusEnum).map((key) => (
                            <Radio
                                key={key}
                                label={getPrivacyStatusLabel( PrivacyStatusEnum[key])}
                                value={key}
                                name="privacyStatus"
                                checked={privacy === key}
                                onChange={this.onPrivacyFilterChange}
                            />
                        ))}
                    </Fieldset>
                </SkjemaGruppe>
                <SkjemaGruppe className="blokk-l">
                    <Fieldset
                        legend="Kilde"
                    >
                        <Radio
                            label="Alle"
                            value="Alle"
                            checked={source === undefined}
                            name="source"
                            onChange={this.onSourceFilterChange}
                        />
                        <Radio
                            label="Direktemeldt stilling"
                            value="DIR"
                            checked={source === 'DIR'}
                            name="source"
                            onChange={this.onSourceFilterChange}
                        />
                    </Fieldset>
                </SkjemaGruppe>
                <FilterLocation />
            </form>
        );
    }
}

Filter.defaultProps = {
    adStatus: undefined,
    source: undefined,
    privacy: undefined,
    deactivatedByExpiry: undefined
};

Filter.propTypes = {
    search: PropTypes.func.isRequired,
    changeStatusFilter: PropTypes.func.isRequired,
    changePrivacyFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    adStatus: PropTypes.string,
    source: PropTypes.string,
    privacy: PropTypes.string,
    deactivatedByExpiry: PropTypes.bool
};

const mapStateToProps = (state) => ({
    adStatus: state.search.status,
    source: state.search.source,
    privacy: state.search.privacy,
    deactivatedByExpiry: state.search.deactivatedByExpiry
});

const mapDispatchToProps = (dispatch) => ({
    search: () => dispatch({ type: FETCH_ADS }),
    changePrivacyFilter: (value) => dispatch({ type: CHANGE_PRIVACY_FILTER, value }),
    changeStatusFilter: (status, deactivatedByExpiry) => dispatch({ type: CHANGE_STATUS_FILTER, status, deactivatedByExpiry }),
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
