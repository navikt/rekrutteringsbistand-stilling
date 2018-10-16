import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import AdStatusEnum from './AdStatusEnum';
import './AdStatus.less';

function AdStatus({ adStatus }) {
    return (
        <div className="AdStatusPreview">
            {adStatus === AdStatusEnum.INACTIVE && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="info" solid>
                    Stillingen er ikke publisert
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.ACTIVE && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="suksess" solid>
                    Stillingen er publisert
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.STOPPED && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="advarsel" solid>
                    Stillingen er stoppet
                </Alertstripe>
            )}
        </div>
    );
}

AdStatus.propTypes = {
    adStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status
});

export default connect(mapStateToProps)(AdStatus);
