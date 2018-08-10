import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { CHANGE_SOURCE_FILTER, CHANGE_STATUS_FILTER } from '../searchReducer';
import SourceEnum from '../enums/SourceEnum';
import StatusEnum from '../enums/AdStatusEnum';

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
                <SkjemaGruppe title="Status" className="blokk">
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
                </SkjemaGruppe>
                <SkjemaGruppe title="Kilde">
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
                </SkjemaGruppe>
            </div>
        );
    }
}

Filter.propTypes = {
    changeStatusFilter: PropTypes.func.isRequired,
    changeSourceFilter: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    changeSourceFilter: (value) => dispatch({ type: CHANGE_SOURCE_FILTER, value }),
    changeStatusFilter: (value) => dispatch({ type: CHANGE_STATUS_FILTER, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
