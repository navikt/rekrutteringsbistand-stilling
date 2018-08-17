import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { FETCH_REPORTEE_BEGIN } from './reporteeReducer';

class Reportee extends React.Component {
    componentDidMount() {
        this.props.getReportee();
    }

    componentWillUnmount() {
    }

    render() {
        const { reportee, isFetchingReportee } = this.props;
        return (
            <div>
                {!isFetchingReportee && reportee ? (
                    <Normaltekst>{reportee.displayName}</Normaltekst>
                ) : (
                    <Normaltekst>Ikke innlogget</Normaltekst>
                )}
            </div>
        );
    }
}

Reportee.defaultProps = {
    reportee: undefined,
    isFetchingReportee: false
};

Reportee.propTypes = {
    reportee: PropTypes.shape({
        displayName: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    isFetchingReportee: state.reportee.isFetchingReportee,
    reportee: state.reportee.data
});

const mapDispatchToProps = (dispatch) => ({
    getReportee: () => dispatch({ type: FETCH_REPORTEE_BEGIN })
});


Reportee.propTypes = {
    getReportee: PropTypes.func.isRequired,
    isFetchingReportee: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Reportee);
