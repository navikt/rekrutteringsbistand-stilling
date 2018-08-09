import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminStatusEnum from './AdminStatusEnum';
import AdStatusEnum from './AdStatusEnum';
import AdStatusPreview from './AdStatusPreview';
import AdStatusEdit from './AdStatusEdit';
import RemarksEdit from './RemarksEdit';
import CommentsEdit from './CommentsEdit';
import CommentsPreview from './CommentsPreview';
import AdminStatusPreview from './AdminStatusPreview';
import AdminStatusEdit from './AdminStatusEdit';
import './Administration.less';

function Administration({ adminStatus, adStatus }) {
    return (
        <div className="Administration">
            <AdminStatusPreview />
            <AdminStatusEdit />

            {adminStatus === AdminStatusEnum.PENDING ? (
                <div>
                    <AdStatusEdit />
                    {adStatus === AdStatusEnum.REJECTED && (
                        <RemarksEdit />
                    )}
                    <CommentsEdit />
                </div>
            ) : (
                <div>
                    <AdStatusPreview />
                    <CommentsPreview />
                </div>
            )}
        </div>
    );
}

Administration.defaultProps = {
    adminStatus: undefined
};

Administration.propTypes = {
    adStatus: PropTypes.string.isRequired,
    adminStatus: PropTypes.string
};

const mapStateToProps = (state) => ({
    adStatus: state.ad.data.status,
    adminStatus: state.ad.data.administration.status
});

export default connect(mapStateToProps)(Administration);
