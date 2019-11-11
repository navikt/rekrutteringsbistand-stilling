import { put, select, takeLatest } from 'redux-saga/effects';
import {  ApiError, fetchPost, fetchPut, fetchRecruitment } from '../api/api';
import { REKRUTTERING_API } from '../fasitProperties';

import {
    SET_REKRUTTERING_DATA
} from './recruitmentDataReducer';
import { showAlertStripe } from '../ad/alertstripe/SavedAdAlertStripeReducer';
import AdAlertStripeEnum from '../ad/alertstripe/AdAlertStripeEnum';
export const FETCH_RECRUITMENT = 'FETCH_RECRUITMENT';
export const FETCH_RECRUITMENT_BEGIN = 'FETCH_RECRUITMENT_BEGIN';
export const FETCH_RECRUITMENT_SUCCESS = 'FETCH_RECRUITMENT_SUCCESS';
export const FETCH_RECRUITMENT_FAILURE = 'FETCH_RECRUITMENT_FAILURE';

export const SAVE_RECRUITMENT = 'SAVE_RECRUITMENT';
export const SAVE_RECRUITMENT_BEGIN = 'SAVE_RECRUITMENT_BEGIN';
export const SAVE_RECRUITMENT_SUCCESS = 'SAVE_RECRUITMENT_SUCCESS';
export const SAVE_RECRUITMENT_FAILURE = 'SAVE_RECRUITMENT_FAILURE';

const initialState = {
    isSavingRecruitment: false,
    hasSavedRecruitment: false,
    isLoadingRecruitment: false
}

export default function recruitmentReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RECRUITMENT_BEGIN:
            return {
                ...state,
                hasSavedRecruitment: false,
                isLoadingRecruitment: true
            }
        case FETCH_RECRUITMENT_SUCCESS:
                return {
                    ...state,
                    isLoadingRecruitment: false
                }
        case FETCH_RECRUITMENT_FAILURE:
                return {
                    ...state,
                    error: action.error,
                    isLoadingRecruitment: false
                }
        case SAVE_RECRUITMENT_BEGIN:
            return {
                ...state,
                isSavingRecruitment: true,
                hasSavedRecruitment: false
            }
        case SAVE_RECRUITMENT_FAILURE:
            return {
                ...state,
                isSavingRecruitment: false,
                error: action.error,
                hasSavedRecruitment: false
            }
        case SAVE_RECRUITMENT_SUCCESS:
            return {
                ...state,
                isSavingRecruitment: false,
                hasSavedRecruitment: true
            }
        default:
            return state 
    }
}


function* getRecruitment(action) {
    yield put({ type: FETCH_RECRUITMENT_BEGIN });
    try {
        const response = action.rekruttering;
        const saveResponse = 
            response !== null 
            ? response 
            : {
                eierIdent: undefined,
                eierNavn: undefined,
                stillingUuid: action.uuid
            } 

        yield put({ type: FETCH_RECRUITMENT_SUCCESS });
        yield put({ type: SET_REKRUTTERING_DATA, data:saveResponse })

    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_RECRUITMENT_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* saveRecruitment() {
    let state = yield select();
    yield put({ type: SAVE_RECRUITMENT_BEGIN });
    try {
        state = yield select();

        // Modified category list requires store/PUT with (re)classification
        const response = state.recruitmentData.rekrutteringUuid
            ? yield fetchPut(REKRUTTERING_API, state.recruitmentData)
            : yield fetchPost(REKRUTTERING_API, state.recruitmentData);
        
        yield put({ type: SET_REKRUTTERING_DATA, data:response })
        yield put({ type: SAVE_RECRUITMENT_SUCCESS, response });
        yield showAlertStripe(AdAlertStripeEnum.TRANSFERRED);
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: SAVE_RECRUITMENT_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const recruitmentSaga = function* saga() {
    yield takeLatest(FETCH_RECRUITMENT, getRecruitment);
    yield takeLatest(SAVE_RECRUITMENT, saveRecruitment);
}