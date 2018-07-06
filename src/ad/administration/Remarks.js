import React from 'react';
import { connect } from 'react-redux';
import { SkjemaGruppe, Checkbox } from 'nav-frontend-skjema';
import RemarksEnum from './RemarksEnum';
import {
    ADD_REMARK,
    REMOVE_REMARK
} from './../adReducer';

class Remarks extends React.Component {
    onRemarkClick = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            this.props.addRemark(value);
        } else {
            this.props.removeRemark(value);
        }
    };

    render() {
        const { remarks } = this.props;
        return (
            <div className="Remarks">
                <SkjemaGruppe title="Oppgi årsak til avvising">
                    <Checkbox
                        onChange={this.onRemarkClick}
                        checked={remarks.includes(RemarksEnum.DISCRIMINATING.value)}
                        value={RemarksEnum.DISCRIMINATING.value}
                        label={RemarksEnum.DISCRIMINATING.label}
                    />
                    <Checkbox
                        onChange={this.onRemarkClick}
                        checked={remarks.includes(RemarksEnum.DUPLICATE.value)}
                        value={RemarksEnum.DUPLICATE.value}
                        label={RemarksEnum.DUPLICATE.label}
                    />
                    <Checkbox
                        onChange={this.onRemarkClick}
                        checked={remarks.includes(RemarksEnum.NO_EMPLOYMENT.value)}
                        value={RemarksEnum.NO_EMPLOYMENT.value}
                        label={RemarksEnum.NO_EMPLOYMENT.label}
                    />
                    <Checkbox
                        onChange={this.onRemarkClick}
                        checked={remarks.includes(RemarksEnum.NOT_APPROVED_BY_LABOUR_INSPECTION.value)}
                        value={RemarksEnum.NOT_APPROVED_BY_LABOUR_INSPECTION.value}
                        label={RemarksEnum.NOT_APPROVED_BY_LABOUR_INSPECTION.label}
                    />
                    <Checkbox
                        onChange={this.onRemarkClick}
                        checked={remarks.includes(RemarksEnum.REJECT_BECAUSE_CAPACITY.value)}
                        value={RemarksEnum.REJECT_BECAUSE_CAPACITY.value}
                        label={RemarksEnum.REJECT_BECAUSE_CAPACITY.label}
                    />
                    <Checkbox
                        onChange={this.onRemarkClick}
                        checked={remarks.includes(RemarksEnum.FOREIGN_JOB.value)}
                        value={RemarksEnum.FOREIGN_JOB.value}
                        label={RemarksEnum.FOREIGN_JOB.label}
                    />
                    <Checkbox
                        onChange={this.onRemarkClick}
                        checked={remarks.includes(RemarksEnum.COLLECTION_JOB.value)}
                        value={RemarksEnum.COLLECTION_JOB.value}
                        label={RemarksEnum.COLLECTION_JOB.label}
                    />
                </SkjemaGruppe>
            </div>
        );
    }
}

Remarks.propTypes = {};

const mapStateToProps = (state) => ({
    remarks: state.ad.data.administration.remarks
});

const mapDispatchToProps = (dispatch) => ({
    addRemark: (remark) => dispatch({ type: ADD_REMARK, remark }),
    removeRemark: (remark) => dispatch({ type: REMOVE_REMARK, remark })
});

export default connect(mapStateToProps, mapDispatchToProps)(Remarks);
