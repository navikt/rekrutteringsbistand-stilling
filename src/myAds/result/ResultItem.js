import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import capitalizeEmployerName from '../../ad/edit/employer/capitalizeEmployerName';
import { formatISOString } from '../../utils';
import AdStatusEnum from '../../searchPage/enums/AdStatusEnum';
import PrivacyStatusEnum from '../../ad/administration/publishing/PrivacyStatusEnum';
import LinkWithIcon from '../../common/linkWithIcon/LinkWithIcon';
import './Icons.less';
import './Result.less';

const ResultItem = ({ ad }) => (
    <tbody>
        <tr className="ResultItem">
            <td className="ColWidth-se">
                {ad.updated && (
                    <Normaltekst className="ResultItem__column">
                        {formatISOString(ad.updated, 'DD.MM.YYYY')}
                    </Normaltekst>
                )}
            </td>
            <td className="ColWidth-st">
                <div className="ResultItem__column">
                    <Link
                        className="typo-normal lenke"
                        to={`/ads/${ad.uuid}`}
                    >
                        {ad.title ? ad.title : ''}
                    </Link>
                </div>
            </td>
            <td className="ColWidth-a">
                {ad.employer && ad.employer.name && (
                    <Normaltekst className="ResultItem__column">
                        {capitalizeEmployerName(ad.employer.name)}
                    </Normaltekst>
                )}
            </td>
            <td className="ColWidth-p">
                {ad.privacy && (
                    <Normaltekst className="ResultItem__column">
                        {ad.privacy === PrivacyStatusEnum.SHOW_ALL
                            ? 'Arbeidsplassen' : 'Internt'}
                    </Normaltekst>
                )}
            </td>
            <td className="ColWidth-c">
                <div className="">
                    <LinkWithIcon
                        to={'#'}
                        classNameText="typo-normal"
                        classNameLink="CandidateList"
                        text="Se kandidatliste"/>
                </div>
            </td>
            <td className="ColWidth-sta">
                { ad.status && AdStatusEnum[ad.status] && (
                    <Normaltekst className="ResultItem__column">
                        {AdStatusEnum[ad.status]}
                    </Normaltekst>
                )}
            </td>
            <td className="ColWidth-br">
                <button
                    className="Icon__button"
                    aria-label="Rediger"
                    title="rediger"
                    disabled={AdStatusEnum[ad.status] === AdStatusEnum.EXPIRED}
                >
                    <i className="Edit__icon"/>
                </button>
            </td>
            <td className="ColWidth-bk">
                <button
                    className="Icon__button"
                    aria-label="Kopier"
                    title="kopier"
                >
                    <i className="Copy__icon"/>
                </button>
            </td>
            <td className="ColWidth-bst">
                <button
                    className="Icon__button"
                    aria-label="Stopp"
                    title="stopp"
                    disabled={AdStatusEnum[ad.status] !== AdStatusEnum.ACTIVE}
                >
                    <i className="Stop__icon"/>
                </button>
            </td>
            <td className="ColWidth-bsl">
                <button
                    className="Icon__button"
                    aria-label="Slett"
                    title="slett"
                    disabled={AdStatusEnum[ad.status] !== AdStatusEnum.INACTIVE}

                >
                    <i className="Delete__icon"/>
                </button>
            </td>
        </tr>
    </tbody>
);

ResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

export default ResultItem;
