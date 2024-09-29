import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { Icons } from '../../utils/images';
import { commonFontStyle, h, hp, wp } from '../../theme/fonts';
import Input from '../../compoment/Input';
import {
  DropDownData,
  UpperCaseCheck,
  emailCheck,
  errorToast,
  numberCheck,
  specialCarCheck,
} from '../../utils/commonFunction';
import PrimaryButton from '../../compoment/PrimaryButton';
import { screenName } from '../../navigation/screenNames';
import { dispatchNavigation } from '../../utils/globalFunctions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { googleEmailAction, userLogin } from '../../actions/authAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import { strings } from '../../i18n/i18n';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLINET_ID } from '../../utils/apiConstants';
import CCDropDown from '../../compoment/CCDropDown';


type Props = {};

const SignInScreen = (props: Props) => {
  const { colors } = useTheme();
  const { params } = useRoute();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  // const [email, setEmail] = useState(__DEV__ ? 'adminstudent@gmail.com' : '');
  // const [email, setEmail] = useState(__DEV__ ? 'ssss@gmail.com' : '');
  // const [email, setEmail] = useState(__DEV__ ? 'admin@gmail.com' : '');
  // const [password, setPassword] = useState(__DEV__ ? 'Test!@123' : '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [selectRole, setSelectRole] = useState('');
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const { selectedRole } = useAppSelector(state => state.common);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const onPressLogin = () => {
    dispatchNavigation(screenName.BottomTabBar);
    return
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
      data.append('role', params?.role.toLowerCase());
      let obj = {
        data,
        onSuccess: () => {
          if (params?.role == 'Admin') {
            dispatchNavigation(screenName.BottomTabBar);
          } else if (params?.role == 'Staff') {
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


  const googlesignIn = async () => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLINET_ID,
      offlineAccess: false,
    });
    try {
      let user = await GoogleSignin.getCurrentUser();
      console.log(user);
      if (user !== null && Object.keys(user).length !== 0) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("GoogleSignin userInfo", userInfo);

      let googleUser = {
        ...userInfo,
        user: {
          ...userInfo.user,
          role: params?.role.toLowerCase(),
        }
      };
      let userObj = {
        data: googleUser,
        onSuccess: () => {
          if (params?.role == 'Admin') {
            dispatchNavigation(screenName.BottomTabBar);
          } else {
            dispatchNavigation(screenName.StudentSelect);
          }
        },
        onFailure: (Err: any) => {
          if (Err != undefined) {
            errorToast(Err?.message);
          }
        },
      };
      dispatch(googleEmailAction(userObj));
    } catch (error: any) {
      if (error?.code === statusCodes?.SIGN_IN_CANCELLED) {
        errorToast(strings('googleSignIn.user_cancelled'));
      } else if (error?.code === statusCodes?.IN_PROGRESS) {
        errorToast(strings('googleSignIn.error_text'));
      } else if (error?.code === statusCodes?.PLAY_SERVICES_NOT_AVAILABLE) {
        errorToast(strings('googleSignIn.play_services'));
      } else {
        errorToast(strings('googleSignIn.something_went'));
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
        title={strings('login.welcome_back')}
        description={strings('login.login_dec')}
      />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <CCDropDown
            data={DropDownData}
            label={strings('login.select_role')}
            labelField={'name'}
            valueField={'value'}
            placeholder={strings('roleSelection.select_role')}
            DropDownStyle={styles.dropDownStyle}
            value={selectRole}
            setValue={setSelectRole}
            extraStyle={styles.extraStyle}
          />

          <Input
            value={email}
            placeholder={strings('login.enter_email_Id')}
            label={strings('login.email')}
            onChangeText={(t: string) => setEmail(t)}
          />
          <Input
            value={password}
            autoCorrect={false}
            isShowEyeIcon={true}
            secureTextEntry={isShowPassword}
            placeholder={strings('login.password')}
            label={strings('login.password')}
            onChangeText={(t: string) => setPassword(t)}
            onPressEye={() => setIsShowPassword(!isShowPassword)}
          />
          <View style={styles.subContainer}>
            {/* <View style={styles.rememberView}>
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
            </View> */}
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
          {params?.role == 'Admin' || params?.role == 'Student' ?
            <Text style={styles.orContinueText}>
              {strings('login.or')}
            </Text>
            : null}

          {params?.role == 'Admin' || params?.role == 'Student' ? <View>
            {/* <TouchableOpacity
              style={[
                styles.roundView,
                {
                  backgroundColor: colors.blue_100,
                },
              ]}>
              <Image style={styles.facebookIcon} source={Icons.facebook} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={googlesignIn}
              style={styles.roundView}>
              <Image style={styles.twitterIcon} source={Icons.google} />
              <Text style={styles.googleText}>{strings("login.google")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundView]}>
              <Image style={styles.appleIcon} source={Icons.apple} />
              <Text style={styles.googleText}>{strings('login.apple')}</Text>
            </TouchableOpacity>
          </View> : null}

         
        </KeyboardAwareScrollView>
      </View>
      {params?.role == 'Admin' || params?.role == 'Student' ? (
            <>

              <TouchableOpacity onPress={onPressSignUp} style={{bottom:10}}>
                <Text style={styles.bottomText}>
                  {strings('login.dont_have_account')}
                  <Text style={styles.signUpText}>
                    {' '}
                    {strings('login.sign_up')}
                  </Text>
                </Text>
              </TouchableOpacity>
            </>

          ) : (
            null
          )}
    </View>
  );
};

export default SignInScreen;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg_white,
    },
    bottomContainer: {
      flex: 2.5,
      backgroundColor: colors.bg_white
    },
    contentContainerStyle: {
      paddingHorizontal: wp(20),
    },
    loginIcon: {
      height: hp(150),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    input: {
      marginBottom: hp(2),
      marginTop: hp(3),
    },
    subContainer: {
      marginTop: hp(8),
      alignSelf: 'flex-end'
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
      ...commonFontStyle(400, 14, colors.black),
    },
    signupButton: {
      marginTop: hp(12),
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    orContinueText: {
      ...commonFontStyle(400, 14, colors.title_dec),
      marginTop: hp(12),
      textAlign: 'center',
    },
    bottomText: {
      ...commonFontStyle(400, 14, colors.text_gray1),
      textAlign: 'center',
    },
    signUpText: {
      ...commonFontStyle(600, 14, colors.Primary_Orange),
    },
    orText: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
    },
    roundView: {
      height: wp(48),
      borderRadius: wp(60) / 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(12),
      backgroundColor: colors.defult_white,
      borderWidth: 1,
      flexDirection: 'row',
      borderColor: colors.input_border1,
    },
    facebookIcon: {
      height: hp(18),
      width: wp(9),
      resizeMode: 'contain',
    },
    twitterIcon: {
      height: wp(18),
      width: wp(17),
      resizeMode: 'contain',
    },
    googleText: {
      ...commonFontStyle(700, 15, colors.text_gray),
      paddingLeft: wp(10)
    },
    appleIcon: {
      height: hp(18),
      width: wp(14),
      resizeMode: 'contain',
    },
    dropDownStyle: {
      borderColor: colors.input_border,
      backgroundColor: colors.input_bg,
      height: hp(56),
      borderRadius: 32,
      paddingHorizontal: wp(25),
    },
    extraStyle: {
      marginTop: hp(0),
    },
  });
};
