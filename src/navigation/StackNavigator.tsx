import {FC} from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {useAppDispatch} from '../redux/hooks';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  StatusBar,
  Platform,
  Clipboard,
} from 'react-native';
import SplashScreen from '../screens/auth/SplashScreen';
import {screenName} from './screenNames';
import {light_theme} from '../theme/colors';
import {SCREEN_WIDTH, commonFontStyle, h} from '../theme/fonts';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OnboardingScreen from '../screens/auth/Onboarding';
import SignInScreen from '../screens/auth/SignInScreen';

const Drawer = createDrawerNavigator();
const {StatusBarManager} = NativeModules;

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerType: 'front',
//         drawerStyle: {width: '80%'},
//         overlayColor: 'rgba(0,0,0,0.6)',
//       }}
//       drawerContent={props => <CustomDrawer {...props} />}>
//       <Drawer.Screen
//         options={({navigation}) => ({
//           ...headerStyleTransparent,
//           headerLeft: () => (
//             <HomeHeader navigation={navigation} name={'Home'} />
//           ),
//           headerTitle: '',
//         })}
//         name={screenName.HomeScreen}
//         component={HomeScreen}
//       />
//     </Drawer.Navigator>
//   );
// }

const headerStyleTransparent = {
  headerStyle: {
    backgroundColor: light_theme.white,
    shadowOpacity: 0,
    elevation: 0,
    // height: 60
  },
  // headerStatusBarHeight
  headerTitleStyle: {
    fontWeight: '600',
    // ...commonFontStyle(600, 500, 19, light_theme.black),
  },
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS,
};
const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: light_theme.Primary_500,
    width: SCREEN_WIDTH,
    // height: 60,
    justifyContent: 'center',
  },
  headerLogo: {
    alignSelf: 'center',
    height: 45,
    resizeMode: 'contain',
    marginBottom: Platform.OS == 'ios' ? 10 : 5,
  },
  backView: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {height: 20, width: 20, resizeMode: 'contain'},
  menuIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  headername: {
    ...commonFontStyle(600, 16, '#000000'),
    fontWeight: '600',
    alignSelf: 'center',
    position: 'absolute',
  },
  headersView: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: light_theme?.neutral_100,
    // paddingBottom: h(10),
  },
});

const StackNavigator: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Stack.Navigator initialRouteName={screenName.SplashScreen}>
      <Stack.Screen
        options={({navigation}) => ({
          headerShown: false,
          ...headerStyleTransparent,
        })}
        name={screenName.SplashScreen}
        component={SplashScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerShown: false,
          ...headerStyleTransparent,
        })}
        name={screenName.OnboardingScreen}
        component={OnboardingScreen}
      />
      {/* <Stack.Screen
        options={({navigation}) => ({
          headerShown: false,
          ...headerStyleTransparent,
        })}
        name={screenName.LoginSignupScreen}
        component={LoginSignupScreen}
      /> */}

      <Stack.Screen
        options={({navigation}) => ({
          ...headerStyleTransparent,
          headerShown: false,
        })}
        name={screenName.SignInScreen}
        component={SignInScreen}
      />
      {/* <Stack.Screen
        options={({navigation}) => ({
          ...headerStyleTransparent,
          headerLeft: () => <Header navigation={navigation} />,
          headerTitle: '',
        })}
        name={screenName.SignUpScreen}
        component={SignUpScreen}
      /> */}
    </Stack.Navigator>
  );
};
export default StackNavigator;
