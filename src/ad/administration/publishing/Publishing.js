import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovelger from 'nav-datovelger';
import 'nav-datovelger/dist/datovelger/styles/datovelger.css';
import { formatISOString } from '../../../utils';
import { SET_PUBLISHED, SET_EXPIRATION_DATE } from '../../adDataReducer';
import './Publishing.less';

class Publishing extends React.Component {
    onPublishedChange = (date) => {
        let published;
        if (date && !Number.isNaN(Date.parse(date))) {
            date.setHours(3);
            published = date.toISOString();
        }
        this.props.setPublished(published);
    };

    onExpiresChange = (date) => {
        let expires;
        if (date && !Number.isNaN(Date.parse(date))) {
            date.setHours(3);
            expires = date.toISOString();
        }
        this.props.setExpirationDate(expires);
    };

    render() {
        const { published, expires } = this.props;
        return (
            <div className="Publishing typo-normal">
                <div className="Publishing__datepicker">
                    <Normaltekst className="Publishing__label">Publiseringsdato*</Normaltekst>
                    <Datovelger
                        id="published"
                        dato={formatISOString(published, 'DD.MM.YYYY') || ''}
                        onChange={this.onPublishedChange}
                        ref={(instance) => { this.refPublished = instance; }}
                        avgrensninger={{ minDato: new Date(Date.now()) }}
                        inputProps={{ placeholder: 'dd.mm.åååå' }}
                    />
                    {this.props.validation.published && (
                        <div className="Administration__error">{this.props.validation.published}</div>
                    )}
                </div>
                <div className="Publishing__datepicker Publishing__datepicker-expires">
                    <Normaltekst className="Publishing__label">Siste visningsdato*</Normaltekst>
                    <Datovelger
                        id="expires"
                        dato={formatISOString(expires, 'DD.MM.YYYY') || ''}
                        onChange={this.onExpiresChange}
                        ref={(instance) => { this.refExpires = instance; }}
                        avgrensninger={{ minDato: new Date(Date.now()) }}
                        inputProps={{ placeholder: 'dd.mm.åååå' }}
                    />
                    {this.props.validation.expires && (
                        <div className="Administration__error">{this.props.validation.expires}</div>
                    )}
                </div>
            </div>
        );
    }
}

Publishing.defaultProps = {
    published: undefined,
    expires: undefined
};

Publishing.propTypes = {
    published: PropTypes.string,
    expires: PropTypes.string,
    setExpirationDate: PropTypes.func.isRequired,
    setPublished: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        expires: PropTypes.string,
        published: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    published: state.adData.published,
    expires: state.adData.expires,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setPublished: (published) => dispatch({ type: SET_PUBLISHED, published }),
    setExpirationDate: (expires) => dispatch({ type: SET_EXPIRATION_DATE, expires })
});

export default connect(mapStateToProps, mapDispatchToProps)(Publishing);
