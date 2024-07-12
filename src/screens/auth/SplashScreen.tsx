import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../theme/fonts';
import {AppStyles} from '../../theme/appStyles';
import {screenName} from '../../navigation/screenNames';
import {dispatchNavigation} from '../../utils/globalFunctions';
import {getAsyncToken} from '../../utils/asyncStorageManager';
import { Icons } from '../../utils/images';

type Props = {};

const SplashScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);


  useEffect(() => {
    setTimeout(()=>{
      dispatchNavigation(screenName.OnboardingScreen);
    },1000)
   
  }, []);

  const getUserInfo = async () => {
    let isUser = await getAsyncToken();
    if (isUser) {
      dispatchNavigation(screenName.MyDrawer);
    } else {
      dispatchNavigation(screenName.LoginSignupScreen);
    }
  };


  return (
    <View style={styles.container}>
    <StatusBar backgroundColor={"transparent"} barStyle={'dark-content'}/>
      <SafeAreaView style={[AppStyles.flex]}>
        <Image style={styles.mainImage} source={Icons.launch_screen} />
      </SafeAreaView>
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
      width:SCREEN_WIDTH,
      resizeMode: 'cover',
    },
  });
};
