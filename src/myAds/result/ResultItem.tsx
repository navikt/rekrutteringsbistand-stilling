import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import getEmployerName from '../../common/getEmployerName';
import { formatISOString } from '../../utils';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import AWithIcon from '../../common/aWithIcon/AWithIcon';
import './Icons.less';
import './Result.less';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import ResultItemDropDown from './ResultItemDropDown';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../../ad/Ad';
import MedPopover from '../../common/med-popover/MedPopover';
import { Hamburgerknapp } from 'nav-frontend-ikonknapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { FunctionComponent } from 'react';
import { Rekrutteringsbistandstilling } from '../../Stilling';
import State from '../../State';

type Props = {
    rekrutteringsbistandstilling: Rekrutteringsbistandstilling;
    copiedAds: string[];
    reportee: any;
};

const ResultItem: FunctionComponent<Props> = ({
    rekrutteringsbistandstilling,
    copiedAds,
    reportee,
}) => {
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
                        {getAdStatusLabel(stilling.status, stilling.deactivatedByExpiry)}
                    </Normaltekst>
                )}
            </td>
            <td className="Col-candidate">
                <AWithIcon
                    href={`/kandidater/lister/stilling/${stilling.uuid}/detaljer`}
                    classNameText="typo-normal"
                    classNameLink="CandidateList"
                    text="Se kandidatliste"
                />
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

const mapStateToProps = (state: State) => ({
    copiedAds: state.ad.copiedAds,
});

export default connect(mapStateToProps)(ResultItem);
