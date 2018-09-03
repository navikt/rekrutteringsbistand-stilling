import React from 'react';
import PropTypes from 'prop-types';
import './LinkButton.less';

export default function LinkButton({ children, ...props }) {
    return (
        <button className="LinkButton" {...props}>
            {children}
        </button>
    );
}

LinkButton.defaultProps = {
    children: undefined
};

LinkButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
