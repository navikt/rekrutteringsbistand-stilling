import { sendEvent } from '../amplitude';
import { VIS_STILLING_URL } from '../fasitProperties';

export const stillingErPublisert = (ad: any) => {
    if (ad.status === 'INACTIVE' && ad.deactivatedByExpiry === false) {
        return false;
    }

    return true;
};

export const hentAnnonselenke = (uuid: string) => `${VIS_STILLING_URL}/${uuid}`;

export const loggPubliseringAvStillingMedTilretteleggingsmuligheter = (
    stillingsId: string,
    alleTagsPåStilling: string[]
) => {
    const tilretteleggingsmuligheter = alleTagsPåStilling.filter((tag) =>
        tag.startsWith('INKLUDERING')
    );

    if (
        tilretteleggingsmuligheter.length > 0 &&
        loggPubliseringAvStillingMedTilretteleggingsmuligheter
    ) {
        sendEvent('stilling', 'publiser_stilling_med_tilretteleggingsmuligheter', {
            stillingsId,
            tilretteleggingsmuligheter,
        });
    }
};
