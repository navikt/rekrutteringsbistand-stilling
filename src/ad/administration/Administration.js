import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import { FETCH_AD } from '../adReducer';

class Administration extends React.Component {
    componentDidMount() {
        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.history.push(`/ads/${adUuid}`);
        }
    }

    componentDidUpdate() {
        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.getStilling(this.props.match.params.uuid);
        }
    }

    render() {
        const { adStatus, adminStatus } = this.props;
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
}

Administration.defaultProps = {
    adminStatus: undefined
};

Administration.propTypes = {
    adStatus: PropTypes.string.isRequired,
    adminStatus: PropTypes.string,
    adUuid: PropTypes.string.isRequired,
    getStilling: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.ad.data.status,
    adminStatus: state.ad.data.administration.status,
    adUuid: state.ad.data.uuid
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Administration));
