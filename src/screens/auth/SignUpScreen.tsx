import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { hp, wp } from '../../theme/fonts';
import Input from '../../compoment/Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import { useAppDispatch } from '../../redux/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';

type Props = {};

const SignUpScreen = (props: Props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);

  const navigation = useNavigation();

  const onPressLogin = () => { };

  const onPressBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.Primary_Bg} />

      <LoginHeader title={'Sign Up'} description={'Please sign up to get started'} isBack={true} onPress={() => onPressBack()} />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.contentContainerStyle}>
          <Input
            value={name}
            placeholder="John doe"
            label={'Name'}
            onChangeText={(t: string) => setEmail(t)}
          />
          <Input
            value={email}
            placeholder="williams@david.com"
            label={'Email'}
            onChangeText={(t: string) => setName(t)}
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
          <Input
            value={rePassword}
            autoCorrect={false}
            isShowEyeIcon={true}
            placeholder="* * * * * * *"
            secureTextEntry={isShowPassword}
            label={"Re-Type Password"}
            onChangeText={(t: string) => setRePassword(t)}
            onPressEye={() => setIsShowPassword(!isShowPassword)}
          />

          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPressLogin}
            title={'Sign Up'}
          />
        </KeyboardAwareScrollView>
      </View>

    </View>
  );
};

export default SignUpScreen;

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
    signupButton: {
      marginTop: hp(47),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
};
