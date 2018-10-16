import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import LinkButton from '../../../common/linkbutton/LinkButton';
import { ASSIGN_CURRENT_AD_TO_ME, UN_ASSIGN_CURRENT_AD } from '../../adReducer';
import AdminStatusEnum from './AdminStatusEnum';
import './AdminStatusPreview.less';

class AdminStatusPreview extends React.Component {
    onAssignToMeClick = () => {
        this.props.assignCurrentAdToMe();
    };

    onUnAssignClick = () => {
        this.props.unAssignCurrentAd();
    };

    render() {
        const { reportee, adminStatus } = this.props;

        return (
            <div className="AdminStatusPreview">
                <Normaltekst><b>Registrert av:</b> {reportee || ''}</Normaltekst>
                {reportee && adminStatus === AdminStatusEnum.PENDING && (
                    <LinkButton
                        className="AdminStatusPreview__LinkButton"
                        onClick={this.onUnAssignClick}
                    >
                        Fjern
                    </LinkButton>
                )}
                {!reportee && adminStatus === AdminStatusEnum.RECEIVED && (
                    <LinkButton
                        className="AdminStatusPreview__LinkButton"
                        onClick={this.onAssignToMeClick}
                    >
                        Marker som min
                    </LinkButton>
                )}
            </div>
        );
    }
}

AdminStatusPreview.defaultProps = {
    reportee: undefined
};

AdminStatusPreview.propTypes = {
    reportee: PropTypes.string,
    adminStatus: PropTypes.string.isRequired,
    assignCurrentAdToMe: PropTypes.func.isRequired,
    unAssignCurrentAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    reportee: state.adData.administration.reportee
});

const mapDispatchToProps = (dispatch) => ({
    assignCurrentAdToMe: () => dispatch({ type: ASSIGN_CURRENT_AD_TO_ME }),
    unAssignCurrentAd: () => dispatch({ type: UN_ASSIGN_CURRENT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatusPreview);
