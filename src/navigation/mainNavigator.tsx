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
  const {isDarkTheme} = useAppSelector(state => state.common);
  const theme = useColorScheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDarkTheme(theme == 'dark' ? true : false));
  }, [theme]);

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
