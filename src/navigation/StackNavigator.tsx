import { FC } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch } from '../redux/hooks';
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
import { screenName } from './screenNames';
import { light_theme } from '../theme/colors';
import { SCREEN_WIDTH, commonFontStyle, h } from '../theme/fonts';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OnboardingScreen from '../screens/auth/Onboarding';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotScreen from '../screens/auth/ForgotScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import VerificationCode from '../screens/auth/VerificationCode';
import LocationScreen from '../screens/auth/LocationScreen';
import MyTabs from "../navigation/BottomTabBar";
import FoodDetails from '../screens/Chef/FoodDetails';
import ChefSignUp from '../screens/ChefAuth/ChefSignUp';

const Drawer = createDrawerNavigator();
const { StatusBarManager } = NativeModules;

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

const StackNavigator: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Stack.Navigator initialRouteName={screenName.SplashScreen}>
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: false,
          ...headerStyleTransparent,
        })}
        name={screenName.SplashScreen}
        component={SplashScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
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
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          headerShown: false,
        })}
        name={screenName.SignInScreen}
        component={SignInScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          headerShown: false,
          // headerLeft: () => <Header navigation={navigation} />,
          headerTitle: '',
        })}
        name={screenName.SignUpScreen}
        component={SignUpScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          headerShown: false,
          headerTitle: '',
        })}
        name={screenName.ForgotScreen}
        component={ForgotScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          headerShown: false,
          headerTitle: '',
        })}
        name={screenName.VerificationCode}
        component={VerificationCode}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...headerStyleTransparent,
          headerShown: false,
          headerTitle: '',
        })}
        name={screenName.LocationScreen}
        component={LocationScreen}
      />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.BottomTabBar} component={MyTabs} />

      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.FoodDetails} component={FoodDetails} />

      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ChefSignUp} component={ChefSignUp} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
