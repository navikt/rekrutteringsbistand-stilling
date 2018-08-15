import React from 'react';
import { connect } from 'react-redux';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import './ValidationSummary.less';

function ValidationSummary({ validation }) {
    console.log(validation)
    const validationErrors = Object.keys(validation).map((key) => ({
        key,
        value: validation[key]
    })).filter((error) => error.value !== undefined);

    if (validationErrors.length > 0) {
        return (
            <div className="ValidationSummary">
                <AlertStripeAdvarsel solid className="ValidationSummary__alertstripe">
                    <b>Annonsen har {validationErrors.length} feil:</b>
                    <ul className="ValidationSummary__list">
                        {validationErrors.map((error) => (
                            <li key={error.key}>{error.value}</li>
                        ))}
                    </ul>
                </AlertStripeAdvarsel>
            </div>
        );
    }
    return null;
}


const mapStateToProps = (state) => ({
    validation: state.adValidation.errors
});

export default connect(mapStateToProps)(ValidationSummary);

