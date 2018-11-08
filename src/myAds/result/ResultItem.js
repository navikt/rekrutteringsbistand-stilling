import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { erDatoFørSluttdato } from 'nav-datovelger/dist/datovelger/utils/datovalidering';
import HjelpetekstBase from 'nav-frontend-hjelpetekst';
import capitalizeEmployerName from '../../ad/edit/employer/capitalizeEmployerName';
import { formatISOString, toDate } from '../../utils';
import { COPY_AD_FROM_MY_ADS, SHOW_DELETE_MODAL_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../ad/adReducer';
import AdStatusEnum from '../../searchPage/enums/AdStatusEnum';
import AdminStatusEnum from '../../ad/administration/adminStatus/AdminStatusEnum';
import PrivacyStatusEnum from '../../ad/administration/publishing/PrivacyStatusEnum';
import LinkWithIcon from '../../common/linkWithIcon/LinkWithIcon';
import './Icons.less';
import './Result.less';

class ResultItem extends React.Component {
    stopAd = () => {
        this.props.stopAd(this.props.ad.uuid);
    };

    deleteAd = () => {
        this.props.deleteAd(this.props.ad.uuid);
    };

    copyAd = () => {
        this.props.copyAd(this.props.ad.uuid);
    };

    deleteButtonWithIcon = () => (<div className="ResultItem__Icon-button">
        <i className="Delete__icon--disabled" /></div>);

    stopButtonWithIcon = () => (<div className="ResultItem__Icon-button">
        <i className="Stop__icon--disabled" /></div>);

    editButtonWithIcon = () => (<div className="ResultItem__Icon-button">
        <i className="Edit__icon--disabled" /></div>);

    render() {
        const { ad, copiedAds } = this.props;
        const adminDone = ad.administration && ad.administration.status && ad.administration.status === AdminStatusEnum.DONE;
        const isExpired = AdStatusEnum[ad.status] === AdStatusEnum.INACTIVE &&
            adminDone &&
            erDatoFørSluttdato(toDate(ad.expires), new Date(Date.now()));
        const isCopy = copiedAds.includes(ad.uuid);
        return (
            <tr className={`ResultItem${isCopy ? ' copied' : ''}`}>
                <td className="Col-updated">
                    {ad.updated && (
                        <Normaltekst className="ResultItem__column">
                            {formatISOString(ad.updated, 'DD.MM.YYYY')}
                        </Normaltekst>
                    )}
                </td>
                <td className="Col-title">
                    <div className="ResultItem__column Col-title-inner">
                        <Link
                            className="typo-normal lenke"
                            to={`/ads/${ad.uuid}`}
                        >
                            {isCopy ? (
                                <div><b>{ad.title.substr(0, 5)}</b>{ad.title.substr(5)}</div> || ''
                            ) : (
                                ad.title || ''
                            )}
                        </Link>
                    </div>
                </td>
                <td className="Col-employer">
                    {ad.employer && ad.employer.name && (
                        <Normaltekst className="ResultItem__column Col-employer-inner">
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
                    <LinkWithIcon
                        to={`/kandidater/lister/stilling/${ad.uuid}/detaljer`}
                        classNameText="typo-normal"
                        classNameLink="CandidateList"
                        text="Se kandidatliste"
                    />
                </td>
                <td className="Col-status">
                    {ad.status && AdStatusEnum[ad.status] && (
                        <Normaltekst className="ResultItem__column">
                            {AdStatusEnum[ad.status]}
                        </Normaltekst>
                    )}
                </td>
                <td className="Col-edit center">
                    {isExpired ? (
                        <HjelpetekstBase
                            anchor={this.editButtonWithIcon}
                            tittel="rediger"
                        >
                            Stillingen har utløpt
                        </HjelpetekstBase>
                    ) : (
                        <Link
                            className="Icon__button"
                            aria-label="Rediger"
                            title="rediger"
                            to={{
                                pathname: `/ads/${ad.uuid}`,
                                state: { openInEditMode: true }
                            }}
                        >
                            <i className="Edit__icon" />
                        </Link>
                    )}
                </td>
                <td className="Col-copy center">
                    <button
                        className="Icon__button"
                        aria-label="Kopier"
                        title="kopier"
                        onClick={this.copyAd}
                    >
                        <i className="Copy__icon" />
                    </button>
                </td>
                <td className="Col-stop center">
                    {AdStatusEnum[ad.status] !== AdStatusEnum.ACTIVE ? (
                        <HjelpetekstBase
                            anchor={this.stopButtonWithIcon}
                            tittel="stopp"
                        >
                            Du kan ikke stoppe en stilling som ikke er publisert
                        </HjelpetekstBase>
                    ) : (
                        <button
                            className="Icon__button"
                            aria-label="Stopp"
                            title="stopp"
                            onClick={this.stopAd}
                        >
                            <i className="Stop__icon" />
                        </button>
                    )}
                </td>
                <td className="Col-delete center">
                    {AdStatusEnum[ad.status] !== AdStatusEnum.INACTIVE ? (
                        <HjelpetekstBase
                            anchor={this.deleteButtonWithIcon}
                            tittel="slett"
                        >
                            {`Du kan ikke slette en ${AdStatusEnum[ad.status].toLowerCase()} stilling`}
                        </HjelpetekstBase>
                    ) : (
                        <button
                            className="Icon__button"
                            aria-label="Slett"
                            title="slett"
                            onClick={this.deleteAd}
                        >
                            <i className="Delete__icon" />
                        </button>
                    )}
                </td>
            </tr>
        );
    }
}

ResultItem.propTypes = {
    ad: PropTypes.shape({
        uuid: PropTypes.string,
        title: PropTypes.string
    }).isRequired,
    stopAd: PropTypes.func.isRequired,
    deleteAd: PropTypes.func.isRequired,
    copyAd: PropTypes.func.isRequired,
    copiedAds: PropTypes.arrayOf(PropTypes.string).isRequired
};


const mapStateToProps = (state) => ({
    copiedAds: state.ad.copiedAds
});

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    deleteAd: (uuid) => dispatch({ type: SHOW_DELETE_MODAL_MY_ADS, uuid }),
    copyAd: (uuid) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid })
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultItem);
