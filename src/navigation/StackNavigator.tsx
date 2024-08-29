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
import MyOrdersList from '../screens/Chef/MyOrdersList';
import Notification from '../screens/Chef/Notification';
import NotificationListCard from '../screens/Chef/NotificationListCard';
import ProfileNotification from '../screens/ChefSettings/ProfileNotification';
import ProfileMessages from '../screens/ChefSettings/ProfileMessages';
import ReviewsScreen from '../screens/Chef/ReviewsScreen';
import PersonalInfo from '../screens/ChefSettings/PersonalInfo';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import ChefSellBottomBar from './ChefSelfBottomBar';
import ChefSelfBottomBar from './ChefSelfBottomBar';
import Settings from '../screens/ChefSettings/Settings';
import EditProfile from '../screens/ChefSettings/EditProfile';
import ChefSignUp from '../screens/ChefSelf/ChefSignUp';
import StudentSignUp from '../screens/StudentAuth/StudentSignUp';
import StudentSelect from '../screens/StudentAuth/StudentSelect';
import StudentHome from '../screens/StudentAuth/StudentHome';
import StudentBottomBar from './StudentBottomBar';
import ChefNameList from '../screens/ChefSelf/ChefNameList';
import ChefEditName from '../screens/ChefSelf/ChefEditName';
import StudentMenuList from '../screens/StudentAuth/StudentMenuList';
import CuisinesNameList from '../screens/ChefSelf/CuisinesNameList';
import StudentCheckOut from '../screens/StudentAuth/StudentCheckOut';
import NewPassword from '../screens/auth/NewPassword';
import EditFoodDetails from '../screens/Chef/EditFoodDetails';

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
          headerShown: false,
          ...headerStyleTransparent,
        })}
        name={screenName.RoleSelectionScreen}
        component={RoleSelectionScreen}
      />
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
        name={screenName.NewPassword}
        component={NewPassword}
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
      })} name={screenName.MyOrdersList} component={MyOrdersList} />

      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ChefSignUp} component={ChefSignUp} />

      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ProfileNotification} component={ProfileNotification} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ProfileMessages} component={ProfileMessages} />

      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ReviewsScreen} component={ReviewsScreen} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.PersonalInfo} component={PersonalInfo} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.EditProfile} component={EditProfile} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.Settings} component={Settings} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.CuisinesNameList} component={CuisinesNameList} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.EditFoodDetails} component={EditFoodDetails} />

      {/* // chefSell */}

      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ChefSelfBottomBar} component={ChefSelfBottomBar} />

      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ChefNameList} component={ChefNameList} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.ChefEditName} component={ChefEditName} />

      {/* // student */}


      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.StudentSignUp} component={StudentSignUp} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.StudentSelect} component={StudentSelect} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.StudentBottomBar} component={StudentBottomBar} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.StudentMenuList} component={StudentMenuList} />
      <Stack.Screen options={({ navigation }) => ({
        ...headerStyleTransparent,
        headerShown: false,
        headerTitle: '',
      })} name={screenName.StudentCheckOut} component={StudentCheckOut} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
