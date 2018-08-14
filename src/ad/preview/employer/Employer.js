import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import ReactHtmlParser from 'react-html-parser';
import markWords from '../markWords';
import './Employer.less';

export default function Employer({ properties, employer }) {
    return (
        <div className="detail-section">
            <Element className="detail-section__head">Om arbeidsgiver</Element>
            <dl className="dl-flex typo-normal">
                {employer && employer.name && [
                    <dt key="dt">Arbeidsgiver:</dt>,
                    <dd key="dd">{employer.name}</dd>
                ]}
            </dl>
            {properties.employerdescription && (
                <div className="Employer__description">{ReactHtmlParser(markWords(properties.employerdescription))}
                </div>
            )}
        </div>
    );
}

Employer.defaultProps = {
    employer: null
};

Employer.propTypes = {
    properties: PropTypes.shape({
        employer: PropTypes.string,
        address: PropTypes.string,
        employerdescription: PropTypes.string
    }).isRequired,
    employer: PropTypes.shape({
        name: PropTypes.string
    })
};
