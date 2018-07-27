import React from "react";
import {connect} from "react-redux";
import {FETCH_REPORTEE_BEGIN} from "./reporteeReducer";
import PropTypes from "prop-types";

class Reportee extends React.Component {
    componentDidMount() {
        this.props.getReportee();
    }

    componentWillUnmount() {
    }

    render() {
        const { reportee, isFetchingReportee } = this.props;
        return (
            <div className="TopMenu__reportee">
                {!isFetchingReportee && reportee ? (
                        <div>{reportee.displayName}</div>
                ) : (
                    <div>Not logged in</div>
                )}
            </div>
            );
    }
}

Reportee.defaultProps = {
    reportee: undefined,
    isFetchingReportee: false
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
