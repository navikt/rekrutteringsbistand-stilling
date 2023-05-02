import { AdminStatus, Status } from '../../Stilling';
import PrivacyStatusEnum from './PrivacyStatusEnum';

export function getAdStatusLabel(adStatus: Status, deactivatedByExpiry = false) {
    if (adStatus === Status.Aktiv) {
        return 'Publisert';
    }
    if (adStatus === Status.Inaktiv && deactivatedByExpiry) {
        return 'Utløpt';
    }
    if (adStatus === Status.Inaktiv) {
        return 'Ikke publisert';
    }
    if (adStatus === Status.Avslått) {
        return 'Avvist';
    }
    if (adStatus === Status.Stoppet) {
        return 'Stoppet';
    }
    if (adStatus === Status.Slettet) {
        return 'Slettet';
    }
    return '';
}

export function getAdminStatusLabel(adminStatus: AdminStatus) {
    if (adminStatus === AdminStatus.Received) {
        return 'Ny';
    }
    if (adminStatus === AdminStatus.Pending) {
        return 'Under arbeid';
    }
    if (adminStatus === AdminStatus.Done) {
        return 'Ferdig';
    }
    return '';
}

export function getPrivacyStatusLabel(privacyStatus) {
    if (privacyStatus === PrivacyStatusEnum.INTERNAL_NOT_SHOWN) {
        return 'Internt i NAV';
    }
    if (privacyStatus === PrivacyStatusEnum.SHOW_ALL) {
        return 'Arbeidsplassen';
    }

    return '';
}
