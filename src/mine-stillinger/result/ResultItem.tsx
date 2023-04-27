import React, { useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BodyShort } from '@navikt/ds-react';

import { formatISOString } from '../../utils/datoUtils';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../../stilling/Stilling';
import { Rekrutteringsbistandstilling } from '../../Stilling';
import { State } from '../../redux/store';
import LenkeMedIkon from '../../common/lenke-med-ikon/LenkeMedIkon';
import getEmployerName from '../../common/getEmployerName';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import ResultItemDropDown from './ResultItemDropDown';
import './Icons.less';
import './Result.less';

type Props = {
    rekrutteringsbistandstilling: Rekrutteringsbistandstilling;
};

const ResultItem: FunctionComponent<Props> = ({ rekrutteringsbistandstilling }) => {
    const reportee = useSelector((state: State) => state.reportee.data);
    const copiedAds = useSelector((state: State) => state.ad.copiedAds);

    const { stilling, stillingsinfo } = rekrutteringsbistandstilling;

    const isCopy = copiedAds.includes(stilling.uuid);

    const isTransferredToOther =
        stillingsinfo &&
        stillingsinfo.eierNavident &&
        stilling.administration &&
        stilling.administration.navIdent !== stillingsinfo.eierNavident &&
        reportee &&
        stillingsinfo.eierNavident !== reportee.navIdent;

    const colTitle = (
        <td className="Col-title">
            <div className="ResultItem__column Col-title-inner">
                <Link className="typo-normal lenke" to={`/stillinger/stilling/${stilling.uuid}`}>
                    {isCopy
                        ? (
                              <div>
                                  <b>{stilling.title.substr(0, 5)}</b>
                                  {stilling.title.substr(5)}
                              </div>
                          ) || ''
                        : stilling.title || ''}
                </Link>
            </div>
        </td>
    );

    const colUpdated = (
        <td className="Col-updated">
            {stilling.updated && (
                <BodyShort className="ResultItem__column">
                    {formatISOString(stilling.updated, 'DD.MM.YYYY')}
                </BodyShort>
            )}
        </td>
    );

    if (isTransferredToOther) {
        return (
            <tr className={`ResultItem${isCopy ? ' copied' : ''}`}>
                {colUpdated}
                {colTitle}
                <td className="Col-id Col-transferred">
                    <BodyShort className="ResultItem__column">
                        Overført til annen veileder.
                    </BodyShort>
                </td>
                <td className="Col-employer"></td>
                <td className="Col-expires"></td>
                <td className="Col-privacy"></td>
                <td className="Col-status"></td>
                <td className="Col-candidate"></td>
                <td className="Col-edit center"></td>
                <td className="Col-menu"></td>
            </tr>
        );
    }

    return (
        <tr className={`ResultItem${isCopy ? ' copied' : ''}`}>
            {colUpdated}
            {colTitle}
            <td className="Col-id">
                {stilling.id && <BodyShort className="ResultItem__column">{stilling.id}</BodyShort>}
            </td>
            <td className="Col-employer">
                <BodyShort className="ResultItem__column Col-employer-inner">
                    {getEmployerName(stilling)}
                </BodyShort>
            </td>
            <td className="Col-expires">
                {stilling.expires && (
                    <BodyShort className="ResultItem__column">
                        {formatISOString(stilling.expires)}
                    </BodyShort>
                )}
            </td>
            <td className="Col-privacy">
                {stilling.privacy && (
                    <BodyShort className="ResultItem__column">
                        {stilling.privacy === PrivacyStatusEnum.SHOW_ALL
                            ? 'Arbeidsplassen'
                            : 'Internt'}
                    </BodyShort>
                )}
            </td>
            <td className="Col-status">
                {stilling.status && (
                    <BodyShort className="ResultItem__column">
                        {getAdStatusLabel(stilling.status, stilling.deactivatedByExpiry!)}
                    </BodyShort>
                )}
            </td>
            <td className="Col-candidate">
                {stilling.publishedByAdmin && (
                    <LenkeMedIkon
                        href={`/kandidater/lister/stilling/${stilling.uuid}/detaljer`}
                        classNameText="typo-normal"
                        classNameLink="CandidateList"
                        text="Se kandidatliste"
                    />
                )}
            </td>
            <td className="Col-edit center">
                <Link
                    className="Icon__button Inner__button"
                    aria-label="Rediger"
                    title="rediger"
                    to={`/stillinger/stilling/${stilling.uuid}?${REDIGERINGSMODUS_QUERY_PARAM}=true`}
                >
                    <i className="Edit__icon" />
                </Link>
            </td>
            <td className="Col-menu">
                <ResultItemDropDown stilling={stilling} />
            </td>
        </tr>
    );
};

export default ResultItem;
