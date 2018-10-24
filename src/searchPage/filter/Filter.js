import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Checkbox, Radio, SkjemaGruppe
} from 'nav-frontend-skjema';
import {
    ADD_PRIVACY_FILTER,
    ADD_STATUS_FILTER, CHANGE_SOURCE_FILTER,
    FETCH_ADS, REMOVE_PRIVACY_FILTER, REMOVE_STATUS_FILTER
} from '../searchReducer';
import StatusEnum from '../enums/AdStatusEnum';
import PrivacyStatusEnum from '../enums/PrivacyStatusEnum';

class Filter extends React.Component {
    onPrivacyFilterChange = (e) => {
        const { addPrivacyFilter, removePrivacyFilter } = this.props;
        if (e.target.checked) {
            addPrivacyFilter(e.target.value);
        } else {
            removePrivacyFilter(e.target.value);
        }
    };

    onStatusFilterChange = (e) => {
        const { addStatusFilter, removeStatusFilter } = this.props;
        if (e.target.checked) {
            addStatusFilter(e.target.value);
        } else {
            removeStatusFilter(e.target.value);
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
                <SkjemaGruppe title="Status" className="blokk-s">
                    {Object.keys(StatusEnum).map((key) => (
                        <Checkbox
                            key={key}
                            label={StatusEnum[key]}
                            value={key}
                            checked={adStatus.includes(key)}
                            name="adStatus"
                            onChange={this.onStatusFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Publisert" className="blokk-s">
                    {Object.keys(PrivacyStatusEnum).map((key) => (
                        <Checkbox
                            key={key}
                            label={PrivacyStatusEnum[key]}
                            value={key}
                            name="privacyStatus"
                            checked={privacy.includes(key)}
                            onChange={this.onPrivacyFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Kilde" className="blokk-s">
                    <Radio
                        label="Alle"
                        value="Alle"
                        checked={source === undefined}
                        name="adminStatus"
                        onChange={this.onSourceFilterChange}
                    />
                    <Radio
                        label="Direktemeldt stilling"
                        value="DIR"
                        checked={source === 'DIR'}
                        name="adminStatus"
                        onChange={this.onSourceFilterChange}
                    />
                </SkjemaGruppe>
            </form>
        );
    }
}

Filter.defaultProps = {
    adStatus: [],
    source: undefined,
    privacy: []
};

Filter.propTypes = {
    search: PropTypes.func.isRequired,
    addStatusFilter: PropTypes.func.isRequired,
    removeStatusFilter: PropTypes.func.isRequired,
    addPrivacyFilter: PropTypes.func.isRequired,
    removePrivacyFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    adStatus: PropTypes.arrayOf(PropTypes.string),
    source: PropTypes.arrayOf(PropTypes.string),
    privacy: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => ({
    adStatus: state.search.status,
    source: state.search.source,
    privacy: state.search.privacy
});

const mapDispatchToProps = (dispatch) => ({
    search: () => dispatch({ type: FETCH_ADS }),
    addPrivacyFilter: (value) => dispatch({ type: ADD_PRIVACY_FILTER, value }),
    removePrivacyFilter: (value) => dispatch({ type: REMOVE_PRIVACY_FILTER, value }),
    addStatusFilter: (value) => dispatch({ type: ADD_STATUS_FILTER, value }),
    removeStatusFilter: (value) => dispatch({ type: REMOVE_STATUS_FILTER, value }),
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
