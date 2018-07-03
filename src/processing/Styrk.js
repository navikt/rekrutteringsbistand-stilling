/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Styrk extends React.Component {
    render() {
        return (
            <div>Styrk</div>
        )
    }
}

Styrk.defaultProps = {};

Styrk.propTypes = {};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Styrk);
