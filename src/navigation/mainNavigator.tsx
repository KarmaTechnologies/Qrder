import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import Loader from '../compoment/Loader';
import StackNavigator from './StackNavigator';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {dark_theme, light_theme} from '../theme/colors';
import {setDarkTheme} from '../utils/commonActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncKeys } from '../utils/asyncStorageManager';
import I18n from '../i18n/i18n';

export const navigationRef = createNavigationContainerRef();

let DarkThemeColors = {
  colors: {
    ...dark_theme,
  },
  isDark: true,
};

let DefaultThemeColor = {
  colors: {
    ...light_theme,
  },
  isDark: false,
};

const RootContainer: FC = () => {
  const {isLoading} = useAppSelector(state => state.common);
  const {isDarkTheme,isLanguage} = useAppSelector(state => state.common);
  const theme = useColorScheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData().then((data) => {
      dispatch(setDarkTheme(data));
    });
    
  }, [theme]);

  const getData = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem(asyncKeys.is_dark_theme);
      return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
      console.error("Failed to fetch the data from storage", e);
    }
  };

    useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(asyncKeys.is_language);
        if (storedLanguage) {
            I18n.locale = storedLanguage;
        }
      } catch (error) {
        console.error('Failed to load language:', error);
      }
    };

    loadLanguage();
  }, [isLanguage]);

  return (
    <NavigationContainer
      theme={isDarkTheme ? DarkThemeColors : DefaultThemeColor}
      ref={navigationRef}>
      {/* <Loader visible={isLoading} /> */}
      <StackNavigator />
    </NavigationContainer>
  );
};
export default RootContainer;
