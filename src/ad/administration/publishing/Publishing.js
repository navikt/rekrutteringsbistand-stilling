import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Datepicker } from 'nav-datovelger';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import {
    fjernTidspunktFraISOString,
    isValidISOString,
    leggTilTimerPåISOString,
} from '../../../utils/datoUtils.ts';
import { SET_PUBLISHED, SET_EXPIRATION_DATE } from '../../adDataReducer';
import Skjemalabel from '../../edit/skjemaetikett/Skjemalabel';
import './Publishing.less';

class Publishing extends React.Component {
    onPublishedChange = (date) => {
        if (isValidISOString(date)) {
            this.props.setPublished(leggTilTimerPåISOString(date, 3));
        } else {
            this.props.setPublished(date);
        }
    };

    onExpiresChange = (date) => {
        if (isValidISOString(date)) {
            this.props.setExpirationDate(leggTilTimerPåISOString(date, 3));
        } else {
            this.props.setExpirationDate(date);
        }
    };

    render() {
        const { published, expires } = this.props;

        return (
            <div className="Publishing">
                <div className="Publishing__datepicker Publishing__datepicker-publishing-date">
                    <Skjemalabel påkrevd>Publiseringsdato</Skjemalabel>
                    <Normaltekst tag="div">
                        <Datepicker
                            locale="nb"
                            id="endre-stilling-datovelger-published"
                            inputId="published__input"
                            inputProps={{
                                name: 'endre-stilling-datovelger-published',
                                placeholder: 'dd.mm.åååå',
                                'aria-label': 'Sett publiseringsdato',
                            }}
                            value={fjernTidspunktFraISOString(published)}
                            onChange={this.onPublishedChange}
                            limitations={{
                                minDate: fjernTidspunktFraISOString(new Date().toISOString()),
                            }}
                        />
                    </Normaltekst>
                    {this.props.validation.published && (
                        <Feilmelding>{this.props.validation.published}</Feilmelding>
                    )}
                </div>
                <div className="Publishing__datepicker Publishing__datepicker-expires">
                    <Skjemalabel påkrevd>Siste visningsdato</Skjemalabel>
                    <Normaltekst tag="div">
                        <Datepicker
                            locale="nb"
                            id="endre-stilling-datovelger-expires"
                            inputId="expires__input"
                            inputProps={{
                                name: 'endre-stilling-datovelger-expires',
                                placeholder: 'dd.mm.åååå',
                                'aria-label': 'Sett siste visningsdato',
                            }}
                            value={fjernTidspunktFraISOString(expires)}
                            onChange={this.onExpiresChange}
                            limitations={{
                                minDate: fjernTidspunktFraISOString(new Date().toISOString()),
                            }}
                        />
                    </Normaltekst>
                    {this.props.validation.expires && (
                        <Feilmelding>{this.props.validation.expires}</Feilmelding>
                    )}
                </div>
            </div>
        );
    }
}

Publishing.defaultProps = {
    published: undefined,
    expires: undefined,
};

Publishing.propTypes = {
    published: PropTypes.string,
    expires: PropTypes.string,
    setExpirationDate: PropTypes.func.isRequired,
    setPublished: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        expires: PropTypes.string,
        published: PropTypes.string,
    }).isRequired,
};

const mapStateToProps = (state) => ({
    published: state.adData.published,
    expires: state.adData.expires,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setPublished: (published) => dispatch({ type: SET_PUBLISHED, published }),
    setExpirationDate: (expires) => dispatch({ type: SET_EXPIRATION_DATE, expires }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Publishing);
