import React from 'react';
import PropTypes from 'prop-types';
import {
    Editor,
    EditorState,
    convertFromHTML,
    RichUtils,
    ContentState,
    CompositeDecorator,
    Entity,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { convertToHTML } from 'draft-convert';
import BlockStyleControls from './BlockStyleControls';
import EntityStyleControls from './EntityStyleControls';
import InlineStyleControls from './InlineStyleControls';
import HeaderStylesDropdown from './HeaderStylesDropdown';
import UndoRedoButtons from './UndoRedoButtons';
import './RichTextEditor.less';
import { Feilmelding } from 'nav-frontend-typografi';

export const checkIfEmptyInput = (value) => {
    const emptySpaceOrNotWordRegex = /^(\s|\W)+$/g;
    return value.length === 0 || emptySpaceOrNotWordRegex.test(value);
};

export const isEmptyPTag = (value) => {
    // remove whitespaces
    let strippedValue = value.replace(/\s/g, '');
    // remove empty html tags
    strippedValue = strippedValue.replace(/<[^>]+>/g, '');
    return strippedValue.length === 0;
};

const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
};

const styles = {
    link: {
        color: '#0067C5',
        background: 'none',
        textDecoration: 'none',
        borderBottom: 'solid 1px #B7B1A9',
        cursor: 'pointer',
    },
};

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};

const blockStyleFunction = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'unstyled') {
        return 'RichTextEditor__paragraph';
    }
};

export default class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ]);

        if (this.props.text === '' || isEmptyPTag(this.props.text)) {
            this.state = {
                editorState: EditorState.createEmpty(decorator),
                redoDisabled: true,
                undoDisabled: true,
            };
        } else {
            const html = convertFromHTML(this.props.text);
            const contentState = ContentState.createFromBlockArray(html);
            this.state = {
                editorState: EditorState.createWithContent(contentState, decorator),
                redoDisabled: true,
                undoDisabled: true,
            };
        }
    }

    onChange = (editorState) => {
        const redoDisabled = editorState.getRedoStack().count() === 0;
        const undoDisabled = editorState.getUndoStack().count() === 0;
        this.setState({
            editorState,
            redoDisabled,
            undoDisabled,
        });
        const emptyInput = checkIfEmptyInput(editorState.getCurrentContent().getPlainText());
        // If the editor is empty when the user saves, and empty string is saved og not <p></p> which is the default
        if (!emptyInput) {
            const newState = convertToHTML({
                // All elements styled as links will be returned as <a> tags
                entityToHTML: (entity, originalText) => {
                    if (entity.type === 'LINK') {
                        const { url } = entity.data;
                        return (
                            <a
                                href={url != null && url.startsWith('http') ? url : 'http://' + url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {originalText}
                            </a>
                        );
                    }
                    return originalText;
                },
            })(editorState.getCurrentContent());
            this.props.onChange(newState);
        } else {
            this.props.onChange('');
        }
    };

    onToggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

    onToggleEntityType = (entityType) => {
        const { editorState } = this.state;
        console.log('e', entityType);

        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const currentBlock = contentState.getBlockForKey(selection.getStartKey());
        const startOffset = editorState.getSelection().getStartOffset();
        const entityKey = currentBlock.getEntityAt(startOffset);
        var entity;
        if (entityKey != null) {
            //const entity = contentState.getEntity(entityKey);
            //const type = entity.type;
            //console.log('ssss', type);
            this.onChange(RichUtils.toggleLink(editorState, editorState.getSelection(), null));
        } else {
            const href = window.prompt('Enter a URL');
            if (href) {
                entity = Entity.create(entityType, 'MUTABLE', { url: href });
                this.onChange(
                    RichUtils.toggleLink(editorState, editorState.getSelection(), entity)
                );
            }
        }
    };

    onToggleInlineStyle = (inlineStyle) => {
        const { editorState } = this.state;
        const editorStateFocused = EditorState.forceSelection(
            editorState,
            editorState.getSelection()
        );
        this.onChange(RichUtils.toggleInlineStyle(editorStateFocused, inlineStyle));
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
                editorState: text,
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
                    <EntityStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.onToggleEntityType}
                    />
                    <UndoRedoButtons
                        onRedoClick={this.onRedoButtonClick}
                        onUndoClick={this.onUndoButtonClick}
                        redoDisabled={this.state.redoDisabled}
                        undoDisabled={this.state.undoDisabled}
                    />
                </div>
                <div
                    className={`RichTextEditor__editor ${
                        this.props.errorMessage ? 'blokk-xxs skjemaelement__input--harFeil' : ''
                    }`}
                >
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        blockStyleFn={blockStyleFunction}
                        placeholder={this.props.placeholderText || ''}
                        ariaDescribedBy={this.props.ariaDescribedBy}
                    />
                </div>
                {this.props.errorMessage && <Feilmelding>{this.props.errorMessage}</Feilmelding>}
            </div>
        );
    }
}

RichTextEditor.defaultProps = {
    placeholderText: '',
    ariaDescribedBy: undefined,
};

RichTextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    placeholderText: PropTypes.string,
    ariaDescribedBy: PropTypes.string,
};
