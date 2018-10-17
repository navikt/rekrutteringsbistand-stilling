import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';
import { Flatknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import './Requirements.less';

class Requirements extends React.Component {


    render() {
        const hardrequirements = this.props.hardrequirements
            ? JSON.parse(this.props.hardrequirements) : undefined;
        const softrequirements = this.props.softrequirements
            ? JSON.parse(this.props.softrequirements) : undefined;
        const personalattributes = this.props.personalattributes
            ? JSON.parse(this.props.personalattributes) : undefined;

        return (
            <div>
                <Input
                    label={
                        <div>
                            <Normaltekst className="Requirements__label">
                                Krav til kompetanse (maks 5)
                            </Normaltekst>
                            <HjelpetekstAuto>
                                Absolutte krav til den som søker på
                                stillingen. Det kan for eksempel
                                være utdanningsnivå, spesiell
                                erfaring eller språkkunnskaper.
                            </HjelpetekstAuto>
                        </div>
                    }
                    value={''}
                    onChange={this.onHardrequirementsChange}
                    placeholder="For eksempel: pedagogikk"
                />
                <Input
                    label=""
                    value={''}
                    onChange={this.onHardrequirementsChange}
                />
                <Input
                    label=""
                    value={''}
                    onChange={this.onHardrequirementsChange}
                />
                {(hardrequirements && hardrequirements.length > 3) && (
                    <Input
                        label=""
                        value={''}
                        onChange={this.onHardrequirementsChange}
                        inputRef={(i) => {
                            this.focusField = i;
                        }}
                    />
                )}
                {(hardrequirements && hardrequirements.length > 4) && (
                    <Input
                        label=""
                        value={''}
                        onChange={this.onHardrequirementsChange}
                        inputRef={(i) => {
                            this.focusField = i;
                        }}
                    />
                )}
                {(hardrequirements === undefined || hardrequirements.length < 5) && (
                        <Flatknapp
                            onClick={this.onNewHardrequirement}
                            mini
                        >
                            + Legg til et krav
                        </Flatknapp>
                    ) }
                <div className="Requirements__separator"/>

                <Input
                    label={
                        <div>
                            <Normaltekst className="Requirements__label">
                                Ønsket kompetanse (maks 5)
                            </Normaltekst>
                            <HjelpetekstAuto>
                                Kompetanse som kan være relevant for stillingen,
                                men som ikke er et absolutt krav for å kunne søke.
                            </HjelpetekstAuto>
                        </div>
                    }
                    value={''}
                    onChange={this.onSoftrequirementsChange}
                    placeholder="For eksempel: Førerkort klasse B"
                />
                <Input
                    label=""
                    value={''}
                    onChange={this.onSoftrequirementsChange}
                />
                <Input
                    id="boerkrav3"
                    label=""
                    value={''}
                    onChange={this.endreBoerKrav3}
                />
                {(softrequirements && softrequirements.length > 3) && (
                    <Input
                        label=""
                        value={''}
                        onChange={this.onSoftrequirementsChange}
                        inputRef={(i) => {
                            this.focusField = i;
                        }}
                    />
                )}
                {(softrequirements && softrequirements.length > 4) && (
                    <Input
                        label=""
                        value={''}
                        onChange={this.onSoftrequirementsChange}
                        inputRef={(i) => {
                            this.focusField = i;
                        }}
                    />
                )}
                {(softrequirements === undefined || softrequirements.length < 5) &&(
                    <Flatknapp
                        onClick={this.visNyInputBoerkrav}
                        mini
                    >
                        + Legg til ønsket kompetanse
                    </Flatknapp>
                )}
                <div className="Requirements__separator"/>
                <Input
                    label={
                        <div>
                            <Normaltekst className="Requirements__label">
                                Personlige egenskaper (maks 5)
                            </Normaltekst>
                            <HjelpetekstAuto>
                                Er det noen personlige egenskaper som vektlegges
                                spesielt for denne stillingen?
                            </HjelpetekstAuto>
                        </div>
                    }
                    value={''}
                    onChange={this.onPersonalAttributesChange}
                    placeholder="For eksempel: ansvarsbevisst"
                />
                <Input
                    label=""
                    value={''}
                    onChange={this.endrePersonligeEgenskaper2}
                />
                <Input
                    label=""
                    value={''}
                    onChange={this.endrePersonligeEgenskaper3}
                />
                {(personalattributes && personalattributes.length > 3) && (
                    <Input
                        id="personligeEgenskaper4"
                        label=""
                        value={''}
                        onChange={this.endrePersonligeEgenskaper4}
                        inputRef={(i) => {
                            this.focusField = i;
                        }}
                    />
                )}
                {(personalattributes && personalattributes.length > 4) && (
                    <Input
                        label=""
                        value={''}
                        onChange={this.endrePersonligeEgenskaper5}
                        inputRef={(i) => {
                            this.focusField = i;
                        }}
                    />
                )}
                {(personalattributes === undefined || personalattributes.length < 5) && (
                    <Flatknapp
                        onClick={this.visNyInputEgenskaper}
                        mini
                    >
                        + Legg til en personlig egenskap
                    </Flatknapp>
                )}
            </div>
        );
    }
}

Requirements.defaultProps = {
    hardrequirements: undefined,
    softrequirements: undefined,
    personalattributes: undefined
};

Requirements.propTypes = {
    hardrequirements: PropTypes.string,
    softrequirements: PropTypes.string,
    personalattributes: PropTypes.string
};

const mapStateToProps = (state) => ({
    hardrequirements: state.adData.properties.hardrequirements,
    softrequirements: state.adData.properties.softrequirements,
    personalattributes: state.adData.properties.hardrequirements
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Requirements);
