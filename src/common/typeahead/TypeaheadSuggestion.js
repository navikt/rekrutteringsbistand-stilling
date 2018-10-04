import React from 'react';
import PropTypes from 'prop-types';
import './TypeaheadSuggestion.less';

export default class TypeaheadSuggestion extends React.Component {
    constructor(props) {
        super();
    }

    onClick = () => {
        this.props.onClick(this.props.item);
    };

    onMouseMove = () => {
        this.props.setSuggestionIndex(this.props.index);
    };

    render() {
        return (
            <li
                id={this.props.id}
                role="option"
                aria-selected={this.props.active}
                onClick={this.onClick}
                onMouseMove={this.onMouseMove}
                onFocus={this.props.avoidBlur}
                onMouseDown={this.props.avoidBlur}
                onKeyDown={this.props.avoidBlur}
                className="TypeaheadSuggestion typo-normal"
            >
                <span
                    className={`TypeaheadSuggestion__inner ${this.props.active && 'TypeaheadSuggestion--active'}`}
                >
                    {this.props.label}
                </span>
            </li>
        );
    }
}

TypeaheadSuggestion.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    setSuggestionIndex: PropTypes.func.isRequired,
    avoidBlur: PropTypes.func.isRequired
};
