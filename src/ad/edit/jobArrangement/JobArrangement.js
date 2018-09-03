import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'nav-frontend-skjema';
import { SET_EMPLOYMENT_JOBARRANGEMENT } from '../../adDataReducer';
import JobArrangementEnum from './JobArrangementEnum';
import './JobArrangement.less';

class JobArrangement extends React.Component {
    onJobArrangementChange = (e) => {
        this.props.setJobArrangement(e.target.value);
    };

    render() {
        return (
            <div className="JobArrangement">
                <Select
                    id="JobArrangement__input"
                    label="Arbeidstidsordning"
                    value={this.props.jobArrangement}
                    onChange={this.onJobArrangementChange}
                >
                    <option value={JobArrangementEnum.NONE} key={JobArrangementEnum.NONE}>
                        {JobArrangementEnum.NONE}
                    </option>
                    <option value={JobArrangementEnum.SKIFT} key={JobArrangementEnum.SKIFT}>
                        {JobArrangementEnum.SKIFT}
                    </option>
                    <option value={JobArrangementEnum.TURNUS} key={JobArrangementEnum.TURNUS}>
                        {JobArrangementEnum.TURNUS}
                    </option>
                    <option value={JobArrangementEnum.VAKT} key={JobArrangementEnum.VAKT}>
                        {JobArrangementEnum.VAKT}
                    </option>
                </Select>
            </div>
        );
    }
}

JobArrangement.defaultProps = {
    jobArrangement: undefined
};

JobArrangement.propTypes = {
    jobArrangement: PropTypes.string,
    setJobArrangement: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    jobArrangement: state.adData.properties.jobarrangement
});

const mapDispatchToProps = (dispatch) => ({
    setJobArrangement: (jobarrangement) => dispatch({ type: SET_EMPLOYMENT_JOBARRANGEMENT, jobarrangement })
});

export default connect(mapStateToProps, mapDispatchToProps)(JobArrangement);
