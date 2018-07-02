import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Undertittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema'
import { Panel } from 'nav-frontend-paneler'
import './EmployerDetails.less';

export const tilpassLenke = (lenke) => {
    if (!lenke.startsWith('http')) {
        return `https://${lenke}`;
    }
    return lenke;
};

export default function EmployerDetails({ properties }) {
    return (
        <Panel border className="detail-section">
            <Undertittel className="detail-section__head">Om arbeidsgiver</Undertittel>
            <Input label="Bedriftsnavn">
            </Input>
        </Panel>
    );
}

EmployerDetails.propTypes = {
    properties: PropTypes.shape({
        employer: PropTypes.string,
        address: PropTypes.string,
        employerhomepage: PropTypes.string,
        linkedinpage: PropTypes.string,
        twitteraddress: PropTypes.string,
        facebookpage: PropTypes.string,
        employerdescription: PropTypes.string
    }).isRequired
};

