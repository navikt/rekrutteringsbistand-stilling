import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import './RichTextEditor.less';

const LinkControl = ({ editorState, harLinkForSelection, onToggle }) => {
    return (
        <div className="RichTextEditor__controls">
            <StyleButton
                key={'icon-link'}
                active={harLinkForSelection(editorState)}
                label={'icon-link'}
                onToggle={onToggle}
                style={'LINK'}
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
