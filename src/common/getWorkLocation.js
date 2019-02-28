import capitalizeLocation from '../ad/edit/location/capitalizeLocation';

export default function getWorkLocation(locationList, hidePostAddress = false) {
    let workLocation = null;
    if (locationList && locationList.length > 0) {
        const location = locationList[0];
        if (location.city && hidePostAddress) {
            workLocation = capitalizeLocation(location.city);
        } else if (location.postalCode) {
            workLocation = location.address ? `${location.address}, ` : '';
            workLocation += `${location.postalCode} ${capitalizeLocation(location.city)}`;
        } else if (location.municipal) {
            workLocation = `${capitalizeLocation(location.municipal)}`;
        } else if (location.county) {
            workLocation = `${capitalizeLocation(location.county)}`;
        } else if (location.country) {
            workLocation = `${capitalizeLocation(location.country)}`;
        }

        if (locationList.length > 1) {
            workLocation += '...';
        }
    }
    return workLocation;
}


export function getLocationsAsString(locationList) {
    const workLocations = [];
    let tmp;
    if (!locationList) {
        return workLocations;
    }

    for (let i = 0; i < locationList.length; i += 1) {
        if (locationList[i].postalCode) {
            tmp = locationList[i].address ? `${locationList[i].address}, ` : '';
            tmp += `${locationList[i].postalCode} ${capitalizeLocation(locationList[i].city)}`;
            workLocations.push(tmp);
        } else if (locationList[i].municipal) {
            tmp = `, ${capitalizeLocation(locationList[i].municipal)}`;
            workLocations.push(tmp);
        } else if (locationList[i].county) {
            tmp = `, ${capitalizeLocation(locationList[i].county)}`;
            workLocations.push(tmp);
        } else if (locationList[i].country) {
            tmp = `, ${capitalizeLocation(locationList[i].country)}`;
            workLocations.push(tmp);
        }
    }
    return workLocations;
}
