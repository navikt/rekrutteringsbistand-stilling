import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';

function EmployerPreview({ employer }) {
    return (
        <div className="EmployerPreview">
            <Element>Arbeidsgiver fra Enhetsregisteret</Element>
            {employer ? (
                <div>
                    {employer.name && (
                        <Normaltekst>{employer.name}</Normaltekst>
                    )}
                    {employer.location && employer.location.address && (
                        <Normaltekst>{employer.location.address}</Normaltekst>
                    )}
                    {employer.location && employer.location.postalCode && (
                        <Normaltekst>{employer.location.postalCode} {employer.location.city}</Normaltekst>
                    )}
                </div>
            ) : (
                <Normaltekst>Mangler</Normaltekst>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    employer: state.adData.employer
});

export default connect(mapStateToProps)(EmployerPreview);

