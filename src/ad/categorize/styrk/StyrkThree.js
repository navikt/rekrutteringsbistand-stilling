import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StyrkThreeItem from "./StyrkThreeItem";
import { COLLAPSE_STYRK_BRANCH, EXPAND_STYRK_BRANCH, TOGGLE_STYRK_MODAL } from "./styrkReducer";
import { ADD_STYRK } from "../../../ad/adReducer";
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
            this.props.toggleList();
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


const mapStateToProps = (state) => ({
    styrkThree: state.styrk.styrkThree
});

const mapDispatchToProps = (dispatch) => ({
    expandBranch: (code) => dispatch({ type: EXPAND_STYRK_BRANCH, code }),
    collapseBranch: (code) => dispatch({ type: COLLAPSE_STYRK_BRANCH, code }),
    addStyrk: (code) => dispatch({ type: ADD_STYRK, code }),
    toggleList: () => dispatch({ type: TOGGLE_STYRK_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(StyrkThree);
