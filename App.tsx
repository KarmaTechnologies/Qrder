import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux';
import Toast from 'react-native-toast-message';
import {colors, light_theme} from './src/theme/colors';
import {hp, commonFontStyle, SCREEN_WIDTH} from './src/theme/fonts';
import RootContainer from './src/navigation/mainNavigator';
// import * as Sentry from '@sentry/react-native';
// import SplashScreen from 'react-native-splash-screen';

type Props = {};

const App = (props: Props) => {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  const toastConfig = {
    success: ({text1, text2, type, props, ...rest}: any) =>
      type === 'success' && (
        <SafeAreaView>
          <View style={styles.textStyleToastSuccess}>
            <Text style={styles.textStyleToast}>{text1}</Text>
          </View>
        </SafeAreaView>
      ),
    error: ({text1, text2, type, props, ...rest}: any) => {
      if (type === 'error') {
        return (
          <SafeAreaView>
            <View style={styles.toastStyle}>
              <Text style={styles.textStyleToast}>{text1}</Text>
            </View>
          </SafeAreaView>
        );
      }
    },
    info: ({text1, text2, type, props, ...rest}: any) => {
      if (type === 'error') {
        return (
          <SafeAreaView>
            <View style={styles.textStyleToastInfo}>
              <Text style={styles.textStyleToast}>{text1}</Text>
            </View>
          </SafeAreaView>
        );
      }
    },
  };

  return (
    <Provider store={store}>
      <View style={{flex: 1, backgroundColor: light_theme.white}}>
     
        <RootContainer />
        <Toast
          // ref={ref => Toast.setRef(ref)}
          config={toastConfig}
          position="top"
          topOffset={0}
        />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  toastStyle: {
    backgroundColor: light_theme.red_ED7C7C,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: SCREEN_WIDTH,
  },
  textStyleToastSuccess: {
    backgroundColor: light_theme.green_20CA60,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: SCREEN_WIDTH,
  },
  textStyleToastInfo: {
    backgroundColor: light_theme.green_20CA60,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: SCREEN_WIDTH,
  },
  textStyleToast: {
    ...commonFontStyle(500, 16, light_theme.white),
    textAlign: 'center',
  },
});
