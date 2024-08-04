import {ThunkAction} from 'redux-thunk';
import {RootState} from '../redux/hooks';
import {AnyAction} from 'redux';
import {makeAPIRequest} from '../utils/apiGlobal';
import {DELETE, GET, POST, PUT, api} from '../utils/apiConstants';
import {DELETE_CUISINES_DATA, GET_CITY_DATA, GET_CUISINES_DATA, IS_LOADING, USER_INFO} from '../redux/actionTypes';
import { getAsyncToken } from '../utils/asyncStorageManager';

export const getCuisinesAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    
    let headers = {
      "Authorization":await getAsyncToken(),

    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: GET,
      url: api.getCuisines,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {                    
          dispatch({type: GET_CUISINES_DATA, payload: response?.data?.data});
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const addCuisinesAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    
    let headers = {
      "Authorization":await getAsyncToken(),
      'Content-Type': 'multipart/form-data',
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: POST,
      url: api.getCuisines,
      headers: headers,
      data:request.data
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {                    
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };

  export const editCuisinesAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    
    let headers = {
      "Authorization":await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    return makeAPIRequest({
      method: PUT,
      url: `${api.getCuisines}/${request?.id}`,
      headers: headers,
      data:request.data
    })
      .then(async (response: any) => {
        if (response.status === 200 || response.status === 201) {                    
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };

  export const deleteCuisinesAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({type: IS_LOADING, payload: true});
    console.log('request.data',request.data);
    
    return makeAPIRequest({
      method: DELETE,
      url: `${api.getCuisines}/${request.data}`,
      headers: headers,
    })
      .then(async (response: any) => {
        
        if (response.status === 200 || response.status === 201) {
          dispatch({type: DELETE_CUISINES_DATA, payload: request.data});
          dispatch({type: IS_LOADING, payload: false});
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch(error => {        
        dispatch({type: IS_LOADING, payload: false});
        if (request.onFailure) request.onFailure(error.response);
      });
  };