import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import LinkWithIcon from '../../../common/linkWithIcon/LinkWithIcon';
import AdminStatusEnum from '../../administration/adminStatus/AdminStatusEnum';
import './EditHeader.less';


export default function EditHeader({ onPreviewAdClick, uuid, status, title, source }) {
    const showCandidateLinks = (status === AdminStatusEnum.DONE);
    return (
        <div>
            <div className="Ad__edit__menu">
                <Sidetittel className="Ad__edit__menu-title">{title}</Sidetittel>
                {showCandidateLinks && (
                    <LinkWithIcon
                        to={`/kandidater?stillingsid=${uuid}`}
                        classNameText="typo-element"
                        classNameLink="Ad__edit__menu-item FindCandidate"
                        text="Finn kandidater"
                    />
                )}
                {showCandidateLinks && source === 'DIR' && (
                    <LinkWithIcon
                        to={'#'}
                        classNameText="typo-element"
                        classNameLink="Ad__edit__menu-item AddCandidate"
                        text="Legg til kandidat"
                    />
                )}
                {showCandidateLinks && source === 'DIR' && (
                    <LinkWithIcon
                        to={`/kandidater/lister/stilling/${uuid}/detaljer`}
                        classNameText="typo-element"
                        classNameLink="Ad__edit__menu-item CandidateList"
                        text="Se kandidatliste"
                    />
                )}
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

EditHeader.defaultProps = {
    uuid: '',
    status: undefined,
    source: '',
    title: 'Ny stilling'
};

EditHeader.propTypes = {
    onPreviewAdClick: PropTypes.func.isRequired,
    uuid: PropTypes.string,
    status: PropTypes.string,
    source: PropTypes.string,
    title: PropTypes.string
};
