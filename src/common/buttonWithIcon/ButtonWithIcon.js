import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ButtonWithIcon.less';

export default function ButtonWithIcon({classNameText, classNameButton, text, onClick}) {
    return (
        <button
            onClick={onClick}
            className={classNames('ButtonWithIcon', classNameButton)}
        >
            <span className={classNames('ButtonWithIcon__text lenke', classNameText)}>
                {text}
            </span>
        </button>
    );
}

ButtonWithIcon.defaultProps = {
    classNameText: undefined,
    classNameButton: undefined,
    text: ''
};

ButtonWithIcon.propTypes = {
    classNameText: PropTypes.string,
    classNameButton: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
};
