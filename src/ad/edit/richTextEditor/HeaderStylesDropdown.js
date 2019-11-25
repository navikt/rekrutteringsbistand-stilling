import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'nav-frontend-skjema';
import './RichTextEditor.less';

export default class HeaderStylesDropdown extends React.Component {
    onSelect = e => {
        this.props.onToggle(e.target.value);
    };

    render() {
        const HEADERS = [
            { label: 'Normal', style: 'unstyled' },
            { label: 'H1', style: 'header-one' },
            { label: 'H2', style: 'header-two' },
            { label: 'H3', style: 'header-three' },
            { label: 'H4', style: 'header-four' },
            { label: 'H5', style: 'header-five' },
            { label: 'H6', style: 'header-six' },
        ];

        const selection = this.props.editorState.getSelection();
        const blockType = this.props.editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return (
            <Select
                label=""
                bredde="s"
                value={blockType}
                onChange={this.onSelect}
                aria-label="Velg header element"
            >
                {HEADERS.map(type => (
                    <option key={type.style} value={type.style}>
                        {type.label}
                    </option>
                ))}
            </Select>
        );
    }
}

HeaderStylesDropdown.propTypes = {
    onToggle: PropTypes.func.isRequired,
    editorState: PropTypes.shape({
        getSelection: PropTypes.func,
        getCurrentContent: PropTypes.func,
    }).isRequired,
};
