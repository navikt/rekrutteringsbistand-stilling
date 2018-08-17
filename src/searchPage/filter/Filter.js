import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import {
    CHANGE_ADMINISTRATION_STATUS_FILTER, CHANGE_REPORTEE_FILTER,
    CHANGE_SOURCE_FILTER,
    CHANGE_STATUS_FILTER
} from '../searchReducer';
import SourceEnum from '../enums/SourceEnum';
import StatusEnum from '../enums/AdStatusEnum';
import AdminStatusEnum from '../enums/AdminStatusEnum';

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
        if (e.target.value !== 'Alle') {
            this.props.changeAdministrationStatusFilter(e.target.value);
        } else {
            this.props.changeAdministrationStatusFilter(undefined);
        }
    };

    onReporteeFilterChange = (e) => {
        if (e.target.value !== 'Alle') {
            this.props.changeReporteeFilter(e.target.value);
        } else {
            this.props.changeReporteeFilter(undefined);
        }
    };

    render() {
        return (
            <div>
                <SkjemaGruppe title="Status" className="blokk">
                    <Radio
                        label="Alle"
                        value="Alle"
                        name="adStatus"
                        checked={this.props.adStatus === undefined}
                        onChange={this.onStatusFilterChange}
                    />
                    {Object.keys(StatusEnum).map((key) => (
                        <Radio
                            key={key}
                            label={StatusEnum[key]}
                            value={key}
                            checked={this.props.adStatus === key}
                            name="adStatus"
                            onChange={this.onStatusFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Kilde" className="blokk">
                    <Radio
                        label="Alle"
                        value="Alle"
                        checked={this.props.source === undefined}
                        name="source"
                        onChange={this.onSourceFilterChange}
                    />
                    {Object.keys(SourceEnum).map((key) => (
                        <Radio
                            key={key}
                            label={SourceEnum[key]}
                            value={key}
                            name="source"
                            checked={this.props.source === key}
                            onChange={this.onSourceFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Saksbehandlerstatus">
                    <Radio
                        label="Alle"
                        value="Alle"
                        checked={this.props.adminStatus === undefined}
                        name="adminStatus"
                        onChange={this.onAdministrationStatusFilterChange}
                    />
                    {Object.keys(AdminStatusEnum).map((key) => (
                        <Radio
                            key={key}
                            label={AdminStatusEnum[key]}
                            value={key}
                            checked={this.props.adminStatus === key}
                            name="adminStatus"
                            onChange={this.onAdministrationStatusFilterChange}
                        />
                    ))}
                </SkjemaGruppe>
                <SkjemaGruppe title="Synlige annonser">
                    <Radio
                        label="Alle"
                        value="Alle"
                        checked={this.props.reportee === undefined}
                        name="reportee"
                        onChange={this.onReporteeFilterChange}
                    />
                    <Radio
                        label="Vis bare mine"
                        value="mine"
                        checked={this.props.reportee === 'mine'}
                        name="reportee"
                        onChange={this.onReporteeFilterChange}
                    />
                </SkjemaGruppe>
            </div>
        );
    }
}

Filter.defaultProps = {
    adStatus: undefined,
    adminStatus: undefined,
    source: undefined,
    reportee: undefined
};

Filter.propTypes = {
    changeStatusFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    changeAdministrationStatusFilter: PropTypes.func.isRequired,
    changeReporteeFilter: PropTypes.func.isRequired,
    adStatus: PropTypes.string,
    adminStatus: PropTypes.string,
    source: PropTypes.string,
    reportee: PropTypes.string
};

const mapStateToProps = (state) => ({
    adStatus: state.search.status,
    adminStatus: state.search.administrationStatus,
    source: state.search.source,
    reportee: state.search.reportee
});

const mapDispatchToProps = (dispatch) => ({
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value }),
    changeStatusFilter: (value) => dispatch({ type: CHANGE_STATUS_FILTER, value }),
    changeAdministrationStatusFilter: (value) => dispatch({ type: CHANGE_ADMINISTRATION_STATUS_FILTER, value }),
    changeReporteeFilter: (value) => dispatch({ type: CHANGE_REPORTEE_FILTER, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
