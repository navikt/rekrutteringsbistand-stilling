import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import {
    CHANGE_ADMINISTRATION_STATUS_FILTER, CHANGE_SOURCE_FILTER,
    CHANGE_STATUS_FILTER
} from '../searchReducer';
import SourceEnum from '../enums/SourceEnum';
import StatusEnum from '../enums/AdStatusEnum';
import AdministrationStatusEnum from '../enums/AdministrationStatusEnum';

class Filter extends React.Component {
    onSourceFilterChange = (e) => {
        if (e.target.value !== 'Alle') {
            this.props.changeSourceFilter(e.target.value);
        } else {
            this.props.changeSourceFilter(undefined);
        }
    };

    onStatusFilterChange = (e) => {
        if (e.target.value !== 'Alle') {
            this.props.changeStatusFilter(e.target.value);
        } else {
            this.props.changeStatusFilter(undefined);
        }
    };

    onAdministrationStatusFilterChange = (e) => {
        console.log(e.target.value);
        if (e.target.value !== 'RECEIVED') {
            this.props.changeAdministrationStatusFilter(e.target.value);
        } else {
            this.props.changeAdministrationStatusFilter('RECEIVED');
        }
    };

    render() {
        return (
            <div>
                <SkjemaGruppe title="Status" className="blokk">
                    <Radio
                        label="Alle"
                        value="Alle"
                        name="status"
                        checked={this.props.status === undefined}
                        onChange={this.onStatusFilterChange}
                    />
                    {Object.keys(StatusEnum).map((key) => (
                        <Radio
                            key={key}
                            label={StatusEnum[key]}
                            value={key}
                            checked={this.props.status === key}
                            name="status"
                            onChange={this.onStatusFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Kilde">
                    <Radio
                        label="Alle"
                        value="Alle"
                        checked={this.props.source === undefined}
                        name="kilde"
                        onChange={this.onSourceFilterChange}
                    />
                    {Object.keys(SourceEnum).map((key) => (
                        <Radio
                            key={key}
                            label={SourceEnum[key]}
                            value={key}
                            name="kilde"
                            checked={this.props.source === key}
                            onChange={this.onSourceFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Saksbehandlerstatus">
                    {Object.keys(AdministrationStatusEnum).map((key) => (
                        <Radio
                            key={key}
                            label={AdministrationStatusEnum[key]}
                            value={key}
                            defaultChecked={key === 'RECEIVED'}
                            name="Saksbehandlerstatus"
                            onChange={this.onAdministrationStatusFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
            </div>
        );
    }
}

Filter.defaultProps = {
    status: undefined,
    source: undefined
};

Filter.propTypes = {
    changeStatusFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    changeAdministrationStatusFilter: PropTypes.func.isRequired,
    status: PropTypes.string,
    source: PropTypes.string
};

const mapStateToProps = (state) => ({
    status: state.search.status,
    source: state.search.source
});

const mapDispatchToProps = (dispatch) => ({
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value }),
    changeStatusFilter: (value) => dispatch({ type: CHANGE_STATUS_FILTER, value }),
    changeAdministrationStatusFilter: (value) => dispatch({ type: CHANGE_ADMINISTRATION_STATUS_FILTER, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
