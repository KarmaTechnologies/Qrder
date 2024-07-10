import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Icons} from '../../utils/images';
import {commonFontStyle, hp} from '../../theme/fonts';
import Input from '../../compoment/Input';
import {
  UpperCaseCheck,
  emailCheck,
  errorToast,
  numberCheck,
  passwordCheck,
  specialCarCheck,
} from '../../utils/commonFunction';
import PrimaryButton from '../../compoment/PrimaryButton';
import {screenName} from '../../navigation/screenNames';
import {getOtp, userLogin, userSignUp} from '../../actions/authAction';
import {useAppDispatch} from '../../redux/hooks';
import {navigationRef} from '../../navigation/mainNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
type Props = {};

const SignUpScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(true);

  const dispatch = useAppDispatch();

  const onPressCreateAccount = () => {
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
    } else if (confirmPassword.trim() !== password.trim()) {
      errorToast('Your password and confirm password do not match');
    } else {
      let obj = {
        data: {
          email: email,
          // name: username,
          password: password,
          // confirm_password: confirmPassword,
        },
        onSuccess: (response: any) => {
          // SendOtp();
          //@ts-ignore
          navigationRef.navigate(screenName.EmailVerficationScreen, {
            email: email,
          });
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

  const SendOtp = () => {
    let obj = {
      data: {
        email: email,
      },
      onSuccess: () => {
        //@ts-ignore
        navigationRef.navigate(screenName.EmailVerficationScreen, {
          email: email,
        });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
      },
      onFailure: (Err: any) => {
        if (Err != undefined) {
          Alert.alert(Err?.message);
        }
      },
    };
    dispatch(getOtp(obj));
  };

  const onPressLogin = () => {
    navigationRef.navigate(screenName.SignInScreen);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={"top"}>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10}}>
          <Image
            source={isDark ? Icons.virtuaLoginIconWhite : Icons.virtuaLoginIcon}
            style={styles.loginIcon}
          />
          <Text style={styles.loginText}>Create Account</Text>
          <Input
            onChangeText={(e: any) => {
              setUsername(e);
            }}
            placeholder={'User Name'}
            value={username}
            extraStyle={styles.input}
          />
          <Input
            onChangeText={(e: any) => {
              setEmail(e.trim());
            }}
            placeholder={'Email address'}
            value={email}
            extraStyle={styles.input}
          />
          <Input
            onChangeText={(e: any) => {
              setPassword(e);
            }}
            isValidation
            placeholder={'Password'}
            value={password}
            extraStyle={styles.input}
            secureTextEntry={visible}
            visible={visible}
            setVisible={() => setVisible(!visible)}
          />
          <Input
            onChangeText={(e: any) => {
              setConfirmPassword(e);
            }}
            isValidation
            placeholder={'Confirm Password'}
            value={confirmPassword}
            secureTextEntry={confirmVisible}
            visible={confirmVisible}
            setVisible={() => setConfirmVisible(!confirmVisible)}
          />
          <Text style={styles.heeading}>
            Your password must contains atleast :
          </Text>
          <Text style={styles.des}>{'\u2981'} Total of 8 Characters</Text>
          <Text style={styles.des}>{'\u2981'} One Lower case letter (a-z)</Text>
          <Text style={styles.des}>{'\u2981'} One Upper case letter (A-Z)</Text>
          <Text style={styles.des}>{'\u2981'} One Number (0-9)</Text>
          <Text style={styles.des}>
            {'\u2981'} One Special character (e.g. !@#$%^&*)
          </Text>
          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPressCreateAccount}
            title={'Create account'}
          />
          <TouchableOpacity onPress={onPressLogin}>
            <Text style={styles.bottomText}>
              Already have an account?
              <Text style={{...commonFontStyle(500, 16, colors.Primary)}}>
                {' '}
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: hp(2),
    },
    loginIcon: {
      height: 150,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    loginText: {
      ...commonFontStyle(600, 24, colors.Primary),
      marginBottom: hp(3),
    },
    input: {
      marginBottom: hp(2),
    },
    forgotText: {
      ...commonFontStyle(400, 16, colors.Primary),
      paddingVertical: hp(2),
    },
    signupButton: {
      marginTop: hp(4),
    },
    bottomText: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
      marginVertical: hp(2),
      textAlign: 'center',
    },
    heeading: {
      ...commonFontStyle(400, 14, colors.Primary),
      marginTop: 10,
    },
    des: {
      ...commonFontStyle(400, 14, colors.Text_Tertiary),
      paddingTop: 3,
    },
  });
};
