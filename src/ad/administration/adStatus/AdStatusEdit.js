import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'nav-frontend-skjema';
import AdStatusEnum from './AdStatusEnum';
import { SET_AD_STATUS } from '../../adDataReducer';
import {
    registerShortcuts,
    removeShortcuts
} from '../../../common/shortcuts/Shortcuts';

class AdStatusEdit extends React.Component {
    componentDidMount() {
        registerShortcuts('administrationEdit', {
            'p p': () => {
                this.props.setAdStatus(AdStatusEnum.ACTIVE);
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('administrationEdit');
    }

    onAdStatusChange = (e) => {
        this.props.setAdStatus(e.target.value);
    };

    render() {
        const { adStatus } = this.props;
        return (
            <div className="AdStatusEdit">
                <Select
                    label="Velg annonsestatus"
                    value={adStatus}
                    onChange={this.onAdStatusChange}
                    className="typo-normal"
                >
                    <option value={AdStatusEnum.INACTIVE} key={AdStatusEnum.INACTIVE}>Ikke publisert</option>
                    <option value={AdStatusEnum.ACTIVE} key={AdStatusEnum.ACTIVE}>Publisert</option>
                    <option value={AdStatusEnum.REJECTED} key={AdStatusEnum.REJECTED}>Avvist</option>
                    <option value={AdStatusEnum.STOPPED} key={AdStatusEnum.STOPPED}>Stoppet</option>
                    <option value={AdStatusEnum.DELETED} key={AdStatusEnum.DELETED}>Slettet</option>
                </Select>
            </div>
        );
    }
}

AdStatusEdit.propTypes = {
    adStatus: PropTypes.string.isRequired,
    setAdStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status
});

const mapDispatchToProps = (dispatch) => ({
    setAdStatus: (status) => dispatch({ type: SET_AD_STATUS, status })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdStatusEdit);
