import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { CHANGE_SOURCE_FILTER, CHANGE_STATUS_FILTER } from './filterReducer';
import SourceEnum from '../enums/SourceEnum';
import StatusEnum from '../enums/StatusEnum';

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


    render() {
        return (
            <div>
                <Undertittel className="blokk-xs">Status</Undertittel>
                <Radio
                    label="Alle"
                    value="Alle"
                    defaultChecked
                    name="status"
                    onChange={this.onStatusFilterChange}
                />
                {Object.keys(StatusEnum).map((key) => (
                    <Radio
                        key={key}
                        label={StatusEnum[key]}
                        value={key}
                        name="status"
                        onChange={this.onStatusFilterChange}
                    />
                ))}
                <Undertittel className="Filter__header">Kilde</Undertittel>
                <Radio
                    label="Alle"
                    value="Alle"
                    defaultChecked
                    name="kilde"
                    onChange={this.onSourceFilterChange}
                />
                {Object.keys(SourceEnum).map((key) => (
                    <Radio
                        key={key}
                        label={SourceEnum[key]}
                        value={key}
                        name="kilde"
                        onChange={this.onSourceFilterChange}
                    />
                ))}
            </div>
        );
    }
}

Filter.propTypes = {
    changeStatusFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value }),
    changeStatusFilter: (value) => dispatch({ type: CHANGE_STATUS_FILTER, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
