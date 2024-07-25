import { ThunkAction } from 'redux-thunk';
import { RootState } from '../redux/hooks';
import { AnyAction } from 'redux';
import { makeAPIRequest } from '../utils/apiGlobal';
import { GET, POST, api } from '../utils/apiConstants';
import { GET_CITY_DATA, IS_LOADING, SEARCH_CITY, SELECT_ROLE, USER_INFO } from '../redux/actionTypes';
import { setAsyncToken, setAsyncUserInfo } from '../utils/asyncStorageManager';

export const getCityAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {};
      dispatch({ type: IS_LOADING, payload: true });
      return makeAPIRequest({
        method: GET,
        url: api.get_cities,
        headers: headers,
      })
        .then(async (response: any) => {
          if (response.status === 200 || response.status === 201) {
            console.log('response?.data', response?.data?.data);

            dispatch({ type: GET_CITY_DATA, payload: response?.data?.data });
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

export const userSignUp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
      };
      dispatch({ type: IS_LOADING, payload: true });
      return makeAPIRequest({
        method: POST,
        url: api.register,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response.status === 200 || response.status === 201) {
            dispatch({ type: IS_LOADING, payload: false });
            await setAsyncToken(response?.data?.data?.token);
            await setAsyncUserInfo(response?.data?.data?.user);
            if (request.onSuccess) request.onSuccess(response.data);
          }
        })
        .catch(error => {
          dispatch({ type: IS_LOADING, payload: false });
          if (request.onFailure) request.onFailure(error.response);
        });
    };


export const searchCities =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
      };
      dispatch({ type: IS_LOADING, payload: true });
      return makeAPIRequest({
        method: GET,
        url: `${api.search_cities}/${request.data}`,
        headers: headers,
      })
        .then(async (response: any) => {
          if (response.status === 200 || response.status === 201) {
            dispatch({ type: IS_LOADING, payload: false });
            dispatch({ type: SEARCH_CITY, payload: response?.data });
            if (request.onSuccess) request.onSuccess(response.data);
          }
        })
        .catch(error => {
          dispatch({ type: IS_LOADING, payload: false });
          if (request.onFailure) request.onFailure(error.response);
        });
    };

export const selectRoleAction =
  (data: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    dispatch => {
      dispatch({
        type: SELECT_ROLE,
        payload: data,
      });
    };
