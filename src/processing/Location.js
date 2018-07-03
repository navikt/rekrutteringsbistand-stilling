/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Location extends React.Component {
    render() {
        return (
            <div>Location</div>
        )
    }
}

Location.defaultProps = {};

Location.propTypes = {};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
