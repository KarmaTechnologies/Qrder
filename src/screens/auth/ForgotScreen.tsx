import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {hp, wp} from '../../theme/fonts';
import Input from '../../compoment/Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import {screenName} from '../../navigation/screenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import {strings} from '../../i18n/i18n';
import { emailCheck, errorToast, infoToast } from '../../utils/commonFunction';
import { useAppDispatch } from '../../redux/hooks';
import { sendForgotEmail } from '../../actions/authAction';

type Props = {};

const ForgotScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [email, setEmail] = useState('');

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPresSendCode = () => {
    if (email.trim().length === 0) {
      infoToast('Please enter your email address');
    } else if (!emailCheck(email)) {
      infoToast('Please enter your valid email address');
    } else {
      let userInfo = {
        data: {
          email: email,
        },
        onSuccess: (res: any) => {
          setEmail('');
          navigation.navigate(screenName.VerificationCode, { email: email});
        },
        onFailure: (Err: any) => {
          if (Err != undefined) {
            errorToast(Err?.data?.message);
          }
        },
      };
      dispatch(sendForgotEmail(userInfo));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.Primary_Bg}
      />

      <LoginHeader
        title={strings('login.forgot_password')}
        description={strings('login.login_dec')}
        isBack={true}
        onPress={() => onPressBack()}
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
          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPresSendCode}
            title={strings('login.send_code')}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ForgotScreen;

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
    signupButton: {
      marginTop: hp(30),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
