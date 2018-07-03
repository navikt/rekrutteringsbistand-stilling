/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Employer extends React.Component {
    render() {
        return (
           <div>Employer</div>
        )
    }
}

Employer.defaultProps = {};

Employer.propTypes = {};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
