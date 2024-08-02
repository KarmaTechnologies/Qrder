import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {RootState} from '../redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_APP_LANGUAGE, SET_APP_THEME} from '../redux/actionTypes';
import {asyncKeys} from './asyncStorageManager';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import I18n from '../i18n/i18n';

export const setDarkTheme =
  (data: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    AsyncStorage.setItem(asyncKeys.is_dark_theme, JSON.stringify(data));
    dispatch({
      type: SET_APP_THEME,
      payload: data,
    });
  };

  export const setLanguage =
  (data: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    await AsyncStorage.setItem(asyncKeys.is_language, data);
    I18n.locale = data;
    dispatch({
      type: SET_APP_LANGUAGE,
      payload: data,
    });
  };


export type ImagePickerProps = {
  params?: object;
  onSucess: (params: object) => void;
  onFail?: (params: {message: string}) => void | undefined;
};

export const openImagePicker = ({
  params,
  onSucess,
  onFail,
}: ImagePickerProps) => {
  try {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      mediaType: 'photo',
      ...params,
    })
      .then(image => {
        let obj = {
          ...image,
          uri: image.path,
          name: 'image_' + moment().unix() + '_' + image.path.split('/').pop(),
        };
        onSucess(obj);
      })
      .catch(err => {
        onFail?.(err);
      });
  } catch (error) {}
};
