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
        let matchIndex = -1;
        if (typeof this.props.label === 'string') {
            matchIndex = this.props.label.toLowerCase().indexOf(this.props.match.toLowerCase());
        }

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
                {matchIndex !== -1 && this.props.match !== '' ? (
                    <span
                        className={
                            this.props.active
                                ? 'TypeaheadSuggestion__inner TypeaheadSuggestion--active'
                                : 'TypeaheadSuggestion__inner'
                        }
                    >
                        {this.props.label.substring(0, matchIndex)}
                        <span className="TypeaheadSuggestion__substring">
                            {this.props.label.substring(
                                matchIndex,
                                matchIndex + this.props.match.length
                            )}
                        </span>
                        {this.props.label.substring(matchIndex + this.props.match.length)}
                    </span>
                ) : (
                    <span
                        className={
                            this.props.active
                                ? 'TypeaheadSuggestion__inner TypeaheadSuggestion--active'
                                : 'TypeaheadSuggestion__inner'
                        }
                    >
                        {this.props.label}
                    </span>
                )}
            </li>
        );
    }
}

TypeaheadSuggestion.propTypes = {
    item: PropTypes.shape({}).isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    match: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    setSuggestionIndex: PropTypes.func.isRequired,
    avoidBlur: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
    ]).isRequired,
};
