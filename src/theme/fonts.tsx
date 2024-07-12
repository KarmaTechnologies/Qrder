export function getFontType(fontWeight: any) {
  if (fontWeight == 600) {
    return 'OpenSans-SemiBold';
  } else if (fontWeight == 400) {
    return 'OpenSans-Regular';
  } else if (fontWeight == 700) {
    return 'OpenSans-Bold';
  } else if (fontWeight == 800) {
    return 'OpenSans-ExtraBold';
  } else if (fontWeight == 500) {
    return 'OpenSans-Medium';
  } else if (fontWeight == 300) {
    return 'OpenSans-Light';
  } else {
    return 'OpenSans-Regular';
  }
}

export const commonFontStyle = (fontWeight: any, fontSize: any, color: any) => {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: fontSize,
    color: color,
    includeFontPadding: false,
  };
};

import {Dimensions, Platform, PixelRatio} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const isIos = Platform.OS === "ios";

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const hp = (i: any) => {
  return heightPercentageToDP((i * 100) / 812);
};

export const wp = (i: any) => {
  return widthPercentageToDP((i * 100) / 375);
};
const scale = SCREEN_WIDTH / 320;

export const w = (val: number) => {
  return widthPercentageToDP((val * 100) / 375);
};

export const h = (val: number) => {
  return heightPercentageToDP((val * 100) / 812);
};
