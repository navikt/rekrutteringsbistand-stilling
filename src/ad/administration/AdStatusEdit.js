import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import AdStatusEnum from './AdStatusEnum';
import { SET_AD_STATUS } from '../adDataReducer';
import {
    registerShortcuts,
    removeShortcuts
} from "../../common/shortcuts/Shortcuts";

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

    onAdStatusChange = (e, value) => {
        this.props.setAdStatus(value);
    };

    render() {
        const { adStatus } = this.props;
        return (
            <div className="AdStatusEdit">
                <RadioPanelGruppe
                    name="Annonsestatus"
                    legend="Annonsestatus"
                    radios={[
                        { label: 'Ikke publisert', value: AdStatusEnum.INACTIVE },
                        { label: 'Publisert', value: AdStatusEnum.ACTIVE },
                        { label: 'Avvist', value: AdStatusEnum.REJECTED },
                        { label: 'Stoppet', value: AdStatusEnum.STOPPED },
                        { label: 'Slettet', value: AdStatusEnum.DELETED }
                    ]}
                    checked={adStatus}
                    onChange={this.onAdStatusChange}
                />
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
