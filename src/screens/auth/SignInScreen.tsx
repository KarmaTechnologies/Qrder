import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {Icons} from '../../utils/images';
import {commonFontStyle, h, hp, wp} from '../../theme/fonts';
import Input from '../../compoment/Input';
import {
  UpperCaseCheck,
  emailCheck,
  errorToast,
  numberCheck,
  specialCarCheck,
} from '../../utils/commonFunction';
import PrimaryButton from '../../compoment/PrimaryButton';
import {screenName} from '../../navigation/screenNames';
import {dispatchNavigation} from '../../utils/globalFunctions';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {userLogin} from '../../actions/authAction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import {strings} from '../../i18n/i18n';
import CCDropDown from '../../compoment/CCDropDown';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


type Props = {};

const SignInScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const {params} = useRoute();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [email, setEmail] = useState(__DEV__ ? 'adminstudent@gmail.com' : '');
  // const [email, setEmail] = useState(__DEV__ ? 'ssss@gmail.com' : '');
  // const [email, setEmail] = useState(__DEV__ ? 'admin@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'Test!@123' : '');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [selectRole, setSelectRole] = useState('');
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const {selectedRole} = useAppSelector(state => state.common);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressLogin = () => {
    // return
    if (email.trim().length === 0) {
      errorToast(strings('login.error_email'));
    } else if (!emailCheck(email)) {
      errorToast(strings('login.error_v_email'));
    } else if (password.trim().length === 0) {
      errorToast(strings('login.error_password'));
    } else if (password.trim().length < 9) {
      errorToast(strings('login.error_v_password'));
    } else if (!numberCheck(password)) {
      errorToast(strings('login.error_number_password'));
    } else if (!specialCarCheck(password)) {
      errorToast(strings('login.error_character_password'));
    } else if (!UpperCaseCheck(password)) {
      errorToast(strings('login.error_uppercase_password'));
    } else {
      var data = new FormData();
      data.append('email', email);
      data.append('password', password);
      let obj = {
        data,
        onSuccess: (response: any) => {
          if (params?.role == 'Admin') {
            dispatchNavigation(screenName.BottomTabBar);
          } else if (params?.role == 'Chef') {
            dispatchNavigation(screenName.ChefSelfBottomBar);
          } else {
            dispatchNavigation(screenName.StudentSelect);
          }
          setEmail('');
          setPassword('');
        },
        onFailure: (Err: any) => {
          if (Err != undefined) {
            Alert.alert(Err?.message);
          }
        },
      };
      dispatch(userLogin(obj));
    }
  };

  const onPressSignUp = () => {
    if (selectedRole === 'Admin') {
      navigation.navigate(screenName.SignUpScreen);
    }
    if (selectedRole === 'Student') {
      navigation.navigate(screenName.StudentSignUp);
    }
  };

  useEffect(()=>{
    GoogleSignin.configure()
  },[])

  const googlesignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("-------",userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("------->>>>>",error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.Primary_Bg}
      />

      <LoginHeader
        title={strings('login.login_in')}
        description={strings('login.login_dec')}
      />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.contentContainerStyle}>
          <Input
            value={email}
            placeholder={strings('login.p_email')}
            label={strings('login.email')}
            onChangeText={(t: string) => setEmail(t)}
          />
          <Input
            value={password}
            autoCorrect={false}
            isShowEyeIcon={true}
            secureTextEntry={isShowPassword}
            placeholder="* * * * * * *"
            label={strings('login.password')}
            onChangeText={(t: string) => setPassword(t)}
            onPressEye={() => setIsShowPassword(!isShowPassword)}
          />
          <View style={styles.subContainer}>
            <View style={styles.rememberView}>
              <TouchableOpacity
                style={styles.checkBox}
                onPress={() => setIsSelect(!isSelect)}>
                {isSelect ? (
                  <Image style={styles.checkIcon} source={Icons.checkIcon} />
                ) : null}
              </TouchableOpacity>
              <Text style={styles.rememberText}>
                {strings('login.remember_me')}
              </Text>
            </View>
            {(params?.role == 'Admin' || params?.role == 'Student') && (
              <TouchableOpacity
                onPress={() => navigation.navigate(screenName.ForgotScreen)}>
                <Text style={styles.forgotText}>
                  {strings('login.forgot_password')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPressLogin}
            title={strings('login.login_in')}
          />
          {params?.role == 'Admin' || params?.role == 'Student' ? (
            <TouchableOpacity onPress={onPressSignUp}>
              <Text style={styles.bottomText}>
                {strings('login.dont_have_account')}
                <Text style={styles.signUpText}>
                  {' '}
                  {strings('login.sign_up')}
                </Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.bottomText} />
          )}

          <View style={styles.orContainer}>
            <Text style={styles.orText}>{strings('login.or')}</Text>
          </View>

          <View style={styles.roundContainer}>
            <TouchableOpacity
              style={[
                styles.roundView,
                {
                  backgroundColor: colors.blue_100,
                },
              ]}>
              <Image style={styles.facebookIcon} source={Icons.facebook} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={googlesignIn}
              style={[
                styles.roundView,
                {
                  backgroundColor: colors.white12,
                  borderWidth: 1,
                  // borderColor: colors.Surface_Tertiary,
                },
              ]}>
              <Image style={styles.twitterIcon} source={Icons.google} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roundView,
                {
                  backgroundColor: colors.blue_200,
                },
              ]}>
              <Image style={styles.appleIcon} source={Icons.apple} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default SignInScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.Primary_Bg,
      paddingHorizontal: hp(2),
    },
    bottomContainer: {
      flex: 2.5,
      backgroundColor: colors.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    contentContainerStyle: {
      paddingHorizontal: wp(24),
    },
    loginIcon: {
      height: h(150),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    input: {
      marginBottom: hp(2),
      marginTop: hp(3),
    },
    subContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp(24),
      alignItems: 'center',
    },
    rememberView: {
      flexDirection: 'row',
    },
    checkBox: {
      height: hp(20),
      width: wp(20),
      borderRadius: 2,
      borderWidth: 2,
      borderColor: colors.Border_gray,
      marginRight: wp(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkIcon: {
      width: wp(20),
      height: hp(20),
      resizeMode: 'contain',
      tintColor: colors.black,
    },
    rememberText: {
      ...commonFontStyle(400, 13, colors.Text_gray),
      alignSelf: 'center',
    },
    forgotText: {
      ...commonFontStyle(400, 14, colors.Primary_Orange),
    },
    signupButton: {
      marginTop: hp(30),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomText: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
      marginTop: hp(38),
      marginBottom: hp(27),
      textAlign: 'center',
    },
    signUpText: {
      ...commonFontStyle(700, 14, colors.Primary_Orange),
      textTransform: 'uppercase',
    },
    orContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: hp(15),
    },
    orText: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
    },
    roundContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    roundView: {
      height: wp(60),
      width: wp(60),
      borderRadius: wp(60) / 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: hp(10),
    },
    facebookIcon: {
      height: hp(18),
      width: wp(9),
      resizeMode: 'contain',
    },
    twitterIcon: {
      height: wp(36),
      width: wp(36),
      resizeMode: 'contain',
    },
    appleIcon: {
      height: hp(20),
      width: wp(18),
      resizeMode: 'contain',
    },
    dropDownStyle: {
      borderColor: colors.inputColor,
      backgroundColor: colors.inputColor,
      height: hp(60),
      borderRadius: 10,
    },
    extraStyle: {
      marginTop: hp(24),
    },
  });
};
