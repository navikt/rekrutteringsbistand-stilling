import React from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import './SearchBox.less';

export default class SearchBox extends React.Component {
    render() {
        return (
            <SkjemaGruppe>
                <div className="SearchBox">
                    <Input
                        label={this.props.label}
                        inputRef={(ref) => { this.searchInput = ref; }}
                        type="search"
                        placeholder={this.props.placeholder}
                        className="SearchBox__input"
                    />
                    <Hovedknapp className="SearchBox__button" onClick={this.props.onSearchClick}>
                        Søk
                    </Hovedknapp>
                </div>
            </SkjemaGruppe>
        );
    }
}

SearchBox.defaultProps = {
    label: '',
    placeholder: ''
};

SearchBox.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSearchClick: PropTypes.func.isRequired
};
