import { ThunkAction } from 'redux-thunk';
import { RootState } from '../redux/hooks';
import { AnyAction } from 'redux';
import { makeAPIRequest } from '../utils/apiGlobal';
import { DELETE, GET, POST, PUT, api } from '../utils/apiConstants';
import { DELETE_CARD_LIST, GET_CARD_LIST, IS_LOADING, } from '../redux/actionTypes';
import {
    getAsyncToken,
} from '../utils/asyncStorageManager';
import { successToast } from '../utils/commonFunction';

export const addCardAction =
    (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
        async dispatch => {
            let headers = {
                Authorization: await getAsyncToken(),
            };
            return makeAPIRequest({
                method: POST,
                url: api.addCard,
                headers: headers,
                data: request.data,
            })
                .then(async (response: any) => {
                    if (response?.data?.status === 'success') {
                        successToast(response?.data?.message);
                        if (request.onSuccess) request.onSuccess(response.data);
                    } else {
                        if (request.onFailure) request.onFailure(response.data);
                    }
                })
                .catch(error => {
                    if (request.onFailure) request.onFailure(error?.response?.data);
                });
        };
export const getCardAction =
    (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
        async dispatch => {
            let headers = {
                Authorization: await getAsyncToken(),
            };
            return makeAPIRequest({
                method: GET,
                url: api.getCard,
                headers: headers,
                data: request.data,
            })
                .then(async (response: any) => {
                    if (response.status === 200 || response.status === 201) {
                        dispatch({ type: GET_CARD_LIST, payload: response?.data?.data });
                        if (request.onSuccess) request.onSuccess(response.data);
                    }
                })
                .catch(error => {
                    if (request.onFailure) request.onFailure(error.response);
                });
        };

export const deleteCardAction =
    (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
        async dispatch => {
            let headers = {
                Authorization: await getAsyncToken(),
            };
            return makeAPIRequest({
                method: DELETE,
                url: `${api.getCard}/${request.data}`,
                headers: headers,
            })
                .then(async (response: any) => {

                    if (response.status === 200 || response.status === 201) {
                        dispatch({ type: DELETE_CARD_LIST, payload: response?.data?.data });
                        if (request.onSuccess) request.onSuccess(response.data);
                    }
                })
                .catch(error => {
                    dispatch({ type: IS_LOADING, payload: false });
                    if (request.onFailure) request.onFailure(error.response);
                });
        };

export const updateQuantityAction =
    (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
        async dispatch => {
            let headers = {
                Authorization: await getAsyncToken(),
            };
            return makeAPIRequest({
                method: PUT,
                url: `${api.getCard}/${request.params}/quantity`,
                headers: headers,
                data: request.data,
            })
                .then(async (response: any) => {
                    if (response?.data) {
                        if (request.onSuccess) request.onSuccess(response.data);
                    } else {
                        if (request.onFailure) request.onFailure(response.data);
                    }
                })
                .catch(error => {
                    if (request.onFailure) request.onFailure(error?.response);
                });
        };