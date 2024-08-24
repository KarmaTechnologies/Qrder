import {ThunkAction} from 'redux-thunk';
import {RootState} from '../redux/hooks';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {DELETE, GET, POST, api} from '../utils/apiConstants';
import {DELETE_MENU_DATA, GET_EMPTY_MENU_LIST, GET_MENU_DATA, IS_LOADING, USER_INFO} from '../redux/actionTypes';
import {
  getAsyncToken,
  setAsyncToken,
  setAsyncUserInfo,
} from '../utils/asyncStorageManager';
import {successToast} from '../utils/commonFunction';

export const getMenuAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: GET,
      url: api.getMenu,
      headers: headers,
      params:request.data
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          console.log('response?.data', response?.data);
          let Data = {...response?.data?.data, current_page: request?.data?.page}
          dispatch({type: GET_MENU_DATA, payload:Data});

          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const addMenuAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: POST,
      url: api.getMenu,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response?.data?.success) {
          successToast(response?.data?.message);
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }else{
          if (request.onFailure) request.onFailure(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error?.response?.data);
      });
  };

export const getCuisinesMenuListAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: GET,
      url: `${api.getCuisinesMenuList}/${request.id}`,
      headers: headers,
      params:request?.data
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          console.log("getCuisinesMenuListAction=-=+++",response?.data?.data)
          dispatch({type: GET_MENU_DATA, payload:{...response?.data?.data, current_page: request?.data?.page}});

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

export const deleteMenuAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: DELETE,
      url: `${api.getMenu}/${request.data}`,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {
          console.log('response?.data?.token', response);
          dispatch({type: DELETE_MENU_DATA, payload: request.data});
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };