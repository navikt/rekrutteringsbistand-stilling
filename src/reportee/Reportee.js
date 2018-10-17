import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { FETCH_REPORTEE } from './reporteeReducer';
import './Reportee.less';

class Reportee extends React.Component {
    componentDidMount() {
        this.props.getReportee();
    }

    componentWillUnmount() {
    }

    render() {
        const { reportee, isFetchingReportee } = this.props;
        return (
            <div className="Reportee">
                {!isFetchingReportee && reportee ? (
                    <Normaltekst>
                        {reportee.displayName}
                    </Normaltekst>
                ) : (
                    <Normaltekst>Ikke innlogget</Normaltekst>
                )}
            </div>
        );
    }
}

Reportee.defaultProps = {
    reportee: undefined
};

Reportee.propTypes = {
    reportee: PropTypes.shape({
        displayName: PropTypes.string
    }),
    isFetchingReportee: PropTypes.bool.isRequired,
    getReportee: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isFetchingReportee: state.reportee.isFetchingReportee,
    reportee: state.reportee.data
});

const mapDispatchToProps = (dispatch) => ({
    getReportee: () => dispatch({ type: FETCH_REPORTEE })
});

export default connect(mapStateToProps, mapDispatchToProps)(Reportee);
