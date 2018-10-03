import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import {
    CHANGE_ADMINISTRATION_STATUS_FILTER, CHANGE_REPORTEE_FILTER,
    CHANGE_SOURCE_FILTER,
    CHANGE_STATUS_FILTER, FETCH_ADS, SET_REPORTEE_VALUE
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

    onReporteeInputChange = (e) => {
        this.props.setReporteeValue(e.target.value);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.search();
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <SkjemaGruppe title="Status" className="blokk-s">
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
                    <Radio
                        label="Alle"
                        value="Alle"
                        name="adStatus"
                        checked={this.props.adStatus === undefined}
                        onChange={this.onStatusFilterChange}
                    />
                </SkjemaGruppe>
                <SkjemaGruppe title="Kilde" className="blokk-s">
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
                <SkjemaGruppe title="Saksbehandlingsstatus" className="blokk-s">
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
                    <Radio
                        label="Alle"
                        value="Alle"
                        checked={this.props.adminStatus === undefined}
                        name="adminStatus"
                        onChange={this.onAdministrationStatusFilterChange}
                    />
                </SkjemaGruppe>
                <SkjemaGruppe title="Saksbehandler" className="blokk-s">
                    <Radio
                        label="Alle"
                        value="all"
                        checked={this.props.reportee === 'all'}
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
                    <Radio
                        label="Søk på navn"
                        value="define"
                        checked={this.props.reportee === 'define'}
                        name="reportee"
                        onChange={this.onReporteeFilterChange}
                    />
                    {this.props.reportee === 'define' && (
                        <Input
                            bredde="S"
                            label=""
                            placeholder="Søk..."
                            value={this.props.reporteeValue}
                            onChange={this.onReporteeInputChange}
                        />
                    )}
                </SkjemaGruppe>
            </form>
        );
    }
}

Filter.defaultProps = {
    adStatus: undefined,
    adminStatus: undefined,
    source: undefined,
    reportee: undefined,
    reporteeValue: ''
};

Filter.propTypes = {
    search: PropTypes.func.isRequired,
    changeStatusFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired,
    changeAdministrationStatusFilter: PropTypes.func.isRequired,
    changeReporteeFilter: PropTypes.func.isRequired,
    adStatus: PropTypes.string,
    adminStatus: PropTypes.string,
    source: PropTypes.string,
    reportee: PropTypes.string,
    reporteeValue: PropTypes.string
};

const mapStateToProps = (state) => ({
    adStatus: state.search.status,
    adminStatus: state.search.administrationStatus,
    source: state.search.source,
    reportee: state.search.reportee,
    reporteeValue: state.search.reporteeValue
});

const mapDispatchToProps = (dispatch) => ({
    search: () => dispatch({ type: FETCH_ADS }),
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value }),
    changeStatusFilter: (value) => dispatch({ type: CHANGE_STATUS_FILTER, value }),
    changeAdministrationStatusFilter: (value) => dispatch({ type: CHANGE_ADMINISTRATION_STATUS_FILTER, value }),
    changeReporteeFilter: (value) => dispatch({ type: CHANGE_REPORTEE_FILTER, value }),
    setReporteeValue: (value) => dispatch({ type: SET_REPORTEE_VALUE, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
