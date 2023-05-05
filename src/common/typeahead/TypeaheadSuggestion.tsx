import React from 'react';
import classNames from 'classnames';
import { Suggestion } from './Typeahead';
import css from './Typeahead.module.css';

type Props = {
    id: string;
    onClick: (value: string) => void;
    suggestion: Suggestion;
    active: boolean;
    index: number;
    avoidBlur: () => void;
    highlightSuggestion: (index: number) => void;
};

const TypeaheadSuggestion = ({
    id,
    onClick,
    suggestion,
    active,
    index,
    highlightSuggestion,
    avoidBlur,
}: Props) => {
    const handleClick = () => {
        onClick(suggestion.value);
    };

    const handleHighlightSuggestion = () => {
        highlightSuggestion(index);
    };

    return (
        <li
            id={hentSuggestionId(id, suggestion.value)}
            role="option"
            aria-selected={active}
            onClick={handleClick}
            onMouseOver={handleHighlightSuggestion}
            onFocus={avoidBlur}
            onMouseDown={avoidBlur}
            onKeyDown={avoidBlur}
        >
            <span
                className={classNames(css.typetext, {
                    [css.aktivtForslag]: active,
                })}
            >
                {suggestion.label}
            </span>
        </li>
    );
};

export const hentSuggestionId = (id: string, value: string) => `${id}-suggestion-${value}`;

export default TypeaheadSuggestion;
