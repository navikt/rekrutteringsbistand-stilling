import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { SET_STYRK } from '../../adDataReducer';
import { COLLAPSE_STYRK_BRANCH, EXPAND_STYRK_BRANCH, TOGGLE_STYRK_MODAL } from './styrkReducer';
import './StyrkThree.less';
import StyrkThreeItem from './StyrkThreeItem';

class StyrkThree extends React.Component {
    onClick = (item) => {
        if (item.children) {
            if (item.expanded) {
                this.props.collapseStyrkBranch(item.code);
            } else {
                this.props.expandStyrkBranch(item.code);
            }
        } else {
            this.props.setStyrk(item.code);
            this.props.toggleStyrkModal();
        }
    };

    render() {
        return (
            <div className="StyrkThree">
                {this.props.styrkThree.map((item) => (
                    <StyrkThreeItem key={item.id} item={item} onClick={this.onClick} />
                ))}
            </div>
        );
    }
}

StyrkThree.propTypes = {
    setStyrk: PropTypes.func.isRequired,
    expandStyrkBranch: PropTypes.func.isRequired,
    collapseStyrkBranch: PropTypes.func.isRequired,
    toggleStyrkModal: PropTypes.func.isRequired,
    styrkThree: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
    })).isRequired
};

const mapStateToProps = (state) => ({
    styrkThree: state.styrk.styrkThree
});

const mapDispatchToProps = (dispatch) => ({
    expandStyrkBranch: (code) => dispatch({ type: EXPAND_STYRK_BRANCH, code }),
    collapseStyrkBranch: (code) => dispatch({ type: COLLAPSE_STYRK_BRANCH, code }),
    setStyrk: (code) => dispatch({ type: SET_STYRK, code }),
    toggleStyrkModal: () => dispatch({ type: TOGGLE_STYRK_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(StyrkThree);
