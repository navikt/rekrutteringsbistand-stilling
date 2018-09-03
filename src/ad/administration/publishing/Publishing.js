import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovelger from 'nav-datovelger';
import { formatISOString } from '../../../utils';

import { SET_PUBLISHED, SET_EXPIRATION_DATE } from '../../adDataReducer';
import {
    registerShortcuts,
    removeShortcuts
} from '../../../common/shortcuts/Shortcuts';
import 'nav-datovelger/dist/datovelger/styles/datovelger.css';
import './Publishing.less';

class Publishing extends React.Component {
    componentDidMount() {
        registerShortcuts('publishingEdit', {
            'p d': (e) => {
                e.preventDefault();
                this.refPublished.input.focus();
            },
            'u d': (e) => {
                e.preventDefault();
                this.refExpires.input.focus();
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('publishingEdit');
    }

    onPublishedChange = (date) => {
        let published;
        if (date) {
            date.setHours(12);
            published = date.toISOString();
        }
        this.props.setPublished(published);
    };

    onExpiresChange = (date) => {
        let expires;
        if (date) {
            date.setHours(12);
            expires = date.toISOString();
        }
        this.props.setExpirationDate(expires);
    };

    render() {
        const { published, expires } = this.props;
        return (
            <div className="Publishing typo-normal">
                <div className="blokk-s">
                    <Normaltekst className="Publishing__label">Publiseringsdato</Normaltekst>
                    <Datovelger
                        id="published"
                        dato={formatISOString(published, 'DD.MM.YY') || ''}
                        onChange={this.onPublishedChange}
                        ref={(instance) => { this.refPublished = instance; }}
                        inputProps={{ placeholder: 'dd.mm.åååå' }}
                    />
                </div>
                <Normaltekst className="Publishing__label">Utløpsdato*</Normaltekst>
                <Datovelger
                    id="expires"
                    dato={formatISOString(expires, 'DD.MM.YY') || ''}
                    onChange={this.onExpiresChange}
                    ref={(instance) => { this.refExpires = instance; }}
                    avgrensninger={{ minDato: new Date(Date.now()) }}
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                />
                {this.props.validation.expires && (
                    <div className="Administration__error">{this.props.validation.expires}</div>
                )}
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
        expires: PropTypes.string
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
