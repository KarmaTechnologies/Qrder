import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../theme/fonts';
import {AppStyles} from '../../theme/appStyles';
import {screenName} from '../../navigation/screenNames';
import {dispatchNavigation} from '../../utils/globalFunctions';
import {getAsyncRole, getAsyncToken} from '../../utils/asyncStorageManager';
import {Icons} from '../../utils/images';
import { onBackgroundNotificationPress, onMessage, onNotificationPress, openAppNotifiactionEvent } from '../../utils/notificationHandle';

type Props = {};

const SplashScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);

  useEffect(() => {
    onMessage();
    onNotificationPress();
    onBackgroundNotificationPress();
    openAppNotifiactionEvent();
    setTimeout(() => {
      getUserInfo();
    }, 1000);
  }, []);

  const getUserInfo = async () => {
    let isUser = await getAsyncToken();
    let isRole = await getAsyncRole();
    // dispatchNavigation(screenName.SignInScreen);
    console.log('isUser',isUser);
    
    if (isUser) {
      if (isRole == 'Admin') {
        dispatchNavigation(screenName.BottomTabBar);
      } else if (isRole == 'Chef') {
        dispatchNavigation(screenName.ChefSelfBottomBar);
      } else {
        dispatchNavigation(screenName.StudentSelect);
        // dispatchNavigation(screenName.StudentSelect);
      }
    } else {
      dispatchNavigation(screenName.RoleSelectionScreen);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={[AppStyles.flex]}>
        <Image style={styles.mainImage} source={Icons.launch_screen} />
      </View>
    </View>
  );
};

export default SplashScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
    mainImage: {
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
      resizeMode: 'cover',
    },
  });
};
