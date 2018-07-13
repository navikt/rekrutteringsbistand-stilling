import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import './SearchBox.less';
import { SET_SEARCHBOX_VALUE } from './searchBoxReducer';

class SearchBox extends React.Component {

    onSearch = () => {
        this.props.setValue(this.searchInput.value);
        this.props.onSearchClick(this.searchInput.value);
    };

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
                        defaultValue={ this.props.value? this.props.value : undefined}
                    />
                    <Hovedknapp className="SearchBox__button" onClick={this.onSearch}>
                        Søk
                    </Hovedknapp>
                </div>
            </SkjemaGruppe>
        );
    }
}

SearchBox.defaultProps = {
    label: '',
    placeholder: '',
    value: undefined
};

SearchBox.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSearchClick: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
    setValue: (value) => dispatch({ type: SET_SEARCHBOX_VALUE, value })
});

const mapStateToProps = (state) => ({
    value: state.searchBox.value
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

