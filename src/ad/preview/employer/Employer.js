import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Undertittel } from 'nav-frontend-typografi';
import markWords from '../markWords';
import './Employer.less';

export default function Employer({ properties }) {
    return (
        <div className="detail-section">
            <Undertittel className="detail-section__head">Om arbeidsgiveren</Undertittel>
            <dl className="dl-flex typo-normal">
                {properties.employer && [
                    <dt key="dt">Arbeidsgiver:</dt>,
                    <dd key="dd">{properties.employer}</dd>
                ]}
                {properties.address && [
                    <dt key="dt">Adresse:</dt>,
                    <dd key="dd">{properties.address}</dd>
                ]}
                {properties.employerhomepage && [
                    <dt key="dt">Hjemmeside:</dt>,
                    <dd key="dd">{properties.employerhomepage}</dd>
                ]}
                {properties.linkedinpage && [
                    <dt key="dt">LinkedIn:</dt>,
                    <dd key="dd">{properties.linkedinpage}</dd>
                ]}
                {properties.twitteraddress && [
                    <dt key="dt">Twitter:</dt>,
                    <dd key="dd">{properties.twitteraddress}</dd>
                ]}
                {properties.facebookpage && [
                    <dt key="dt">Facebook:</dt>,
                    <dd key="dd">{properties.facebookpage}</dd>
                ]}
            </dl>
            <div>
                {properties.employerdescription && (
                    <div className="EmployerDetails__description">
                        { ReactHtmlParser(markWords(properties.employerdescription)) }
                    </div>
                )}
            </div>
        </div>
    );
}
