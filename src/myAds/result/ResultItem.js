import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
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
                    <td className="ColWidth-updated">
                        {ad.updated && (
                            <Normaltekst className="ResultItem__column">
                                {formatISOString(ad.updated, 'DD.MM.YYYY')}
                            </Normaltekst>
                        )}
                    </td>
                    <td className="ColWidth-title">
                        <div className="ResultItem__column">
                            <Link
                                className="typo-normal lenke"
                                to={`/ads/${ad.uuid}`}
                            >
                                {ad.title ? ad.title : ''}
                            </Link>
                        </div>
                    </td>
                    <td className="ColWidth-employer">
                        {ad.employer && ad.employer.name && (
                            <Normaltekst className="ResultItem__column">
                                {capitalizeEmployerName(ad.employer.name)}
                            </Normaltekst>
                        )}
                    </td>
                    <td className="ColWidth-privacy">
                        {ad.privacy && (
                            <Normaltekst className="ResultItem__column">
                                {ad.privacy === PrivacyStatusEnum.SHOW_ALL
                                    ? 'Arbeidsplassen' : 'Internt'}
                            </Normaltekst>
                        )}
                    </td>
                    <td className="ColWidth-candidate">
                        <div className="">
                            <LinkWithIcon
                                to={'#'}
                                classNameText="typo-normal"
                                classNameLink="CandidateList"
                                text="Se kandidatliste"/>
                        </div>
                    </td>
                    <td className="ColWidth-status">
                        {ad.status && AdStatusEnum[ad.status] && (
                            <Normaltekst className="ResultItem__column">
                                {AdStatusEnum[ad.status]}
                            </Normaltekst>
                        )}
                    </td>
                    <td className="ColWidth-edit center">
                        <Link
                            className="Icon__button"
                            aria-label="Rediger"
                            title="rediger"
                            to={{
                                pathname: `/ads/${ad.uuid}`,
                                state: { openInEditMode: true }
                            }}
                        >
                            <i className={AdStatusEnum[ad.status] === AdStatusEnum.EXPIRED ? "Edit__icon--disabled" : "Edit__icon"}/>
                        </Link>
                    </td>
                    <td className="ColWidth-copy center">
                        <button
                            className="Icon__button"
                            aria-label="Kopier"
                            title="kopier"
                        >
                            <i className="Copy__icon"/>
                        </button>
                    </td>
                    <td className="ColWidth-stop center">
                        <button
                            className="Icon__button"
                            aria-label="Stopp"
                            title="stopp"
                            disabled={AdStatusEnum[ad.status] !== AdStatusEnum.ACTIVE}
                        >
                            <i className="Stop__icon"/>
                        </button>
                    </td>
                    <td className="ColWidth-delete center">
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
