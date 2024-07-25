import {ThunkAction} from 'redux-thunk';
import {RootState} from '../redux/hooks';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {GET, POST, api} from '../utils/apiConstants';
import {
  GET_CHEFS_DATA,
  GET_CITY_DATA,
  GET_CUISINES_DATA,
  IS_LOADING,
  USER_INFO,
} from '../redux/actionTypes';
import {getAsyncToken} from '../utils/asyncStorageManager';
import { successToast } from '../utils/commonFunction';

export const getChefsAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: GET,
      url: api.getChefs,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          dispatch({type: GET_CHEFS_DATA, payload: response?.data?.data});
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };

  export const chefsSignUp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: POST,
      url: api.chefsRegister,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          dispatch({type: IS_LOADING, payload: false});
          successToast(response?.data?.message)
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };