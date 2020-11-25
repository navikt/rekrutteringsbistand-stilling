import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './AWithIcon.less';

export default function AWithIcon({ iconName, classNameText, classNameLink, text, href, onClick }) {
    return (
        <Link
            to={href}
            onClick={onClick}
            className={classNames('AWithIcon', classNameLink, iconName)}
        >
            <span className={classNames('AWithIcon__text lenke', classNameText)}>{text}</span>
        </Link>
    );
}

AWithIcon.defaultProps = {
    iconName: undefined,
    classNameText: undefined,
    classNameLink: undefined,
    text: '',
    onClick: () => {},
};

AWithIcon.propTypes = {
    iconName: PropTypes.string,
    classNameText: PropTypes.string,
    classNameLink: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
};
