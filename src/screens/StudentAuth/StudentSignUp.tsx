import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  DropDownDatas,
  emailCheck,
  errorToast,
  numberCheck,
  specialCarCheck,
  UpperCaseCheck,
} from '../../utils/commonFunction';
import {dispatchNavigation} from '../../utils/globalFunctions';
import {studentUserSignUp, userSignUp} from '../../actions/authAction';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import CCDropDown from '../../compoment/CCDropDown';
import { getUniversitiesDataAction } from '../../actions/commonAction';

type Props = {};

const StudentSignUp = (props: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [selectUniversity, setSelectUniversity] = useState('');
  const [hostelName, setHostelName] = useState('');
  const [hostelAddress, setHostelAddress] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [isShowRePassword, setisShowRePassword] = useState<boolean>(true);
  const {getUniversitiesData} = useAppSelector(state => state.data);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    getUniversitiesDataPress()
  }, []);

  const getUniversitiesDataPress = () => {
    let obj = {
      onSuccess: (res: any) => {},
      onFailure: (Err: any) => {},
    };
    dispatch(getUniversitiesDataAction(obj));
  };


  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressLogin = () => {
    if (name.trim().length === 0) {
      errorToast(strings('login.error_name'));
    } else if (email.trim().length === 0) {
      errorToast(strings('login.error_email'));
    } else if (!emailCheck(email)) {
      errorToast(strings('login.error_v_email'));
    } else if (number.trim().length === 0) {
      errorToast(strings('login.error_phone'));
    } else if (number.trim().length !== 10) {
      errorToast(strings('login.error_v_phone'));
    } else if (collegeName.trim().length == 0) {
      errorToast(strings('StudentSignUp.error_colleg_name'));
    } else if (selectUniversity === "") {
      errorToast(strings('StudentSignUp.error_university'));
    } else if (hostelName.trim().length === 0) {
      errorToast(strings('StudentSignUp.error_hostel'));
    } else if (hostelAddress.trim().length === 0) {
      errorToast(strings('StudentSignUp.error_hostel_address'));
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
      data.append('number', number);
      data.append('password', password);
      data.append('confirmed', rePassword);
      data.append('role', 'student');
      data.append('university_id', selectUniversity);
      data.append('status', '1');
      data.append('college_name', collegeName);
      data.append('hostel_name', hostelName);
      data.append('hostel_address', hostelAddress);

      let obj = {
        data,
        onSuccess: (response: any) => {
            dispatchNavigation(screenName.StudentSelect);
        },
        onFailure: (Err: any) => {
          if (Err != undefined) {
            Alert.alert(Err?.message);
          }
        },
      };
      dispatch(studentUserSignUp(obj));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.Primary_Bg}
      />

      <LoginHeader
        title={strings('StudentSignUp.student_register')}
        description={strings('sign_up.sign_dec')}
        isBack={true}
        onPress={() => onPressBack()}
      />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
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
            value={collegeName}
            placeholder={strings('StudentSignUp.enter_college')}
            label={strings('StudentSignUp.college_name')}
            onChangeText={(t: string) => setCollegeName(t)}
          />
          <CCDropDown
            data={getUniversitiesData}
            label={strings('StudentSignUp.university_name')}
            labelField={'name'}
            valueField={'id'}
            placeholder={strings('StudentSignUp.select_university_name')}
            DropDownStyle={styles.dropDownStyle}
            value={selectUniversity}
            setValue={setSelectUniversity}
            extraStyle={styles.extraStyle}
          />
          <Input
            value={hostelName}
            placeholder={strings('StudentSignUp.enter_name')}
            label={strings('StudentSignUp.hostel_name')}
            onChangeText={(t: string) => setHostelName(t)}
          />
          <Input
            value={hostelAddress}
            placeholder={strings('StudentSignUp.enter_hostel_address')}
            keyboardType="number-pad"
            label={strings('StudentSignUp.hostel_address')}
            onChangeText={(t: string) => setHostelAddress(t)}
            extraStyle={{zIndex: -1}}
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
            extraStyle={{zIndex: -1}}
          />
          <Input
            value={rePassword}
            autoCorrect={false}
            isShowEyeIcon={true}
            placeholder="* * * * * * *"
            secureTextEntry={isShowRePassword}
            label={strings('sign_up.re_type_password')}
            onChangeText={(t: string) => setRePassword(t)}
            onPressEye={() => setisShowRePassword(!isShowRePassword)}
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

export default StudentSignUp;

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
    extraStyle: {
      marginTop: hp(24),
    },
    dropDownStyle: {
      borderColor: colors.inputColor,
      backgroundColor: colors.inputColor,
      height: hp(60),
      borderRadius: 10,
    },
  });
};
