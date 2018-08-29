import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromHTML, RichUtils, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import HeaderStylesDropdown from './HeaderStylesDropdown';
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
                editorState: EditorState.createEmpty()
            };
        } else {
            const html = convertFromHTML(this.props.text);
            const contentState = ContentState.createFromBlockArray(html);
            this.state = {
                editorState: EditorState.createWithContent(contentState)
            };
        }
    }

    onChange = (editorState) => {
        this.setState({
            editorState
        });
        const emptyInput = checkIfEmptyInput(editorState.getCurrentContent().getPlainText());
        // Hvis editoren er tom lagres en tom streng i backend, og ikke <p></p> som er default
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

