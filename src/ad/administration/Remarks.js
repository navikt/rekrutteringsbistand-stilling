import React from 'react';
import { connect } from 'react-redux';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import RemarksEnum from './RemarksEnum';
import { registerShortcuts } from '../../common/shortcuts/Shortcuts';
import {
    ADD_REMARK,
    REMOVE_REMARK
} from './../adReducer';

class Remarks extends React.Component {
    componentDidMount() {
        registerShortcuts('annonseDetaljer', {
            'm i': () => {
                this.changeRemark(
                    !this.props.remarks.includes(RemarksEnum.DISCRIMINATING.value),
                    RemarksEnum.DISCRIMINATING.value
                );
            },
            'm d': () => {
                this.changeRemark(
                    !this.props.remarks.includes(RemarksEnum.DUPLICATE.value),
                    RemarksEnum.DUPLICATE.value
                );
            },
            'm a': () => {
                this.changeRemark(
                    !this.props.remarks.includes(RemarksEnum.NO_EMPLOYMENT.value),
                    RemarksEnum.NO_EMPLOYMENT.value
                );
            },
            'm b': () => {
                this.changeRemark(
                    !this.props.remarks.includes(RemarksEnum.NOT_APPROVED_BY_LABOUR_INSPECTION.value),
                    RemarksEnum.NOT_APPROVED_BY_LABOUR_INSPECTION.value
                );
            },
            'm k': () => {
                this.changeRemark(
                    !this.props.remarks.includes(RemarksEnum.REJECT_BECAUSE_CAPACITY.value),
                    RemarksEnum.REJECT_BECAUSE_CAPACITY.value
                );
            },
            'm u': () => {
                this.changeRemark(
                    !this.props.remarks.includes(RemarksEnum.FOREIGN_JOB.value),
                    RemarksEnum.FOREIGN_JOB.value
                );
            },
            'm s': () => {
                this.changeRemark(
                    !this.props.remarks.includes(RemarksEnum.COLLECTION_JOB.value),
                    RemarksEnum.COLLECTION_JOB.value
                );
            }
        });
    }

    onRemarkClick = (e, value) => {
        const { checked } = e.target;
        this.changeRemark(checked, value);
    };

    changeRemark = (checked, value) => {
        if (checked) {
            this.props.addRemark(value);
        } else {
            this.props.removeRemark(value);
        }
    };

    render() {
        const { remarks } = this.props;
        return (
            <div className="Remarks">
                <CheckboksPanelGruppe
                    legend="Oppgi årsak til avvising"
                    checkboxes={[
                        { label: RemarksEnum.DISCRIMINATING.label, value: RemarksEnum.DISCRIMINATING.value },
                        { label: RemarksEnum.DUPLICATE.label, value: RemarksEnum.DUPLICATE.value },
                        { label: RemarksEnum.NO_EMPLOYMENT.label, value: RemarksEnum.NO_EMPLOYMENT.value },
                        { label: RemarksEnum.NOT_APPROVED_BY_LABOUR_INSPECTION.label, value: RemarksEnum.NOT_APPROVED_BY_LABOUR_INSPECTION.value },
                        { label: RemarksEnum.REJECT_BECAUSE_CAPACITY.label, value: RemarksEnum.REJECT_BECAUSE_CAPACITY.value },
                        { label: RemarksEnum.FOREIGN_JOB.label, value: RemarksEnum.FOREIGN_JOB.value },
                        { label: RemarksEnum.COLLECTION_JOB.label, value: RemarksEnum.COLLECTION_JOB.value }
                    ]}
                    onChange={this.onRemarkClick}
                />
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
