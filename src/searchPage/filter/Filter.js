import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import {
    CHANGE_PRIVACY_FILTER,
    CHANGE_SOURCE_FILTER,
    CHANGE_STATUS_FILTER,
    FETCH_ADS
} from '../searchReducer';
import AdStatusEnum from '../enums/AdStatusEnum';
import PrivacyStatusEnum from '../enums/PrivacyStatusEnum';
import FilterLocation from './location/FilterLocation';

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
        if (e.target.value !== 'Alle') {
            changeStatusFilter(e.target.value);
        } else {
            changeStatusFilter(undefined);
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
        const { adStatus, privacy, source } = this.props;
        return (
            <form onSubmit={this.onSubmit}>
                <SkjemaGruppe title="Status" className="blokk-l">
                    {Object.keys(AdStatusEnum)
                        .filter((key) => key !== 'INACTIVE')
                        .map((key) => (
                            <Radio
                                key={key}
                                label={AdStatusEnum[key]}
                                value={key}
                                checked={adStatus === key}
                                name="adStatus"
                                onChange={this.onStatusFilterChange}
                            />
                        ))}
                    <Radio
                        label="Alle"
                        value="Alle"
                        checked={adStatus === undefined}
                        name="adStatus"
                        onChange={this.onStatusFilterChange}
                    />
                </SkjemaGruppe>
                <SkjemaGruppe title="Publisert" className="blokk-l">
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
                            label={PrivacyStatusEnum[key]}
                            value={key}
                            name="privacyStatus"
                            checked={privacy === key}
                            onChange={this.onPrivacyFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Kilde" className="blokk-l">
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
                </SkjemaGruppe>
                <FilterLocation />
            </form>
        );
    }
}

Filter.defaultProps = {
    adStatus: undefined,
    source: undefined,
    privacy: undefined
};

Filter.propTypes = {
    search: PropTypes.func.isRequired,
    changeStatusFilter: PropTypes.func.isRequired,
    changePrivacyFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    adStatus: PropTypes.string,
    source: PropTypes.string,
    privacy: PropTypes.string
};

const mapStateToProps = (state) => ({
    adStatus: state.search.status,
    source: state.search.source,
    privacy: state.search.privacy
});

const mapDispatchToProps = (dispatch) => ({
    search: () => dispatch({ type: FETCH_ADS }),
    changePrivacyFilter: (value) => dispatch({ type: CHANGE_PRIVACY_FILTER, value }),
    changeStatusFilter: (value) => dispatch({ type: CHANGE_STATUS_FILTER, value }),
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
