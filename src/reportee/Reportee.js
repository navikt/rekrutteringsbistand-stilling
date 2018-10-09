import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { FETCH_NUMBER_OF_PENDING_ADS, FETCH_REPORTEE } from './reporteeReducer';
import './Reportee.less';

class Reportee extends React.Component {
    componentDidMount() {
        this.props.getReportee();
        this.props.getNumberOfPendingAds();
    }

    componentWillUnmount() {
    }

    render() {
        const { reportee, isFetchingReportee, numberOfPendingAds } = this.props;
        return (
            <div className="Reportee">
                {!isFetchingReportee && reportee ? (
                    <Normaltekst>
                        {reportee.displayName}{' '}
                        {/*
                        Etter ønske fra NSS, skjuler vi denne intill videre
                        <span className="Reportee__numberOfPendingAds">{numberOfPendingAds} under arbeid</span>
                        */}
                    </Normaltekst>
                ) : (
                    <Normaltekst>Ikke innlogget</Normaltekst>
                )}
            </div>
        );
    }
}

Reportee.defaultProps = {
    reportee: undefined,
    numberOfPendingAds: 0
};

Reportee.propTypes = {
    reportee: PropTypes.shape({
        displayName: PropTypes.string
    }),
    getNumberOfPendingAds: PropTypes.func.isRequired,
    isFetchingReportee: PropTypes.bool.isRequired,
    getReportee: PropTypes.func.isRequired,
    numberOfPendingAds: PropTypes.number
};

const mapStateToProps = (state) => ({
    isFetchingReportee: state.reportee.isFetchingReportee,
    reportee: state.reportee.data,
    numberOfPendingAds: state.reportee.numberOfPendingAds
});

const mapDispatchToProps = (dispatch) => ({
    getReportee: () => dispatch({ type: FETCH_REPORTEE }),
    getNumberOfPendingAds: () => dispatch({ type: FETCH_NUMBER_OF_PENDING_ADS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Reportee);
