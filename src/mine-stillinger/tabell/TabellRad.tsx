import React, { FunctionComponent } from 'react';
import { BodyShort, Button, Table } from '@navikt/ds-react';
import { Rekrutteringsbistandstilling } from '../../Stilling';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { formatISOString } from '../../utils/datoUtils';
import { Link } from 'react-router-dom';
import PrivacyStatusEnum from '../../common/enums/PrivacyStatusEnum';
import { getAdStatusLabel } from '../../common/enums/getEnumLabels';
import { MenuElipsisHorizontalCircleIcon, PencilIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../../stilling/Stilling';
import { Dropdown } from '@navikt/ds-react-internal';
import DropdownMeny from './DropdownMeny';
import getEmployerName from '../../common/getEmployerName';

type Props = {
    rekrutteringsbistandstilling: Rekrutteringsbistandstilling;
};

const TabellRad: FunctionComponent<Props> = ({ rekrutteringsbistandstilling }) => {
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
        <Table.DataCell>
            <Link className="navds-link" to={`/stillinger/stilling/${stilling.uuid}`}>
                {isCopy
                    ? (
                          <div>
                              <b>{stilling.title.substr(0, 5)}</b>
                              {stilling.title.substr(5)}
                          </div>
                      ) || ''
                    : stilling.title || ''}
            </Link>
        </Table.DataCell>
    );

    const colUpdated = (
        <Table.DataCell>
            {stilling.updated && (
                <BodyShort className="ResultItem__column">
                    {formatISOString(stilling.updated, 'DD.MM.YYYY')}
                </BodyShort>
            )}
        </Table.DataCell>
    );

    if (isTransferredToOther) {
        return (
            <Table.Row>
                {colUpdated}
                {colTitle}
                <Table.DataCell>
                    <BodyShort>Overført til annen veileder.</BodyShort>
                </Table.DataCell>
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
                <Table.DataCell />
            </Table.Row>
        );
    }

    return (
        <Table.Row>
            {colUpdated}
            {colTitle}
            <Table.DataCell>{stilling.id && <BodyShort>{stilling.id}</BodyShort>}</Table.DataCell>
            <Table.DataCell>
                <BodyShort className="ResultItem__column Col-employer-inner">
                    {getEmployerName(stilling)}
                </BodyShort>
            </Table.DataCell>
            <Table.DataCell>
                {stilling.expires && <BodyShort>{formatISOString(stilling.expires)}</BodyShort>}
            </Table.DataCell>
            <Table.DataCell>
                {stilling.privacy && (
                    <BodyShort className="ResultItem__column">
                        {stilling.privacy === PrivacyStatusEnum.SHOW_ALL
                            ? 'Arbeidsplassen'
                            : 'Internt'}
                    </BodyShort>
                )}
            </Table.DataCell>
            <Table.DataCell>
                {stilling.status && (
                    <BodyShort className="ResultItem__column">
                        {getAdStatusLabel(stilling.status, stilling.deactivatedByExpiry!)}
                    </BodyShort>
                )}
            </Table.DataCell>
            <Table.DataCell>
                {stilling.publishedByAdmin && (
                    <Link
                        to={`/kandidater/lister/stilling/${stilling.uuid}/detaljer`}
                        className="navds-link"
                    >
                        <BodyShort>
                            <PersonGroupIcon />
                            Se kandidatliste
                        </BodyShort>
                    </Link>
                )}
            </Table.DataCell>
            <Table.DataCell>
                <Link
                    to={`/stillinger/stilling/${stilling.uuid}?${REDIGERINGSMODUS_QUERY_PARAM}=true`}
                    className="navds-link"
                >
                    <Button variant="tertiary" as="div" icon={<PencilIcon />} />
                </Link>
            </Table.DataCell>
            <Table.DataCell>
                <Dropdown closeOnSelect={false}>
                    <Button
                        as={Dropdown.Toggle}
                        variant="tertiary"
                        icon={<MenuElipsisHorizontalCircleIcon />}
                        aria-label="Meny for stilling"
                    />
                    <Dropdown.Menu>
                        <DropdownMeny stilling={stilling} />
                    </Dropdown.Menu>
                </Dropdown>
            </Table.DataCell>
        </Table.Row>
    );
};

export default TabellRad;
