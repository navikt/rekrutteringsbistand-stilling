const VIS_STILLING_URL = (window as any).STILLING_VIS_STILLING_URL;

export const stillingErPublisert = (ad: any) => {
    if (ad.status === 'INACTIVE' && ad.deactivatedByExpiry === false) {
        return false;
    }

    return true;
};

export const hentAnnonselenke = (uuid: string) => `${VIS_STILLING_URL}/${uuid}`;

export const erDirektemeldtStilling = (source: string): boolean => source === 'DIR';
