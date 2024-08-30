import { ThunkAction } from 'redux-thunk';
import { RootState } from '../redux/hooks';
import { AnyAction } from 'redux';
import { makeAPIRequest } from '../utils/apiGlobal';
import { POST, api } from '../utils/apiConstants';
import { getAsyncToken, setAsyncToken, setAsyncUserInfo } from '../utils/asyncStorageManager';
import { errorToast, successToast } from '../utils/commonFunction';

export const userLogin =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
      };
      return makeAPIRequest({
        method: POST,
        url: api.login,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response?.data?.data) {
            await setAsyncToken(response?.data?.data?.token);
            await setAsyncUserInfo(response?.data?.data?.user);
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            if (request.onFailure) request.onFailure(response.data);
          }
        })
        .catch(error => {
          console.log('error?.response?.data', error?.response?.data);

          if (request.onFailure) request.onFailure(error?.response?.data);
        });
    };

export const userSignUp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
      };
      return makeAPIRequest({
        method: POST,
        url: api.register,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response.status === 200 || response.status === 201) {
            await setAsyncToken(response?.data?.data?.token);
            await setAsyncUserInfo(response?.data?.data?.user);
            if (request.onSuccess) request.onSuccess(response.data);
          }
        })
        .catch(error => {
          if (request.onFailure) request.onFailure(error.response);
        });
    };

export const studentUserSignUp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
      };
      return makeAPIRequest({
        method: POST,
        url: api.studentRegister,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response?.data?.success) {
            await setAsyncToken(response?.data?.data?.token);
            await setAsyncUserInfo(response?.data?.data?.user);
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            if (request.onFailure) request.onFailure(response.data);
          }
        })
        .catch(error => {
          if (request.onFailure) request.onFailure(error?.response?.data);
        });
    };

export const canteenRegisterSignUp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
      };
      return makeAPIRequest({
        method: POST,
        url: api.canteenRegister,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response?.data?.success) {
            await setAsyncToken(response?.data?.data?.token);
            await setAsyncUserInfo(response?.data?.data?.user);
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            if (request.onFailure) request.onFailure(response.data);
          }
        })
        .catch(error => {
          if (request.onFailure) request.onFailure(error?.response?.data);
        });
    };

export const sendForgotEmail =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'application/json',
      };
      return makeAPIRequest({
        method: POST,
        url: api.forgotEmail,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response.status === 200) {
            if (request.onSuccess) request.onSuccess(response.data);
            successToast(response?.data?.message);
          }
        })
        .catch(error => {
          errorToast('User not found');
          if (request.onFailure) request.onFailure(error.response);
        });
    };
export const sendEmailOtp =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'application/json',
      };
      return makeAPIRequest({
        method: POST,
        url: api.sendEmailOtp,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response.status === 200) {
            if (request.onSuccess) request.onSuccess(response.data);
          }
        })
        .catch(error => {
          errorToast('User not found');
          if (request.onFailure) request.onFailure(error.response);
        });
    };

export const updatePassword =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: await getAsyncToken(),
      };
      return makeAPIRequest({
        method: POST,
        url: api.updatePasswords,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response.status === 200) {
            if (request.onSuccess) request.onSuccess(response.data);
            successToast(response?.data?.message);
          }
        })
        .catch(error => {
          errorToast('User not found');
          if (request.onFailure) request.onFailure(error.response);
        });
    };

export const googleEmailAction =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'application/json',
      };
      return makeAPIRequest({
        method: POST,
        url: api.googleEmail,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response?.data?.success === true) {
            await setAsyncToken(response?.data?.data?.token);
            await setAsyncUserInfo(response?.data?.data?.user);
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            if (request.onFailure) request.onFailure(response.data);
          }
        })
        .catch(error => {
          errorToast('User not found');
          if (request.onFailure) request.onFailure(error.response);
        });
    };

export const updateProfile =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
      let headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: await getAsyncToken(),
      };
      return makeAPIRequest({
        method: POST,
        url: api.updateProfile,
        headers: headers,
        data: request.data,
      })
        .then(async (response: any) => {
          if (response?.data?.data) {
            await setAsyncUserInfo(response?.data?.data?.user);
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            if (request.onFailure) request.onFailure(response.data);
          }
        })
        .catch(error => {
          errorToast('User not found');
          if (request.onFailure) request.onFailure(error.response);
        });
    };
