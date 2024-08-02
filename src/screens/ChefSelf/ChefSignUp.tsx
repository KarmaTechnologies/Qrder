import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { hp, wp } from '../../theme/fonts';
import Input from '../../compoment/Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import { screenName } from '../../navigation/screenNames';
import { strings } from '../../i18n/i18n';
import CCDropDown from '../../compoment/CCDropDown';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  emailCheck,
  errorToast,
  numberCheck,
  specialCarCheck,
  UpperCaseCheck,
} from '../../utils/commonFunction';
import { chefsSignUp } from '../../actions/chefsAction';
import Spacer from '../../compoment/Spacer';
import { getAsyncUserInfo } from '../../utils/asyncStorageManager';
import { dispatchNavigation } from '../../utils/globalFunctions';

type Props = {};

const ChefSignUp = (props: Props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState(0);
  const [rePassword, setRePassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [quantityValue, setQuantityValue] = useState(0);
  const { getCuisines } = useAppSelector(state => state.data);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressLogin = async () => {
    if (name.trim().length === 0) {
      errorToast(strings('login.error_name'));
    } else if (email.trim().length === 0) {
      errorToast(strings('login.error_email'));
    } else if (!emailCheck(email)) {
      errorToast(strings('login.error_v_email'));
    } else if (quantityValue == 0) {
      errorToast(strings('chefSignUp.select_cusine_error'));
    } else if (phone.trim().length === 0) {
      errorToast(strings('login.error_phone'));
    } else if (phone.trim().length !== 10) {
      errorToast(strings('login.error_v_phone'));
    } else if (salary == 0) {
      errorToast(strings('login.error_v_phone'));
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
    } else if (rePassword.trim().length === 0) {
      errorToast(strings('login.error_re_tyre'));
    } else if (rePassword.trim() !== password.trim()) {
      errorToast(strings('login.error_re_tyre_match'));
    } else {
      var data = new FormData();
      const userDetails = await getAsyncUserInfo()
      console.log("-->>", userDetails?.parent_id)

      data.append('parent_id', userDetails?.id)
      data.append('name', name);
      data.append('email', email);
      data.append('cuisine_id', quantityValue);
      data.append('number', phone);
      data.append('password', password);
      data.append('confirmed', rePassword);
      data.append('salary', salary);

      let obj = {
        data,
        onSuccess: (response: any) => {
          dispatchNavigation(screenName.SignInScreen);
          setName('');
          setEmail('');
          setQuantityValue(0);
          setPhone('');
          setPassword('');
          setRePassword('')
          setSalary(0)

        },
        onFailure: (Err: any) => {
          if (Err != undefined) {
            Alert.alert(Err?.message);
          }
        },
      };
      dispatch(chefsSignUp(obj));
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };
 
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.Primary_Bg}
      />

      <LoginHeader
        title={strings('chefSignUp.chef_register')}
        description={strings('sign_up.sign_dec')}
        isBack={true}
        onPress={() => onPressBack()}
      />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <Input
            value={name}
            placeholder={strings('sign_up.p_name')}
            label={strings('sign_up.name')}
            onChangeText={(t: string) => setName(t)}
          />
          <Input
            value={email}
            placeholder={strings('sign_up.p_email')}
            label={strings('sign_up.email')}
            onChangeText={(t: string) => setEmail(t)}
          />
          <CCDropDown
            data={getCuisines}
            label={strings('chefSignUp.select_cusine')}
            labelField={'name'}
            valueField={'id'}
            placeholder={strings('addFoodList.select_cusine')}
            DropDownStyle={styles.dropDownStyle}
            value={quantityValue}
            setValue={setQuantityValue}
            extraStyle={styles.extraStyle}
          />
          <Input
            value={phone}
            returnKeyType="next"
            placeholder={'123456789'}
            label={strings('chefSignUp.phone_Number')}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={(t: string) => setPhone(t.trim())}
          />
          <Input
            value={salary}
            returnKeyType="next"
            placeholder={strings('chefSignUp.p_salary')}
            label={strings('chefSignUp.salary')}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={(t: string) => setSalary(t.trim())}
          />
          <Input
            value={password}
            autoCorrect={false}
            isShowEyeIcon={true}
            secureTextEntry={isShowPassword}
            placeholder="* * * * * * *"
            label={strings('sign_up.password')}
            onChangeText={(t: string) => setPassword(t)}
            onPressEye={() => setIsShowPassword(!isShowPassword)}
          />
          <Input
            value={rePassword}
            autoCorrect={false}
            isShowEyeIcon={true}
            placeholder="* * * * * * *"
            secureTextEntry={isShowPassword}
            label={strings('sign_up.re_type_password')}
            onChangeText={(t: string) => setRePassword(t)}
            onPressEye={() => setIsShowPassword(!isShowPassword)}
          />

          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPressLogin}
            title={strings('sign_up.sign_up')}
          />
          <Spacer height={hp(20)} />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ChefSignUp;

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
      borderTopRightRadius: 24,
    },
    contentContainerStyle: {
      paddingHorizontal: wp(24),
    },
    signupButton: {
      marginTop: hp(47),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
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
