import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Icons} from '../../utils/images';
import {commonFontStyle, h, hp} from '../../theme/fonts';
import Input from '../../compoment/Input';
import {
  UpperCaseCheck,
  emailCheck,
  errorToast,
  numberCheck,
  passwordCheck,
  specialCarCheck,
  successToast,
} from '../../utils/commonFunction';
import PrimaryButton from '../../compoment/PrimaryButton';
import {screenName} from '../../navigation/screenNames';
import {dispatchNavigation} from '../../utils/globalFunctions';
import {useAppDispatch} from '../../redux/hooks';
import {userLogin} from '../../actions/authAction';
import { light_theme } from '../../theme/colors';

type Props = {};

const SignInScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);

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
       <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.white}
      />
      <Image
        source={isDark ? Icons.virtuaLoginIconWhite : Icons.virtuaLoginIcon}
        style={styles.loginIcon}
      />
      <Text style={styles.loginText}>Sign in</Text>
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
          setPassword(e.trim());
        }}
        placeholder={'Password'}
        value={password}
        isValidation
        secureTextEntry={visible}
        visible={visible}
        setVisible={() => setVisible(!visible)}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(screenName.ChooseResetPassword)}>
        <Text style={styles.forgotText}>Forgot Password ?</Text>
      </TouchableOpacity>
      <PrimaryButton
        extraStyle={styles.signupButton}
        onPress={onPressLogin}
        title={'Sign in'}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(screenName.SignUpScreen)}>
        <Text style={styles.bottomText}>
          {'New to tuti? Get ready!'}
          <Text style={{...commonFontStyle(500, 16, colors.Primary)}}>
            {' '}
            Create account
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: hp(2),
    },
    loginIcon: {
      height: h(150),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    loginText: {
      ...commonFontStyle(600, 24, colors.Primary),
    },
    input: {
      marginBottom: hp(2),
      marginTop: hp(3),
    },
    forgotText: {
      ...commonFontStyle(400, 16, colors.Primary),
      paddingVertical: hp(2),
    },
    signupButton: {
      marginTop: hp(3),
    },
    bottomText: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
      marginVertical: hp(2),
      textAlign: 'center',
    },
  });
};
