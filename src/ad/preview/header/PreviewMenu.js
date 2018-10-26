import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import './PreviewHeader.less';
import LinkWithIcon from '../../../common/linkWithIcon/LinkWithIcon';


export default function PreviewMenu({ onEditAdClick}) {
    return (
        <div className="Ad__preview__menu">
            <LinkWithIcon
                to={'/'}
                classNameText="typo-element"
                classNameLink="Ad__preview__menu-item FindCandidate"
                text="Finn kandidater" />
            <LinkWithIcon
                to={'/'}
                classNameText="typo-element"
                classNameLink="Ad__preview__menu-item AddCandidate"
                text="Legg til kandidat" />
            <LinkWithIcon
                to={'/'}
                classNameText="typo-element"
                classNameLink="Ad__preview__menu-item CandidateList"
                text="Se kandidatliste" />
            <Knapp
                className="Ad__preview__menu-button"
                onClick={onEditAdClick}
                mini
            >
                Rediger stillingen
            </Knapp>
        </div>
    );
}

PreviewMenu.propTypes = {
    onEditAdClick: PropTypes.func.isRequired
};
