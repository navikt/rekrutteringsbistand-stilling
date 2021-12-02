import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import './RichTextEditor.less';

const LinkControl = ({ editorState, harLinkForSelection, onToggle }) => {
    const linktype = { label: 'icon-link', style: 'LINK' };

    return (
        <div className="RichTextEditor__controls">
            <StyleButton
                key={linktype.label}
                active={harLinkForSelection(editorState)}
                label={linktype.label}
                onToggle={onToggle}
                style={linktype.style}
            />
        </div>
    );
};

LinkControl.propTypes = {
    harLinkForSelection: PropTypes.func.isRequired,
    editorState: PropTypes.shape({
        getSelection: PropTypes.func,
        getCurrentContent: PropTypes.func,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default LinkControl;
