import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {hp, wp} from '../../theme/fonts';
import Input from '../../compoment/Input';
import PrimaryButton from '../../compoment/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import {screenName} from '../../navigation/screenNames';
import {strings} from '../../i18n/i18n';
import Spacer from '../../compoment/Spacer';
import {
  emailCheck,
  errorToast,
  numberCheck,
  specialCarCheck,
  UpperCaseCheck,
} from '../../utils/commonFunction';
import {dispatchNavigation} from '../../utils/globalFunctions';
import {userSignUp} from '../../actions/authAction';
import {useAppDispatch} from '../../redux/hooks';

type Props = {};

const SignUpScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [area, setArea] = useState('');
  const [number, setNumber] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressLogin = () => {
    if (name.trim().length === 0) {
      errorToast('');
      errorToast(strings('login.error_name'));
    } else if (email.trim().length === 0) {
      errorToast(strings('login.error_email'));
    } else if (!emailCheck(email)) {
      errorToast(strings('login.error_v_email'));
    } else if (number.trim().length === 0) {
      errorToast(strings('login.error_phone'));
    } else if (number.trim().length !== 10) {
      errorToast(strings('login.error_v_phone'));
    } else if (restaurantName.trim().length == 0) {
      errorToast(strings('login.error_restaurantName'));
    } else if (city.trim().length === 0) {
      errorToast(strings('login.error_city'));
    } else if (state.trim().length === 0) {
      errorToast(strings('login.error_state'));
    } else if (country.trim().length === 0) {
      errorToast(strings('login.error_country'));
    } else if (pincode.trim().length === 0) {
      errorToast(strings('login.error_pincode'));
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
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('confirmed', rePassword);
      data.append('restaurant_name', 'test');
      data.append('slug', 'swad-tests');
      data.append('number', number);
      data.append('address', 'test');
      data.append('role', 'admin');
      data.append('status', '1');
      let obj = {
        data,
        onSuccess: (response: any) => {
          dispatchNavigation(screenName.BottomTabBar);
          setEmail('');
          setPassword('');
        },
        onFailure: (Err: any) => {
          if (Err != undefined) {
            Alert.alert(Err?.message);
          }
        },
      };
      dispatch(userSignUp(obj));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.Primary_Bg}
      />

      <LoginHeader
        title={strings('sign_up.sign_up')}
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

          <Input
            value={number}
            placeholder={strings('sign_up.p_enter_number')}
            keyboardType="number-pad"
            label={strings('sign_up.p_enter_number')}
            onChangeText={(t: string) => setNumber(t)}
            maxLength={10}
          />
          <Input
            value={restaurantName}
            placeholder={strings('sign_up.restaurantName')}
            label={strings('sign_up.restaurantName')}
            onChangeText={(t: string) => setRestaurantName(t)}
          />
          <Input
            value={city}
            placeholder={strings('sign_up.p_enter_cty')}
            label={strings('sign_up.city')}
            onChangeText={(t: string) => setCity(t)}
          />
          <Input
            value={state}
            placeholder={strings('sign_up.p_enter_state')}
            label={strings('sign_up.state')}
            onChangeText={(t: string) => setState(t)}
          />
          <Input
            value={country}
            placeholder={strings('sign_up.p_enter_country')}
            label={strings('sign_up.country')}
            onChangeText={(t: string) => setCountry(t)}
          />
          {/* <Input
            value={area}
            placeholder={strings("sign_up.p_enter_area")}
            label={strings("sign_up.area")}
            onChangeText={(t: string) => setArea(t)}
          /> */}
          <Input
            value={pincode}
            placeholder={strings('sign_up.p_enter_pincode')}
            keyboardType="number-pad"
            label={strings('sign_up.pincode')}
            onChangeText={(t: string) => setPincode(t)}
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
          <Spacer height={20} />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
      marginTop: hp(47),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
