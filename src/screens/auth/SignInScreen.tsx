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
import { useNavigation, useTheme } from '@react-navigation/native';
import { Icons } from '../../utils/images';
import { commonFontStyle, h, hp, wp } from '../../theme/fonts';
import Input from '../../compoment/Input';
import {
  UpperCaseCheck,
  emailCheck,
  errorToast,
  numberCheck,
  specialCarCheck,
  successToast,
} from '../../utils/commonFunction';
import PrimaryButton from '../../compoment/PrimaryButton';
import { screenName } from '../../navigation/screenNames';
import { dispatchNavigation } from '../../utils/globalFunctions';
import { useAppDispatch } from '../../redux/hooks';
import { userLogin } from '../../actions/authAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';

type Props = {};

const SignInScreen = (props: Props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressLogin = () => {
    return;
    if (email.trim().length === 0) {
      errorToast('Please enter your email address');
    } else if (!emailCheck(email)) {
      errorToast('Please enter your valid email address');
    } else if (password.trim().length === 0) {
      errorToast('Please enter your password');
    } else if (password.trim().length < 9) {
      errorToast('Your password must be at least 9 characters long');
    } else if (!numberCheck(password)) {
      errorToast('Password must contain one number');
    } else if (!specialCarCheck(password)) {
      errorToast('Password must contain one special character');
    } else if (!UpperCaseCheck(password)) {
      errorToast('Password must contain one uppercase letter');
    } else {
      let obj = {
        data: {
          email: email,
          password: password,
        },
        onSuccess: (response: any) => {
          successToast('Login successful');
          dispatchNavigation(screenName.MyDrawer);
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />

      <LoginHeader title={'Log In'} description={'Please sign in to your existing account'} />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.contentContainerStyle}>
          <Input
            value={email}
            placeholder="williams@david.com"
            label={'Email'}
            onChangeText={(t: string) => setEmail(t)}
          />
          <Input
            value={password}
            autoCorrect={false}
            isShowEyeIcon={true}
            placeholder="* * * * * * *"
            secureTextEntry={isShowPassword}
            label={"Password"}
            onChangeText={(t: string) => setPassword(t)}
            onPressEye={() => setIsShowPassword(!isShowPassword)}
          />
          <View style={styles.subContainer}>
            <View style={styles.rememberView}>
              <TouchableOpacity style={styles.checkBox} />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenName.ForgotScreen)}>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPressLogin}
            title={'Log In'}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate(screenName.SignUpScreen)}>
            <Text style={styles.bottomText}>
              {'Don’t have an account?'}
              <Text style={styles.signUpText}>
                {' '}
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <Text style={styles.orText}>Or</Text>
          </View>

          <View style={styles.roundContainer}>
            <View style={[styles.roundView, {
              backgroundColor: colors.blue_100

            }]}>
              <Image style={styles.facebookIcon} source={Icons.facebook} />
            </View>
            <View style={[styles.roundView, {
              backgroundColor: colors.white12,
              elevation:5,
              borderWidth:1,
              borderColor:colors.Surface_Tertiary

            }]}>
              <Image style={styles.twitterIcon} source={Icons.google} />
            </View>
            <View style={[styles.roundView, {
              backgroundColor: colors.blue_200

            }]}>
              <Image style={styles.appleIcon} source={Icons.apple} />
            </View>
          </View>

        </KeyboardAwareScrollView>
      </View>

    </View>
  );
};

export default SignInScreen;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
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
      borderTopRightRadius: 24
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
      alignItems: 'center'
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
      marginRight: wp(10)
    },
    rememberText: {
      ...commonFontStyle(400, 13, colors.Text_gray),
      alignSelf: 'center'
    },
    forgotText: {
      ...commonFontStyle(400, 14, colors.Primary_Orange),
    },
    signupButton: {
      marginTop: hp(30),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },
    bottomText: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
      marginTop: hp(38),
      marginBottom: hp(27),
      textAlign: 'center',
    },
    signUpText: {
      ...commonFontStyle(700, 14, colors.Primary_Orange),
      textTransform: 'uppercase'
    },
    orContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: hp(15)
    },
    orText: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
    },
    roundContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    roundView: {
      height: wp(60),
      width: wp(60),
      borderRadius: wp(60),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: hp(10)
    },
    facebookIcon: {
      height: hp(18),
      width: wp(9),
      resizeMode: 'contain'
    },
    twitterIcon: {
      height: wp(36),
      width: wp(36),
      resizeMode: 'contain'
    },
    appleIcon: {
      height: hp(20),
      width: wp(18),
      resizeMode: 'contain'
    }
  });
};
