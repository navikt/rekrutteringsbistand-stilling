import { sendEvent } from '../amplitude';
import { VIS_STILLING_URL } from '../fasitProperties';

export const stillingErPublisert = (ad: any) => {
    if (ad.status === 'INACTIVE' && ad.deactivatedByExpiry === false) {
        return false;
    }

    return true;
};

export const hentAnnonselenke = (uuid: string) => `${VIS_STILLING_URL}/${uuid}`;

const loggInkluderingstagsHvisDefinert = (stillingsId: string, alleTags: string) => {
    try {
        const tags = JSON.parse(alleTags);
        if (Array.isArray(tags) && tags.length > 0) {
            sendEvent('stilling', 'publiser_stilling_med_inkluderingstags', {
                stillingsId,
                tags,
            });
        }
    } catch (e) {
        return null;
    }
};

export const loggPubliseringAvStilling = (stillingsId: string, alleTags: string) => {
    sendEvent('stilling', 'publiser_stilling');
    loggInkluderingstagsHvisDefinert(stillingsId, alleTags);
};

export const erDirektemeldtStilling = (source: string): boolean => source === 'DIR';
