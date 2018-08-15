import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import AdStatusEnum from './AdStatusEnum';
import RemarksEnum from './RemarksEnum';

function AdStatusPreview({ adStatus, remarks }) {
    const remarksLabels = remarks.map((remark) => {
        if (RemarksEnum[remark]) {
            return RemarksEnum[remark].label;
        }
        return remark;
    });

    return (
        <div className="AdStatusPreview">
            <Element className="blokk-xs">Annonsestatus</Element>
            <div className="blokk">
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
        </div>
    );
}

AdStatusPreview.defaultProps = {
    remarks: []
};

AdStatusPreview.propTypes = {
    adStatus: PropTypes.string.isRequired,
    remarks: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    remarks: state.adData.administration.remarks
});

export default connect(mapStateToProps)(AdStatusPreview);
