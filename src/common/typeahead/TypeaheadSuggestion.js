import React from 'react';
import PropTypes from 'prop-types';
import './TypeaheadSuggestion.less';

export default class TypeaheadSuggestion extends React.Component {
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
                    className={this.props.active ?
                        'TypeaheadSuggestion__inner TypeaheadSuggestion--active' :
                        'TypeaheadSuggestion__inner'}
                >
                    {this.props.label}
                </span>
            </li>
        );
    }
}

TypeaheadSuggestion.propTypes = {
    item: PropTypes.shape({}).isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    setSuggestionIndex: PropTypes.func.isRequired,
    avoidBlur: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string
    ]).isRequired
};
