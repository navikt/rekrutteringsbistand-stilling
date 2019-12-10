/* eslint-disable jsx-a11y/mouse-events-have-key-events,no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TypeaheadSuggestion from './TypeaheadSuggestion';
import './Typeahead.less';

export default class Typeahead extends React.Component {
    constructor(props) {
        super();
        this.state = {
            activeSuggestionIndex: -1,
            hasFocus: false,
            shouldShowSuggestions: true,
        };
        this.shouldBlur = true;
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (props.suggestions.length === 1) {
            this.setState({
                activeSuggestionIndex: 0,
            });
        }
    }

    componentWillUnmount() {
        if (this.blurDelay) {
            clearTimeout(this.blurDelay);
            this.blurDelay = undefined;
        }
    }

    /**
     * Vil skje hver gang man legger til eller fjerner en bokstav fra inputfeltet
     */
    onChange = e => {
        const { value } = e.target;
        this.setState({
            activeSuggestionIndex: 0, // Nullstill eventuelt markering av et forslag i listen
            shouldShowSuggestions: true, // Vis forslagslisten igjen. Den kan ha blitt skjult om man trykket Esc
        });
        this.props.onChange(value);
    };

    /**
     * Behandler tastaturnavigasjon i forslagslisten.
     * @param e
     */
    onKeyDown = e => {
        let { activeSuggestionIndex } = this.state;
        const hasSelectedSuggestion = activeSuggestionIndex > -1;

        switch (e.keyCode) {
            case 9: // Tab
                if (hasSelectedSuggestion && this.state.shouldShowSuggestions) {
                    this.setValue(this.props.suggestions[activeSuggestionIndex]);
                }
                break;
            case 13: // Enter
                if (hasSelectedSuggestion && this.state.shouldShowSuggestions) {
                    e.preventDefault(); // Unngå form submit når bruker velger et av forslagene
                    if (this.props.optionalSuggestions !== undefined && activeSuggestionIndex > 4) {
                        this.setValue(this.props.optionalSuggestions[activeSuggestionIndex - 5]);
                    } else if (
                        this.props.optionalSuggestions !== undefined &&
                        activeSuggestionIndex >= this.props.suggestions.length
                    ) {
                        this.setValue(
                            this.props.optionalSuggestions[
                                activeSuggestionIndex - this.props.suggestions.length
                            ]
                        );
                    } else {
                        this.setValue(this.props.suggestions[activeSuggestionIndex]);
                    }
                } else {
                    this.setState({
                        shouldShowSuggestions: false,
                    });
                }
                break;
            case 27: // Esc
                // Hvis man trykker Esc, og forslagslisten er synlig, så skal listen skjules.
                // Hvis forslagslisten allerede er skjult, så vil verdien i
                // inputfeltet slettes (hvis dette er standard oppførsel i browseren).
                if (this.state.shouldShowSuggestions && this.props.suggestions.length > 0) {
                    e.preventDefault(); // Unngå at verdi i inputfelt slettes
                    this.setState({
                        shouldShowSuggestions: false,
                    });
                }
                break;
            case 38: // Pil opp
                if (this.state.shouldShowSuggestions) {
                    e.preventDefault();

                    // Marker forrige suggestion i listen.
                    // Hvis man er på toppen av listen og trykker pil opp, så skal ingen forslag markeres.
                    activeSuggestionIndex =
                        activeSuggestionIndex - 1 === -2 ? -1 : activeSuggestionIndex - 1;
                    this.setState({ activeSuggestionIndex });
                    if (activeSuggestionIndex > -1) {
                        const activeElement = document.getElementById(
                            `${this.props.id}-item-${activeSuggestionIndex}`
                        );
                        if (activeElement !== null) {
                            activeElement.scrollIntoViewIfNeeded();
                        }
                    }
                }
                break;
            case 40: // Pil ned
                if (this.state.shouldShowSuggestions) {
                    e.preventDefault();

                    // Marker neste suggestion i listen, så fremst man ikke er på slutten av listen
                    if (this.props.optionalSuggestions !== undefined) {
                        activeSuggestionIndex =
                            activeSuggestionIndex + 1 ===
                            this.props.suggestions.length + this.props.optionalSuggestions.length
                                ? this.props.suggestions.length +
                                  this.props.optionalSuggestions.length -
                                  1
                                : activeSuggestionIndex + 1;
                    } else {
                        activeSuggestionIndex =
                            activeSuggestionIndex + 1 === this.props.suggestions.length
                                ? this.props.suggestions.length - 1
                                : activeSuggestionIndex + 1;
                    }
                    this.setState({ activeSuggestionIndex });
                    const activeElement = document.getElementById(
                        `${this.props.id}-item-${activeSuggestionIndex}`
                    );
                    if (activeElement !== null) {
                        activeElement.scrollIntoViewIfNeeded();
                    }
                }
                break;
            default:
                break;
        }
    };

    onFocus = () => {
        this.setState({
            hasFocus: true,
            activeSuggestionIndex: -1,
        });
    };

    /**
     * Når man trykker med musen på et forslag i listen, så vil dette museklikket
     * forårsake at det også trigges onBlur på input'en. Normalt vil onBlur skjule
     * suggestions-listen. Men når man trykker med musen på et forslag, trenger vi
     * at forslagene ikke skjules, slik at setValue rekker å bli kjørt.
     */
    onBlur = e => {
        const value = e.target.value;
        this.blurDelay = setTimeout(() => {
            if (this.shouldBlur) {
                this.setState({
                    hasFocus: false,
                });
                if (this.props.onBlur) {
                    this.props.onBlur(value);
                }
            }
        }, 10);
    };

    /**
     * Markerer et forslag i listen når bruker trykker pil opp/ned på tastaturet,
     * eller når man man fører musen over et forslag.
     * @param index
     */
    setSuggestionIndex = index => {
        this.setState({
            activeSuggestionIndex: index,
        });
        this.clearBlurDelay();
    };

    /**
     * Setter valgt forslag, og skjuler forslagslisten.
     * @param suggestion
     */
    setValue = suggestion => {
        this.setState(
            {
                shouldShowSuggestions: false,
                activeSuggestionIndex: -1,
            },
            () => {
                this.input.focus();
            }
        );
        this.clearBlurDelay();
        this.props.onSelect(suggestion);
    };

    avoidBlur = () => {
        this.shouldBlur = false;
    };

    clearBlurDelay = () => {
        if (this.blurDelay) {
            clearTimeout(this.blurDelay);
            this.blurDelay = undefined;
        }
        this.shouldBlur = true;
    };

    setFocus = () => {
        this.input.focus();
    };

    render() {
        const showSuggestions =
            this.state.hasFocus &&
            this.state.shouldShowSuggestions &&
            this.props.suggestions.length > 0;

        const activeDescendant =
            this.state.activeSuggestionIndex > -1
                ? `${this.props.id}-item-${this.state.activeSuggestionIndex}`
                : null;

        if (this.props.optionalSuggestions !== undefined) {
            const showOptionalSuggestions =
                this.state.hasFocus &&
                this.state.shouldShowSuggestions &&
                this.props.optionalSuggestions.length > 0;

            const offsetIndex =
                this.props.suggestions.length > 4 ? 5 : this.props.suggestions.length;
            return (
                <div className={classNames('Typeahead', this.props.className)}>
                    {this.props.label && (
                        <label
                            className="typo-normal skjemaelement__label blokk-xxs"
                            htmlFor={this.props.id}
                        >
                            {this.props.label}
                        </label>
                    )}
                    <input
                        disabled={this.props.disabled}
                        id={this.props.id}
                        role="combobox"
                        type="text"
                        aria-autocomplete="list"
                        aria-controls={`${this.props.id}-suggestions`}
                        aria-owns={`${this.props.id}-suggestions`}
                        aria-expanded={showSuggestions}
                        aria-haspopup={showSuggestions}
                        aria-activedescendant={activeDescendant}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        autoComplete="off"
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onKeyDown={this.onKeyDown}
                        onFocus={this.onFocus}
                        ref={input => {
                            this.input = input;
                        }}
                        className={classNames('Typeahead__input typo-normal', {
                            'skjemaelement__input--harFeil': this.props.error,
                        })}
                    />
                    <ul
                        id={`${this.props.id}-suggestions`}
                        role="listbox"
                        className={
                            showSuggestions || showOptionalSuggestions
                                ? 'Typeahead__suggestions'
                                : 'Typeahead__suggestions--hidden'
                        }
                    >
                        {showSuggestions && this.props.suggestions.length > 0 && (
                            <li className="Typeahead__suggestions-label">
                                <span className="Typeahead__suggestions-label2">
                                    {this.props.suggestionsLabel
                                        ? this.props.suggestionsLabel
                                        : 'Kommune'}
                                </span>
                            </li>
                        )}
                        {showSuggestions &&
                            this.props.suggestions.map((suggestion, i) => (
                                <TypeaheadSuggestion
                                    id={`${this.props.id}-item-${i}`}
                                    key={suggestion.value}
                                    index={i}
                                    item={suggestion}
                                    value={suggestion.value}
                                    label={suggestion.label}
                                    match={this.props.value}
                                    active={i === this.state.activeSuggestionIndex}
                                    onClick={this.setValue}
                                    setSuggestionIndex={this.setSuggestionIndex}
                                    avoidBlur={this.avoidBlur}
                                />
                            ))}
                        {showOptionalSuggestions && this.props.optionalSuggestions.length > 0 && (
                            <li className="Typeahead__suggestions-label">
                                <span className="Typeahead__suggestions-label2">
                                    {this.props.optionalSuggestionsLabel
                                        ? this.props.optionalSuggestionsLabel
                                        : 'Land'}
                                </span>
                            </li>
                        )}
                        {showOptionalSuggestions &&
                            this.props.optionalSuggestions.map((suggestion, i) => (
                                <TypeaheadSuggestion
                                    id={`${this.props.id}-item-${i}`}
                                    key={suggestion.value}
                                    index={i + offsetIndex}
                                    item={suggestion}
                                    value={suggestion.value}
                                    label={suggestion.label}
                                    match={this.props.value}
                                    active={i + offsetIndex === this.state.activeSuggestionIndex}
                                    onClick={this.setValue}
                                    setSuggestionIndex={this.setSuggestionIndex}
                                    avoidBlur={this.avoidBlur}
                                />
                            ))}
                    </ul>
                </div>
            );
        }

        return (
            <div className={classNames('Typeahead', this.props.className)}>
                {this.props.label && (
                    <label
                        className="typo-normal skjemaelement__label blokk-xxs"
                        htmlFor={this.props.id}
                    >
                        {this.props.label}
                    </label>
                )}
                <input
                    disabled={this.props.disabled}
                    id={this.props.id}
                    role="combobox"
                    type="text"
                    aria-autocomplete="list"
                    aria-controls={`${this.props.id}-suggestions`}
                    aria-owns={`${this.props.id}-suggestions`}
                    aria-expanded={showSuggestions}
                    aria-haspopup={showSuggestions}
                    aria-activedescendant={activeDescendant}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    autoComplete="off"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    onFocus={this.onFocus}
                    ref={input => {
                        this.input = input;
                    }}
                    className={classNames('Typeahead__input typo-normal', {
                        'skjemaelement__input--harFeil': this.props.error,
                    })}
                />
                <ul
                    id={`${this.props.id}-suggestions`}
                    role="listbox"
                    className={
                        showSuggestions
                            ? 'Typeahead__suggestions'
                            : 'Typeahead__suggestions--hidden'
                    }
                >
                    {showSuggestions &&
                        this.props.suggestions.map((suggestion, i) => (
                            <TypeaheadSuggestion
                                id={`${this.props.id}-item-${i}`}
                                key={suggestion.key || suggestion.value}
                                index={i}
                                item={suggestion}
                                value={suggestion.value}
                                label={suggestion.label}
                                match={this.props.value}
                                active={i === this.state.activeSuggestionIndex}
                                onClick={this.setValue}
                                setSuggestionIndex={this.setSuggestionIndex}
                                avoidBlur={this.avoidBlur}
                            />
                        ))}
                </ul>
            </div>
        );
    }
}

Typeahead.defaultProps = {
    disabled: false,
    placeholder: undefined,
    error: false,
    optionalSuggestions: undefined,
    optionalSuggestionsLabel: undefined,
    suggestionsLabel: undefined,
    onBlur: undefined,
};

Typeahead.propTypes = {
    onBlur: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    suggestions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string).isRequired,
        PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                value: PropTypes.string,
            })
        ),
    ]).isRequired,
    optionalSuggestions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string).isRequired,
        PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                value: PropTypes.string,
            })
        ),
    ]),
    optionalSuggestionsLabel: PropTypes.string,
    suggestionsLabel: PropTypes.string,
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
};
