import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LinkButton.less';

export default function LinkButton({ children, className, ...props }) {
    return (
        <button className={classNames('LinkButton', className)} {...props}>
            {children}
        </button>
    );
}

LinkButton.defaultProps = {
    children: undefined,
    className: undefined,
};

LinkButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
