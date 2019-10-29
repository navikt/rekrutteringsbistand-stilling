import { put, select, takeLatest } from 'redux-saga/effects';
import {  ApiError, fetchDelete, fetchPost, fetchPut, fetchRecruitment } from '../api/api';
import { AD_API, REKRUTTERING_API } from '../fasitProperties';

import {
    SET_NAV_IDENT_REKRUTTERING,
    SET_REKRUTTERING_DATA
} from './recruitmentDataReducer';

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
    console.log('getRecruitment', action, action.uuid)
    yield put({ type: FETCH_RECRUITMENT_BEGIN });
    try {
        const response = yield fetchRecruitment(action.uuid);
        const saveResponse = 
            response !== "" 
            ? response 
            : {
                overfoertTil: undefined,
                stillingUuid: action.uuid
            } 

        console.log('response', saveResponse)

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
        let postUrl = REKRUTTERING_API;
        console.log('post', postUrl, state)
        const response = yield fetchPost(postUrl, state.recruitmentData);
        console.log('saveRecruitment response', response)
        yield put({ type: SAVE_RECRUITMENT_SUCCESS, response });
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