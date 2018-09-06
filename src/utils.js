export const months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september',
    'oktober', 'november', 'desember'];

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

export function formatISOString(isoString, format = 'D. MMMM YYYY') {
    if (isValidISOString(isoString)) {
        try {
            const dt = isoString.split('-');
            const year = dt[0];
            const month = dt[1];
            const monthName = months[month - 1];
            const dayAndTime = dt[2].split('T');
            const day = dayAndTime[0];
            const dayWithoutZero = day.substring(0, 1) === '0' ? day.substring(1) : day;
            const time = dayAndTime[1].split(':');
            const hours = time[0];
            const mins = time[1];
            if (format === 'D. MMMM YYYY') {
                return `${dayWithoutZero}. ${monthName} ${year}`;
            } else if (format === 'D. MMMM HH:MM') {
                return `${dayWithoutZero}. ${monthName} ${hours}:${mins}`;
            } else if (format === 'D. MMMM YYYY HH:MM') {
                return `${dayWithoutZero}. ${monthName} ${year} ${hours}:${mins}`;
            } else if (format === 'DD.MM.YY HH:MM') {
                return `${day}.${month}.${year} ${hours}:${mins}`;
            } else if (format === 'DD.MM.YY') {
                return `${day}.${month}.${year}`;
            }
            return isoString;
        } catch (e) {
            return isoString;
        }
    }
    return isoString;
}

export default toDate;