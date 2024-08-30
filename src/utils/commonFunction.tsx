import Toast from 'react-native-toast-message';
import { navigationRef } from '../navigation/mainNavigator';
import Snackbar from 'react-native-snackbar';
import { strings } from '../i18n/i18n';

export const emailCheck = (email: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};
export const numberCheck = (string: string) => {
  let reg = /^(?=.*[0-9]).+$/;
  return reg.test(string);
};

export const specialCarCheck = (string: string) => {
  let reg = /^(?=.*[!@#$%^&*()]).+$/;
  return reg.test(string);
};

export const UpperCaseCheck = (string: string) => {
  let reg = /^(?=.*[A-Z]).+$/;
  return reg.test(string);
};

export const nameCheck = (name: string) => {
  let reg = /^([a-zA-Z ]){2,30}$/;
  if (reg.test(name) === false) {
    return false;
  } else {
    return true;
  }
};

export const passwordCheck = (string: string) => {
  let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return reg.test(string);
};

export const resetNavigation = (name: string, params?: any) => {
  navigationRef.reset({
    index: 0,
    routes: [{ name: name }],
  });
};

export const successToast = (message: string) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: 'green',
  });
};

export const errorToast = (message: string) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: '#FF0000',
  });
};

export const infoToast = (message: string) => {
  // Toast.show({type: 'info', text1: message});
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: '#000',
  });
};

export const DropDownData = [
  {
    name: strings('roleSelection.owner'),
    value:'Admin',
    id: 1,
  },
  {
    name: strings('roleSelection.staff'),
    value:'Staff',
    id: 2,
  },
  {
    name: strings('roleSelection.student'),
    value:'Student',
    id: 2,
  },
];

export const DropDownDatas = [
  {
      name: 'Nirma University of Science and Technology',
      id: 1,
  },
  {
      name: 'Gujarat University',
      id: 2,
  },
  {
      name: 'Sardar Patel University',
      id: 3,
  },
  {
      name: 'Saurashtra University',
      id: 4,
  },
];
