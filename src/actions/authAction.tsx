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
        if (response.status === 200 || response.status === 201) {
          console.log('response?.data?.token',response?.data?.data?.token);

          await setAsyncToken(response?.data?.data?.token);
          await setAsyncUserInfo(response?.data?.data?.user);
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
      url: api.register,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          dispatch({type: IS_LOADING, payload: false});
          await setAsyncToken(response?.data?.data?.token);
          await setAsyncUserInfo(response?.data?.data?.user);
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };
