import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import AdStatusEnum from './AdStatusEnum';
import RemarksEnum from './RemarksEnum';

function AdStatusPreview({ adStatus, remarks, comments }) {
    const remarksLabels = remarks.map((remark) => {
        if (remark === RemarksEnum.UNKNOWN.value) {
            return comments;
        } else if (RemarksEnum[remark]) {
            return RemarksEnum[remark].label;
        }
        return remark;
    });

    return (
        <div className="AdStatusPreview">
            {adStatus === AdStatusEnum.INACTIVE && (
                <Alertstripe type="info" solid>
                        Annonsen er ikke publisert
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.ACTIVE && (
                <Alertstripe type="suksess" solid>
                        Annonsen er publisert
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.REJECTED && (
                <Alertstripe type="advarsel" solid>
                        Annonsen er avvist: {remarksLabels.join(', ')}
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.STOPPED && (
                <Alertstripe type="stopp">
                        Annonsen er stoppet
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.DELETED && (
                <Alertstripe type="advarsel">
                        Annonsen er slettet
                </Alertstripe>
            )}
        </div>
    );
}

AdStatusPreview.defaultProps = {
    remarks: [],
    comments: null
};

AdStatusPreview.propTypes = {
    adStatus: PropTypes.string.isRequired,
    remarks: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    remarks: state.adData.administration.remarks,
    comments: state.adData.administration.comments
});

export default connect(mapStateToProps)(AdStatusPreview);
