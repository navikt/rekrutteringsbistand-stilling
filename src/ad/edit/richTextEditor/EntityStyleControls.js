import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import './RichTextEditor.less';

const EntityStyleControls = ({ entityKey, onToggle }) => {
    const ENTITY_TYPES = [{ label: 'icon-link', style: 'LINK' }];

    return (
        <div className="RichTextEditor__controls">
            {ENTITY_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={entityKey != null}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

EntityStyleControls.propTypes = {
    entityKey: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
};

export default EntityStyleControls;
