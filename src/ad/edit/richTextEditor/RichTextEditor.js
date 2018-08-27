import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromHTML, RichUtils, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import HeaderStylesDropdown from './HeaderStylesDropdown';
import './RichTextEditor.less';

export const createEmptyOrHTMLStringFromRTEValue = (rteValue) => {
    const emptySpaceOrNotWordRegex = /^(\s|\W)+$/g;
    const textMarkdown = rteValue.toString('markdown');
    let newText = '';
    if (textMarkdown.search(emptySpaceOrNotWordRegex) < 0) {
        newText = rteValue.toString('html');
    }

    return newText;
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
        const newState = createEmptyOrHTMLStringFromRTEValue(convertToHTML(editorState.getCurrentContent()));
        // EditorState blir satt til <p></p> hvis man trykker inn på den,
        // dette gjør at om arbeidsgiver blir satt til en tom paragraf som ikke
        // er ønskelig.
        if (newState === '<p></p>') {
            this.props.onChange('');
        } else {
            this.props.onChange(newState);
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
            const newState = createEmptyOrHTMLStringFromRTEValue(convertToHTML(text.getCurrentContent()));
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

