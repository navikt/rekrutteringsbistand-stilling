import React from 'react';
import PropTypes from 'prop-types';
import Etikett from 'nav-frontend-etiketter';
import AdStatusEnum from '../ad/administration/adStatus/AdStatusEnum';
import RemarksEnum from '../ad/administration/adStatus/RemarksEnum';

export default function DuplicateAdStatus({ adStatus, remarks, comments }) {
    const remarksLabels = remarks.map((remark) => {
        if (remark === RemarksEnum.UNKNOWN.value) {
            return comments;
        } else if (RemarksEnum[remark]) {
            return RemarksEnum[remark].label;
        }
        return remark;
    });

    return (
        <div className="DuplicateAdStatus">
            {adStatus === AdStatusEnum.INACTIVE && (
                <Etikett type="info">
                    Ikke publisert
                </Etikett>
            )}
            {adStatus === AdStatusEnum.ACTIVE && (
                <Etikett type="suksess">
                    Publisert
                </Etikett>
            )}
            {adStatus === AdStatusEnum.REJECTED && (
                <Etikett type="advarsel">
                    Avvist{remarks.length > 0 ? `: ${remarksLabels.join(', ')}` : ''}
                </Etikett>
            )}
            {adStatus === AdStatusEnum.STOPPED && (
                <Etikett type="advarsel">
                    Stoppet
                </Etikett>
            )}
            {adStatus === AdStatusEnum.DELETED && (
                <Etikett type="advarsel">
                    Slettet
                </Etikett>
            )}
        </div>
    );
}

DuplicateAdStatus.defaultProps = {
    remarks: [],
    comments: null
};

DuplicateAdStatus.propTypes = {
    adStatus: PropTypes.string.isRequired,
    remarks: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.string
};
