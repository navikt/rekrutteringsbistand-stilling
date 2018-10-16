import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import AdStatusEnum from './AdStatusEnum';
import RemarksEnum from './RemarksEnum';
import './AdStatus.less';

function AdStatus({ adStatus, remarks, comments }) {
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
                <Alertstripe className="AdStatusPreview__Alertstripe" type="info" solid>
                    Stillingen er ikke publisert
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.ACTIVE && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="suksess" solid>
                    Stillingen er publisert
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.REJECTED && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="advarsel" solid>
                    Stillingen er avvist: {remarksLabels.includes(comments)
                        ? remarksLabels.join(', ')
                        : `${remarksLabels.join(', ')}${comments ? `, ${comments}` : ''}`}
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.STOPPED && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="advarsel" solid>
                    {comments ?
                        `Stillingen er stoppet: ${comments}` :
                        'Stillingen er stoppet'}
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.DELETED && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="advarsel" solid>
                    Stillingen er slettet
                </Alertstripe>
            )}
        </div>
    );
}

AdStatus.defaultProps = {
    remarks: [],
    comments: null
};

AdStatus.propTypes = {
    adStatus: PropTypes.string.isRequired,
    remarks: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    remarks: state.adData.administration.remarks,
    comments: state.adData.administration.comments
});

export default connect(mapStateToProps)(AdStatus);
