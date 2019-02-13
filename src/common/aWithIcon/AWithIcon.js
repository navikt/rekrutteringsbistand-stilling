import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './AWithIcon.less';

export default function AWithIcon({ iconName, classNameText, classNameLink, text, href, onClick }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={classNames('AWithIcon', classNameLink, iconName)}
        >
            <span className={classNames('AWithIcon__text lenke', classNameText)}>
                {text}
            </span>
        </a>
    );
}

AWithIcon.defaultProps = {
    iconName: undefined,
    classNameText: undefined,
    classNameLink: undefined,
    text: '',
    onClick: () => {}
};

AWithIcon.propTypes = {
    iconName: PropTypes.string,
    classNameText: PropTypes.string,
    classNameLink: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func
};
