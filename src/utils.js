const ISO_8601_DATE = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;

export function isValidISOString(isoString) {
    return ISO_8601_DATE.test(isoString);
}

export function toDate(isoString) {
    if (!isValidISOString(isoString)) {
        throw Error(`${isoString} is not a valid ISO 8601 date`);
    }
    return new Date(isoString);
}

export function formatISOString(isoString, format = 'DD.MM.YYYY') {
    try {
        if (isValidISOString(isoString)) {
            const dt = isoString.split('-');
            if (format === 'DD.MM.YYYY') {
                const day = dt[2].split('T')[0];
                return `${day}.${dt[1]}.${dt[0]}`;
            } else if (format === 'DD.MM.YYYY hh:mm') {
                const day = dt[2].split('T')[0];
                const time = dt[2].split('T')[1];
                return `${day}.${dt[1]}.${dt[0]} ${time.substr(0, 5)}`;
            }
            return isoString;
        }
    } catch (error) {
        return isoString;
    }
    return isoString;
}

export const leggTilTimerPåISOString = (datoString, antallTimerFraMidnatt) => {
    if (!datoString) return undefined;

    let dato = new Date(datoString);
    dato.setHours(antallTimerFraMidnatt);
    return dato.toISOString();
};

export const fjernTidspunktFraISOString = (dato) =>
    typeof dato === 'string' ? dato.split('T')[0] : null;

export const idagMidnatt = () => {
    const idag = new Date();
    idag.setHours(0);
    idag.setMinutes(0);
    idag.setSeconds(0);
    idag.setMilliseconds(0);
    return idag;
};

export default toDate;
