import React, { useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Hamburgerknapp } from 'nav-frontend-ikonknapper';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';

import { formatISOString } from '../../utils/datoUtils';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../../stilling/Stilling';
import { Rekrutteringsbistandstilling } from '../../Stilling';
import { State } from '../../redux/store';
import LenkeMedIkon from '../../common/lenke-med-ikon/LenkeMedIkon';
import getEmployerName from '../../common/getEmployerName';
import MedPopover from '../../common/med-popover/MedPopover';
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

    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [hjelpetekst, setHjelpetekst] = useState<{ anker?: any; tekst: string }>({
        tekst: '',
        anker: undefined,
    });

    const toggleHjelpetekst = (nyHjelpetekst: { anker: any; tekst: string }) => {
        lukkHjelpetekst();

        if (hjelpetekst.anker !== nyHjelpetekst.anker) {
            setTimeout(() => {
                setHjelpetekst(nyHjelpetekst);
            }, 0);
        }
    };

    const lukkHjelpetekst = () => {
        setHjelpetekst({
            tekst: '',
            anker: undefined,
        });
    };

    const onDropdownClick = () => {
        lukkHjelpetekst();
        setDropDownVisible(!dropDownVisible);
    };

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
                <Normaltekst className="ResultItem__column">
                    {formatISOString(stilling.updated, 'DD.MM.YYYY')}
                </Normaltekst>
            )}
        </td>
    );

    if (isTransferredToOther) {
        return (
            <tr className={`ResultItem${isCopy ? ' copied' : ''}`}>
                {colUpdated}
                {colTitle}
                <td className="Col-id Col-transferred">
                    <Normaltekst className="ResultItem__column">
                        Overført til annen veileder.
                    </Normaltekst>
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
                {stilling.id && (
                    <Normaltekst className="ResultItem__column">{stilling.id}</Normaltekst>
                )}
            </td>
            <td className="Col-employer">
                <Normaltekst className="ResultItem__column Col-employer-inner">
                    {getEmployerName(stilling)}
                </Normaltekst>
            </td>
            <td className="Col-expires">
                {stilling.expires && (
                    <Normaltekst className="ResultItem__column">
                        {formatISOString(stilling.expires)}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-privacy">
                {stilling.privacy && (
                    <Normaltekst className="ResultItem__column">
                        {stilling.privacy === PrivacyStatusEnum.SHOW_ALL
                            ? 'Arbeidsplassen'
                            : 'Internt'}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-status">
                {stilling.status && (
                    <Normaltekst className="ResultItem__column">
                        {getAdStatusLabel(stilling.status, stilling.deactivatedByExpiry!)}
                    </Normaltekst>
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
                <MedPopover
                    className="Inner__button"
                    onPopoverClick={onDropdownClick}
                    hjelpetekst={
                        <ResultItemDropDown
                            stilling={stilling}
                            onToggleHjelpetekst={toggleHjelpetekst}
                        />
                    }
                >
                    <Hamburgerknapp aria-label="Meny for stilling" />
                </MedPopover>
            </td>
            <Popover
                ankerEl={hjelpetekst.anker}
                orientering={PopoverOrientering.Venstre}
                onRequestClose={lukkHjelpetekst}
            >
                <Normaltekst className="ResultItem__hjelpetekst">{hjelpetekst.tekst}</Normaltekst>
            </Popover>
        </tr>
    );
};

export default ResultItem;
