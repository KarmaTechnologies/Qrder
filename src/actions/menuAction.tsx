import { ThunkAction } from 'redux-thunk';
import { RootState } from '../redux/hooks';
import { AnyAction } from 'redux';
import { makeAPIRequest } from '../utils/apiGlobal';
import { GET, POST, api } from '../utils/apiConstants';
import { GET_MENU_DATA, IS_LOADING, USER_INFO } from '../redux/actionTypes';
import {
  getAsyncToken,
  setAsyncToken,
  setAsyncUserInfo,
} from '../utils/asyncStorageManager';
import { successToast } from '../utils/commonFunction';

export const getMenuAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        Authorization: await getAsyncToken(),
      };
      dispatch({ type: IS_LOADING, payload: true });
      return makeAPIRequest({
        method: GET,
        url: api.getMenu,
        headers: headers,
      })
        .then(async (response: any) => {
          if (response.status === 200 || response.status === 201) {
            console.log('response?.data', response?.data?.data);
            dispatch({ type: GET_MENU_DATA, payload: response?.data?.data });
            dispatch({ type: IS_LOADING, payload: false });
            if (request.onSuccess) request.onSuccess(response.data);
          }
        })
        .catch(error => {
          dispatch({ type: IS_LOADING, payload: false });
          if (request.onFailure) request.onFailure(error.response);
          // errorToast('your account has been logged in on another device.');
        });
    };

export const addMenuAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: await getAsyncToken(),
      };
      dispatch({ type: IS_LOADING, payload: true });
      return makeAPIRequest({
        method: POST,
        url: api.getMenu,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response.status === 200 || response.status === 201) {
            console.log('response?.data?.token', response);
            successToast(response?.data?.message)
            dispatch({ type: IS_LOADING, payload: false });
            if (request.onSuccess) request.onSuccess(response.data);
          }
        })
        .catch(error => {
          dispatch({ type: IS_LOADING, payload: false });
          if (request.onFailure) request.onFailure(error.response);
        });
    };

export const getCuisinesMenuList =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        Authorization: await getAsyncToken(),
      };
      dispatch({ type: IS_LOADING, payload: true });
      return makeAPIRequest({
        method: GET,
        url: `${api.getCuisinesMenuList}/${request.data}`,
        headers: headers,
      })
        .then(async (response: any) => {
          if (response.status === 200 || response.status === 201) {
            dispatch({ type: GET_MENU_DATA, payload: response?.data?.data });
            dispatch({ type: IS_LOADING, payload: false });
            if (request.onSuccess) request.onSuccess(response.data);
          }
        })
        .catch(error => {
          dispatch({ type: IS_LOADING, payload: false });
          if (request.onFailure) request.onFailure(error.response);
          // errorToast('your account has been logged in on another device.');
        });
    };
