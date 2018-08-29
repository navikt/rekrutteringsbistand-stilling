import React from 'react';
import PropTypes from 'prop-types';
import './RichTextEditor.less';

const UndoRedoButtons = ({ onRedoClick, redoDisabled, onUndoClick, undoDisabled }) => (
    <div className="RichTextEditor__controls">
        <button
            className={`RichTextEditor__styleButton${undoDisabled ? ' RichTextEditor__disabledButton' : ''}`}
            onClick={onUndoClick}
            disabled={undoDisabled}
        >
            <div className="icon-undo" />
        </button>
        <button
            className={`RichTextEditor__styleButton${redoDisabled ? ' RichTextEditor__disabledButton' : ''}`}
            onClick={onRedoClick}
            disabled={redoDisabled}
        >
            <div className="icon-redo" />
        </button>
    </div>
);

UndoRedoButtons.propTypes = {
    onRedoClick: PropTypes.func.isRequired,
    onUndoClick: PropTypes.func.isRequired,
    redoDisabled: PropTypes.bool.isRequired,
    undoDisabled: PropTypes.bool.isRequired
};

export default UndoRedoButtons;
