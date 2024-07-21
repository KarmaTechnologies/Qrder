import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncKeys = {
  // clear in logout time
  token: "@token",
  user_info: "@user_info",
  driver_info: "@user_info",
  is_dark_theme:"@is_dark_theme",
  location: "@location",

  // no clear in logout time
  guest: "@guest",
  fcm_token: "@fcm_token",
};

export const clearAsync = async () => {
  await AsyncStorage.multiRemove([
    asyncKeys.token,
    asyncKeys.user_info,
  ]);
};

export const setAsyncToken = async (token: string) => {
  await AsyncStorage.setItem(asyncKeys.token, JSON.stringify(token));
};

export const getAsyncToken = async () => {
  const token = await AsyncStorage.getItem(asyncKeys.token);
  if (token) {
    return "Bearer " + "1|9faigV6kLlDafX8NU5VXW4eL7OfoZDpvfugQgELhd1fdf9af";
  } else {
    return null;
  }
};

export const setAsyncUserInfo = async (user: any) => {
  await AsyncStorage.setItem(asyncKeys.user_info, JSON.stringify(user));
};

export const getAsyncUserInfo = async () => {
  const userInfo = await AsyncStorage.getItem(asyncKeys.user_info);
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return null;
  }
};

export const setAsyncLocation = async (location: any) => {
  await AsyncStorage.setItem(asyncKeys.location, JSON.stringify(location));
};

export const getAsyncLocation = async () => {
  const userlocation = await AsyncStorage.getItem(asyncKeys.location);
  if (userlocation) {
    return JSON.parse(userlocation);
  } else {
    return null;
  }
};
