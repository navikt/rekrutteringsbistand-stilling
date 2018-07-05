import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler'
import { Hovedknapp, Fareknapp, Knapp } from 'nav-frontend-knapper';
import  EtikettBase  from 'nav-frontend-etiketter';
import './Processing.less';
import Reject from './Reject';
import {ProcessingStatusEnum} from "./ProcessingStatusEnum";
import {SET_PROCESSING_STATUS} from './processingReducer';

export class Processing extends React.Component {
    publish = () => {
        this.props.setProcessingStatus(ProcessingStatusEnum.PUBLISHED);
    };

    reject = () => {
        this.props.setProcessingStatus(ProcessingStatusEnum.REJECT);
    };

    render() {
        const {processingStatus} = this.props;
        return (
            <div>
                { processingStatus !== ProcessingStatusEnum.REJECT && (
                    <Panel border className="Processing detail-section">
                        <Undertittel className="detail-section__head">Behandling av stillingen</Undertittel>
                        <EtikettBase type='fokus' className="blokk-s">
                            {processingStatus === ProcessingStatusEnum.PUBLISHED ? 'Stillingen er publisert' : 'Stillingen er ikke publisert'}
                        </EtikettBase>
                        <Hovedknapp className="blokk-xxs fullWidth" onClick={this.publish}
                        >
                            Publiser stillingen
                        </Hovedknapp>
                        <Fareknapp className="blokk-xxs fullWidth" onClick={this.reject}
                        >
                            Avvise stillingen
                        </Fareknapp>
                        <Knapp className="blokk-xxs fullWidth">
                            Neste
                        </Knapp>
                    </Panel>
                )}
                { processingStatus === ProcessingStatusEnum.REJECT && (
                    <Reject />
                )}
            </div>
        );
    }
}

Processing.defaultProps = {
    processingStatus: undefined
};

Processing.propTypes = {
};

const mapStateToProps = (state) => ({
    processingStatus: state.processing.processingStatus
});

const mapDispatchToProps = (dispatch) => ({
    setProcessingStatus: (status) => dispatch({ type: SET_PROCESSING_STATUS, status })
});

export default connect(mapStateToProps, mapDispatchToProps)(Processing);