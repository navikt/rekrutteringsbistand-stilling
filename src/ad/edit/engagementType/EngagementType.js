import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'nav-frontend-skjema';
import EngagementTypeEnum from './EngagementTypeEnum';
import { SET_EMPLOYMENT_ENGAGEMENTTYPE } from '../../adDataReducer';
import { createErrorObject } from '../../../common/utils';
import './EngagementType.less';

class EngagementType extends React.Component {
    onEngagementTypeChange = (e) => {
        this.props.setEngagementType(e.target.value);
    };

    render() {
        return (
            <div className="EngagementType">
                <Select
                    id="EngagementType__input"
                    label="Ansettelsesform*"
                    value={this.props.engagementType}
                    onChange={this.onEngagementTypeChange}
                    feil={createErrorObject(this.props.validation.engagementtype)}
                >
                    <option value={EngagementTypeEnum.NONE} key={EngagementTypeEnum.NONE}>
                        Velg
                    </option>
                    <option value={EngagementTypeEnum.FAST} key={EngagementTypeEnum.FAST}>
                        {EngagementTypeEnum.FAST}
                    </option>
                    <option value={EngagementTypeEnum.VIKARIAT} key={EngagementTypeEnum.VIKARIAT}>
                        {EngagementTypeEnum.VIKARIAT}
                    </option>
                    <option
                        value={EngagementTypeEnum.ENGASJEMENT}
                        key={EngagementTypeEnum.ENGASJEMENT}
                    >
                        {EngagementTypeEnum.ENGASJEMENT}
                    </option>
                    <option value={EngagementTypeEnum.PROSJEKT} key={EngagementTypeEnum.PROSJEKT}>
                        {EngagementTypeEnum.PROSJEKT}
                    </option>
                    <option value={EngagementTypeEnum.AAREMAAL} key={EngagementTypeEnum.AAREMAAL}>
                        {EngagementTypeEnum.AAREMAAL}
                    </option>
                    <option value={EngagementTypeEnum.SESONG} key={EngagementTypeEnum.SESONG}>
                        {EngagementTypeEnum.SESONG}
                    </option>
                    <option value={EngagementTypeEnum.FERIEJOBB} key={EngagementTypeEnum.FERIEJOBB}>
                        {EngagementTypeEnum.FERIEJOBB}
                    </option>
                    <option value={EngagementTypeEnum.TRAINEE} key={EngagementTypeEnum.TRAINEE}>
                        {EngagementTypeEnum.TRAINEE}
                    </option>
                    <option value={EngagementTypeEnum.LAERLING} key={EngagementTypeEnum.LAERLING}>
                        {EngagementTypeEnum.LAERLING}
                    </option>
                    <option
                        value={EngagementTypeEnum.SELVSTENDIG}
                        key={EngagementTypeEnum.SELVSTENDIG}
                    >
                        {EngagementTypeEnum.SELVSTENDIG}
                    </option>
                    <option value={EngagementTypeEnum.ANNET} key={EngagementTypeEnum.ANNET}>
                        {EngagementTypeEnum.ANNET}
                    </option>
                </Select>
            </div>
        );
    }
}

EngagementType.defaultProps = {
    engagementType: undefined,
};

EngagementType.propTypes = {
    setEngagementType: PropTypes.func.isRequired,
    engagementType: PropTypes.string,
    validation: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
};

const mapStateToProps = (state) => ({
    engagementType: state.adData.properties.engagementtype,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setEngagementType: (engagementType) =>
        dispatch({ type: SET_EMPLOYMENT_ENGAGEMENTTYPE, engagementType }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EngagementType);
