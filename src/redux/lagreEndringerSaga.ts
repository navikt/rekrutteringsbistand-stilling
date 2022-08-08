import { takeLatest } from 'redux-saga/effects';
import * as adActions from '../stilling/adDataReducer';
import { SAVE_AD_SUCCESS } from '../stilling/adReducer';
import { SET_NOTAT } from '../stillingsinfo/stillingsinfoDataReducer';
import {
    lagreStillingsendringerILocalStorage,
    slettStillingsendringerFraLocalStorage,
} from './localStorage';

export function* lagreEndringerSaga() {
    yield takeLatest(
        [
            SET_NOTAT,
            adActions.SET_STYRK,
            adActions.ADD_LOCATION_AREA,
            adActions.ADD_POSTAL_CODE_BEGIN,
            adActions.ADD_POSTAL_CODE_ADDRESS_BEGIN,
            adActions.ADD_POSTAL_CODE,
            adActions.REMOVE_MUNICIPAL,
            adActions.REMOVE_COUNTRY,
            adActions.REMOVE_COUNTY,
            adActions.REMOVE_LOCATION_AREAS,
            adActions.REMOVE_POSTAL_CODE,
            adActions.REMOVE_POSTAL_CODE_ADDRESS,
            adActions.SET_EMPLOYMENT_JOBTITLE,
            adActions.SET_EMPLOYMENT_LOCATION,
            adActions.SET_EMPLOYMENT_ENGAGEMENTTYPE,
            adActions.SET_EMPLOYMENT_EXTENT,
            adActions.SET_EMPLOYMENT_POSITIONCOUNT,
            adActions.SET_EMPLOYMENT_SECTOR,
            adActions.CHECK_EMPLOYMENT_WORKDAY,
            adActions.UNCHECK_EMPLOYMENT_WORKDAY,
            adActions.CHECK_EMPLOYMENT_WORKHOURS,
            adActions.UNCHECK_EMPLOYMENT_WORKHOURS,
            adActions.SET_EMPLOYMENT_JOBARRANGEMENT,
            adActions.SET_EMPLOYMENT_STARTTIME,
            adActions.SET_APPLICATIONDUE,
            adActions.SET_APPLICATIONEMAIL,
            adActions.SET_APPLICATIONURL,
            adActions.SET_SOURCEURL,
            adActions.SET_EMPLOYER,
            adActions.SET_EMPLOYER_NAME,
            adActions.SET_EMPLOYER_HOMEPAGE,
            adActions.SET_EMPLOYERDESCRIPTION,
            adActions.SET_FACEBOOK_PAGE,
            adActions.SET_LINKEDIN_PAGE,
            adActions.SET_TWITTER_ADDRESS,
            adActions.SET_PUBLISHED,
            adActions.SET_FIRST_PUBLISHED,
            adActions.SET_LAST_UPDATED,
            adActions.SET_MEDIUM,
            adActions.SET_ID,
            adActions.SET_REFERENCE,
            adActions.SET_EXPIRATION_DATE,
            adActions.SET_AD_TEXT,
            adActions.SET_AD_STATUS,
            adActions.SET_ADMIN_STATUS,
            adActions.SET_AD_TITLE,
            adActions.SET_REPORTEE,
            adActions.SET_NAV_IDENT,
            adActions.SET_UPDATED_BY,
            adActions.SET_PRIVACY,
            adActions.CHECK_TAG,
            adActions.UNCHECK_TAG,
            adActions.SET_TAGS,
            adActions.SET_CONTACT_PERSON,
        ],
        lagreStillingsendringerILocalStorage
    );
    yield takeLatest([SAVE_AD_SUCCESS], slettStillingsendringerFraLocalStorage);
}
