import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SkjemaGruppe, Checkbox } from 'nav-frontend-skjema';
import RemarksEnum from './RemarksEnum';
import CommentsEdit from './CommentsEdit';
import {
    ADD_REMARK,
    REMOVE_REMARK
} from '../../adDataReducer';

class RemarksEdit extends React.Component {

    onRemarkClick = (e) => {
        const { checked, value } = e.target;
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
            <div className="RemarksEdit">
                <SkjemaGruppe title="Oppgi årsak til avvising">
                    <div className={this.props.validation.remark ? 'skjema__feilomrade--harFeil' : ''} >
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
                        <Checkbox
                            onChange={this.onRemarkClick}
                            checked={remarks.includes(RemarksEnum.UNKNOWN.value)}
                            value={RemarksEnum.UNKNOWN.value}
                            label={RemarksEnum.UNKNOWN.label}
                        />
                    </div>
                </SkjemaGruppe>
                <CommentsEdit
                    label="Kommentar"
                    placeholder="Skriv inn årsak til avvisning"
                    error={this.props.validation.comment}
                />
                {this.props.validation.remark && (
                    <div className="skjemaelement__feilmelding">{this.props.validation.remark}</div>
                )}
            </div>
        );
    }
}

RemarksEdit.defaultProps = {
    remarks: []
};

RemarksEdit.propTypes = {
    remarks: PropTypes.arrayOf(PropTypes.string),
    addRemark: PropTypes.func.isRequired,
    removeRemark: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        remark: PropTypes.string,
        comment: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    remarks: state.adData.administration.remarks,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    addRemark: (remark) => dispatch({ type: ADD_REMARK, remark }),
    removeRemark: (remark) => dispatch({ type: REMOVE_REMARK, remark })
});

export default connect(mapStateToProps, mapDispatchToProps)(RemarksEdit);
