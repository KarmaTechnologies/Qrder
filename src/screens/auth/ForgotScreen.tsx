import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { hp, wp } from '../../theme/fonts';
import Input from '../../compoment/Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import { screenName } from '../../navigation/screenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import { strings } from '../../i18n/i18n';
import { emailCheck, errorToast } from '../../utils/commonFunction';
import { useAppDispatch } from '../../redux/hooks';
import { sendForgotEmail } from '../../actions/authAction';

type Props = {};

const ForgotScreen = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPresSendCode = () => {
    try {
      if (email.trim().length === 0) {
        errorToast(strings('login.error_email'));
      } else if (!emailCheck(email)) {
        errorToast(strings('login.error_v_email'));
      } else {
        setLoading(true)
        let userInfo = {
          data: {
            email: email,
          },
          onSuccess: () => {
            setEmail('');
            setLoading(false)
            navigation.navigate(screenName.VerificationCode, { email: email });
          },
          onFailure: (Err: any) => {
            if (Err != undefined) {
              setLoading(false)
              errorToast(Err?.data?.message);
            }
          },
        };
        dispatch(sendForgotEmail(userInfo));
      }
    } catch {
      setLoading(false)
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
            placeholder={strings('login.enter_email_Id')}
            label={strings('login.email')}
            onChangeText={(t: string) => setEmail(t)}
          />
          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPresSendCode}
            title={strings('login.login_in')}
            isLoading={loading}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ForgotScreen;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg_white,
    },
    bottomContainer: {
      flex: 2,
      backgroundColor: colors.bg_white,
    },
    contentContainerStyle: {
      paddingHorizontal: wp(20),
    },
    signupButton: {
      marginTop: hp(12),
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
