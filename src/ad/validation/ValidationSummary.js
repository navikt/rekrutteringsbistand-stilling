import React from 'react';
import { connect } from 'react-redux';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import './ValidationSummary.less';

function ValidationSummary({ validation }) {
    const validationErrors = Object.keys(validation).map((key) => ({
        key,
        value: validation[key]
    })).filter((error) => error.value !== undefined);

    if (validationErrors.length > 0) {
        return (
            <div className="ValidationSummary">
                <AlertStripeAdvarsel solid>
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
    validation: state.ad.validation
});

export default connect(mapStateToProps)(ValidationSummary);

