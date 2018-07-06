import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {Input, SkjemaGruppe} from 'nav-frontend-skjema';
import './Menu.less';

export class SearchBox extends React.Component {

    onSubmit = (e) => {
        e.preventDefault(); // Unngå form submit
        // this.props.onSubmit(this.searchInput.value);
    };

    render() {
        return (
            <SkjemaGruppe className="SearchBox">
                <Input
                    label=""
                    ref={(ref) => this.searchInput = ref}
                    type="search"
                    placeholder="Søke etter stilling eller arbeidsgiver"
                    bredde="fullbredde"
                />
                <Hovedknapp onClick={this.onSubmit}>SØK</Hovedknapp>
            </SkjemaGruppe>
        )
    }
}
