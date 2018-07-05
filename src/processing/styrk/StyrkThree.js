import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StyrkThreeItem from "./StyrkThreeItem";
import { ADD_STYRK, COLLAPSE_STYRK_BRANCH, EXPAND_STYRK_BRANCH } from "./styrkReducer";
import './StyrkThree.less';

class StyrkThree extends React.Component {

    onClick = (item) => {
        if(item.children) {
            if(item.expanded) {
                this.props.collapseBranch(item.code);
            } else {
                this.props.expandBranch(item.code);
            }
        } else {
            this.props.addStyrk(item.code);
        }
    };

    render() {
        return (
            <div className="StyrkThree">
                {this.props.styrkThree.map((item) => (
                    <StyrkThreeItem key={item.code} item={item} onClick={this.onClick} />
                ))}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    styrkThree: state.styrk.styrkThree
});

const mapDispatchToProps = (dispatch) => ({
    expandBranch: (code) => dispatch({ type: EXPAND_STYRK_BRANCH, code }),
    collapseBranch: (code) => dispatch({ type: COLLAPSE_STYRK_BRANCH, code }),
    addStyrk: (code) => dispatch({ type: ADD_STYRK, code }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyrkThree);
