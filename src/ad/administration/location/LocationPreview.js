import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';

function LocationPreview({ location }) {
    return (
        <div className="LocationPreview">
            <Element>Arbeidssted</Element>
            {location ? (
                <div>
                    {location.postalCode && location.city && (
                        <Normaltekst>Poststed: {location.postalCode} {location.city}</Normaltekst>
                    )}
                    {location.municipal && (
                        <Normaltekst>Kommune: {location.municipal}</Normaltekst>
                    )}
                    {location.county && (
                        <Normaltekst>Fylke: {location.county}</Normaltekst>
                    )}
                </div>
            ) : (
                <Normaltekst>Mangler</Normaltekst>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    location: state.adData.location
});

export default connect(mapStateToProps)(LocationPreview);
