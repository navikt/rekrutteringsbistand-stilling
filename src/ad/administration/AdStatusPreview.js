import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import AdStatusEnum from './AdStatusEnum';

function AdStatusPreview({ adStatus }) {
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
                    <Alertstripe type="advarsel">
                        Annonsen er avvist:
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

AdStatusPreview.propTypes = {
    adStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.ad.data.status,
    remarks: state.ad.data.administration.remarks
});

export default connect(mapStateToProps)(AdStatusPreview);
