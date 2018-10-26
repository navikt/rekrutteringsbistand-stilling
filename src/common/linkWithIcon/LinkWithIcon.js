import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './LinkWithIcon.less';

export default function LinkWithIcon({iconName, classNameText, classNameLink, text, to}) {
    return (
        <Link
            to={to}
            className={classNames('LinkWithIcon', classNameLink, iconName)}
        >
            <span className={classNames('LinkWithIcon__text lenke', classNameText)}>
                {text}
            </span>
        </Link>
    );
}

LinkWithIcon.defaultProps = {
    iconName: undefined,
    classNameText: undefined,
    classNameLink: undefined,
    text: ''
};

LinkWithIcon.propTypes = {
    iconName: PropTypes.string,
    classNameText: PropTypes.string,
    classNameLink: PropTypes.string,
    text: PropTypes.string,
    to: PropTypes.string.isRequired
};
