import AdStatusEnum from './AdStatusEnum';
import AdminStatusEnum from './AdminStatusEnum';
import PrivacyStatusEnum from './PrivacyStatusEnum';

export function getAdStatusLabel(adStatus, deactivatedByExpiry = false) {
    if (adStatus === AdStatusEnum.ACTIVE) {
        return 'Publisert';
    }
    if (adStatus === AdStatusEnum.INACTIVE && deactivatedByExpiry) {
        return 'Utløpt';
    }
    if (adStatus === AdStatusEnum.INACTIVE) {
        return 'Ikke publisert';
    }
    if (adStatus === AdStatusEnum.REJECTED) {
        return 'Avvist';
    }
    if (adStatus === AdStatusEnum.STOPPED) {
        return 'Stoppet';
    }
    if (adStatus === AdStatusEnum.DELETED) {
        return 'Slettet';
    }
    return '';
}

export function getAdminStatusLabel(adminStatus) {
    if (adminStatus === AdminStatusEnum.RECEIVED) {
        return 'Ny';
    }
    if (adminStatus === AdminStatusEnum.PENDING) {
        return 'Under arbeid';
    }
    if (adminStatus === AdminStatusEnum.DONE) {
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
