import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import LinkWithIcon from '../../../common/linkWithIcon/LinkWithIcon';
import './EditHeader.less';


export default function EditHeader({ onPreviewAdClick}) {
    return (
        <div>
            <div className="Ad__edit__menu">
                <Sidetittel className="Ad__edit__menu-title"> Ny Stilling</Sidetittel>
                <LinkWithIcon
                    to={'/'}
                    classNameText="typo-element"
                    classNameLink="Ad__edit__menu-item FindCandidate"
                    text="Finn kandidater" />
                <LinkWithIcon
                    to={'/'}
                    classNameText="typo-element"
                    classNameLink="Ad__edit__menu-item AddCandidate"
                    text="Legg til kandidat" />
                <Knapp
                    className="Ad__edit__menu-item"
                    onClick={onPreviewAdClick}
                    mini
                >
                    Forhåndsvis stillingen
                </Knapp>
            </div>
            <Normaltekst>* er obligatoriske felter du må fylle ut</Normaltekst>
        </div>
    );
}

EditHeader.propTypes = {
    onPreviewAdClick: PropTypes.func.isRequired
};
