import {ThunkAction} from 'redux-thunk';
import {RootState} from '../redux/hooks';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {POST, api} from '../utils/apiConstants';
import {IS_LOADING, USER_INFO} from '../redux/actionTypes';
import {setAsyncToken, setAsyncUserInfo} from '../utils/asyncStorageManager';

export const userLogin =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: POST,
      url: api.login,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          console.log('token', response?.data?.token);
          await setAsyncToken(response?.data?.token);
          await setAsyncUserInfo(response?.data?.farmerData);
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
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
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: POST,
      url: api.login,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({type: IS_LOADING, payload: false});
          if (response.data.status) {
            setAsyncToken(response.data.data.auth_token);
            setAsyncUserInfo(response?.data?.data?.user?.[0]);
            dispatch({
              type: USER_INFO,
              payload: {...response?.data?.data?.user?.[0], isGuest: false},
            });
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            // errorToast(response.data.message);
          }
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const getOtp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: POST,
      url: api.getOtp,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 && response.data.error == false) {
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        } else {
          dispatch({type: IS_LOADING, payload: false});
          if (request.onFailure) request.onFailure(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const verifyOtp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: POST,
      url: api.verifyOtp,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 && response.data.error == false) {
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        } else {
          dispatch({type: IS_LOADING, payload: false});
          if (request.onFailure) request.onFailure(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };
