import React from 'react';
import PropTypes from 'prop-types';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import './PreviewHeader.less';
import capitalizeLocation from  '../../edit/location/capitalizeLocation';

export function commaSeparate(...strings) {
    const onlyStrings = strings.filter((string) => (
        (typeof string === 'string') && string !== ''
    ));
    return onlyStrings.join(', ');
}

export default function AdTitle({ title, employer, location }) {
    let locationInTitle = '';
    if(location) {
        if(location.city) {
            locationInTitle = location.city;
        } else if (location.municipal){
            locationInTitle = location.municipal;
        } else if (location.country){
            locationInTitle = location.country;
        }
    }

    return (
        <div className="AdTitle">
            <Normaltekst>
                {commaSeparate(employer, capitalizeLocation(locationInTitle)) }
            </Normaltekst>
            <Sidetittel>
                {title}
            </Sidetittel>
        </div>
    );
}

AdTitle.defaultProps = {
    title: '',
    employer: '',
    location: ''
};

AdTitle.propTypes = {
    title: PropTypes.string,
    employer: PropTypes.string,
    location: PropTypes.string
};
