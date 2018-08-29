import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromHTML, RichUtils, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import HeaderStylesDropdown from './HeaderStylesDropdown';
import UndoRedoButtons from './UndoRedoButtons';
import './RichTextEditor.less';

export const checkIfEmptyInput = (value) => {
    const emptySpaceOrNotWordRegex = /^(\s|\W)+$/g;
    return (value.length === 0 || emptySpaceOrNotWordRegex.test(value));
};

export default class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.text === '') {
            this.state = {
                editorState: EditorState.createEmpty(),
                redoDisabled: true,
                undoDisabled: true
            };
        } else {
            const html = convertFromHTML(this.props.text);
            const contentState = ContentState.createFromBlockArray(html);
            this.state = {
                editorState: EditorState.createWithContent(contentState),
                redoDisabled: true,
                undoDisabled: true
            };
        }
    }

    onChange = (editorState) => {
        const redoDisabled = editorState.getRedoStack().count() === 0;
        const undoDisabled = editorState.getUndoStack().count() === 0;
        this.setState({
            editorState,
            redoDisabled,
            undoDisabled
        });
        const emptyInput = checkIfEmptyInput(editorState.getCurrentContent().getPlainText());
        // If the editor is empty when the user saves, and empty string is saved og not <p></p> which is the default
        if (!emptyInput) {
            const newState = convertToHTML(editorState.getCurrentContent());
            this.props.onChange(newState);
        } else {
            this.props.onChange('');
        }
    };

    onToggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

    onToggleInlineStyle = (inlineStyle) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    };

    onRedoButtonClick = () => {
        const editorState = EditorState.redo(this.state.editorState);
        this.onChange(editorState);
    };

    onUndoButtonClick = () => {
        const editorState = EditorState.undo(this.state.editorState);
        this.onChange(editorState);
    };

    handleKeyCommand = (command, editorState) => {
        const text = RichUtils.handleKeyCommand(editorState, command);
        if (text) {
            this.setState({
                editorState: text
            });
            const newState = convertToHTML(text.getCurrentContent());
            this.props.onChange(newState);
        }
    };

    render() {
        return (
            <div className="RichTextEditor__rte">
                <div className="RichTextEditor__styleButtons">
                    <HeaderStylesDropdown
                        editorState={this.state.editorState}
                        onToggle={this.onToggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.onToggleInlineStyle}
                    />
                    <BlockStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.onToggleBlockType}
                    />
                    <UndoRedoButtons
                        onRedoClick={this.onRedoButtonClick}
                        onUndoClick={this.onUndoButtonClick}
                        redoDisabled={this.state.redoDisabled}
                        undoDisabled={this.state.undoDisabled}
                    />
                </div>
                <div className="RichTextEditor__editor">
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}

RichTextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

