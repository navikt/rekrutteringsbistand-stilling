import React from 'react';
import PropTypes from 'prop-types';
import { Systemtittel } from 'nav-frontend-typografi';
import './TopMenu.less';
import ShortcutsInfo from '../common/shortcuts/ShortcutsInfo';
import { registerShortcuts, removeShortcuts } from '../common/shortcuts/Shortcuts';
import {connect} from "react-redux";
import {FETCH_REPORTEE} from "../reportee/reporteeReducer";
import DelayedSpinner from '../common/DelayedSpinner';

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    componentDidMount() {
        this.props.getReportee();
        registerShortcuts('global', {
            '?': () => {
                this.openModal();
            },
            'g i': () => {
                this.props.history.push('/');
            }
        });

    }

    componentWillUnmount() {
        removeShortcuts('global');
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const { reportee, isFetchingReportee } = this.props;
        return (
            <div className="TopMenu">
                <Systemtittel className="TopMenu__title">NSS Admin</Systemtittel>
                <button type="button" className="TopMenu__shortcuts link" onClick={this.openModal}>
                    Hurtigtaster
                </button>
                <ShortcutsInfo closeModal={this.closeModal} isOpen={this.state.modalIsOpen} />
                { (!isFetchingReportee && reportee) ?
                    <div className="TopMenu__reportee">{reportee.displayName}</div>
                :   <div className="Ad__spinner">
                        <DelayedSpinner />
                    </div>};
            </div>
        );
    }
}

TopMenu.defaultProps = {
    reportee: undefined,
    isFetchingReportee: false
};

const mapStateToProps = (state) => ({
    isFetchingReportee: state.reportee.isFetchingReportee,
    reportee: state.reportee.data
});

const mapDispatchToProps = (dispatch) => ({
    getReportee: () => dispatch({ type: FETCH_REPORTEE })
});


TopMenu.propTypes = {
    history: PropTypes.shape().isRequired,
    reportee: PropTypes.shape().isRequired,
    getReportee: PropTypes.func.isRequired,
    isFetchingReportee: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
