import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import capitalizeEmployerName from '../../ad/edit/employer/capitalizeEmployerName';
import { formatISOString } from '../../utils';
import { FETCH_AND_SHOW_STOP_MODAL } from '../../ad/adReducer';
import AdStatusEnum from '../../searchPage/enums/AdStatusEnum';
import PrivacyStatusEnum from '../../ad/administration/publishing/PrivacyStatusEnum';
import LinkWithIcon from '../../common/linkWithIcon/LinkWithIcon';
import './Icons.less';
import './Result.less';

class ResultItem extends React.Component {
    render() {
        const { ad } = this.props;
        return (
             <tr className="ResultItem" >
                <td className="Col-updated">
                    {ad.updated && (
                        <Normaltekst className="ResultItem__column">
                            {formatISOString(ad.updated, 'DD.MM.YYYY')}
                        </Normaltekst>
                    )}
                </td>
                <td className="Col-title">
                    <div className="ResultItem__column">
                        <Link
                            className="typo-normal lenke"
                            to={`/ads/${ad.uuid}`}
                        >
                            {ad.title ? ad.title : ''}
                        </Link>
                    </div>
                </td>
                <td className="Col-employer">
                    {ad.employer && ad.employer.name && (
                        <Normaltekst className="ResultItem__column">
                            {capitalizeEmployerName(ad.employer.name)}
                        </Normaltekst>
                    )}
                </td>
                <td className="Col-privacy">
                    {ad.privacy && (
                        <Normaltekst className="ResultItem__column">
                            {ad.privacy === PrivacyStatusEnum.SHOW_ALL
                                ? 'Arbeidsplassen' : 'Internt'}
                        </Normaltekst>
                    )}
                </td>
                <td className="Col-candidate">
                    <div className="CandidateList__column">
                        <LinkWithIcon
                            to={'#'}
                            classNameText="typo-normal"
                            classNameLink="CandidateList"
                            text="Se kandidatliste"/>
                    </div>
                </td>
                <td className="Col-status">
                    {ad.status && AdStatusEnum[ad.status] && (
                        <Normaltekst className="ResultItem__column">
                            {AdStatusEnum[ad.status]}
                        </Normaltekst>
                    )}
                </td>
                <td className="Col-edit center">
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
                <td className="Col-copy center">
                    <button
                        className="Icon__button"
                        aria-label="Kopier"
                        title="kopier"
                    >
                        <i className="Copy__icon"/>
                    </button>
                </td>
                <td className="Col-stop center">
                    <button
                        className="Icon__button"
                        aria-label="Stopp"
                        title="stopp"
                        disabled={AdStatusEnum[ad.status] !== AdStatusEnum.ACTIVE}
                    >
                        <i className="Stop__icon"/>
                    </button>
                </td>
                <td className="Col-delete center">
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
        );
    }
}

ResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultItem);
