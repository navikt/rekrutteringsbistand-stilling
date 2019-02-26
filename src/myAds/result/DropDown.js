import React from 'react';
import PropTypes from 'prop-types';
import './DropDown.less';

const DropDownItem = ({ label, onClick }) => (
    <li onClick={onClick}>{label}</li>
);

DropDownItem.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const DropDown = ({ visible, items }) => {
    if (visible) {
        return (
            <ul className="DropDown">
                {items.map(item => (
                    <DropDownItem key={item.label} {...item} />
                ))}
            </ul>
        )
    } else {
        return null;
    }
};

DropDown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    })),
    visible: PropTypes.bool.isRequired
};

export default DropDown;
