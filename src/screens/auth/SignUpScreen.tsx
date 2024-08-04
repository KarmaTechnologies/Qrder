import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getCityAction, searchCities} from '../../actions/commonAction';
import debounce from 'lodash/debounce';

type Props = {};

const SignUpScreen = (props: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [isShowRePassword, setisShowRePassword] = useState<boolean>(true);
  const [number, setNumber] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [canteenName, setCanteenName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [showListView, setShowListView] = useState(false);
  const {getCity, searchCity} = useAppSelector(state => state.common);
  const [filteredData, setFilteredData] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [area, setArea] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Restaurant');

  const options = [
    {label: strings('sign_up.restaurant'), value: 'Restaurant'},
    {label: strings('sign_up.canteen'), value: 'Canteen'},
  ];

  const handlePress = value => {
    setSelectedOption(value);
  };

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // getCityList()
  }, []);

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
      data.append('restaurant_name', restaurantName);
      data.append('slug', 'swad-tests');
      data.append('number', number);
      data.append('address', area);
      data.append('city_id', addressList?.id);
      data.append('state_id', addressList?.state?.id);
      data.append('country_id', addressList?.state?.country?.id);
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

  const getCityList = () => {
    let obj = {
      onSuccess: (res: any) => {},
      onFailure: (Err: any) => {},
    };
    dispatch(getCityAction(obj));
  };

  const debouncedFilterSearch = React.useCallback(
    debounce(searchText => {
      let UserInfo = {
        data: searchText,
        onSuccess: res => {},
        onFailure: Err => {},
      };
      dispatch(searchCities(UserInfo));
    }, 300),
    [],
  );
  const FilterSearch = (searchText: any) => {
    setCity(searchText);
    if (searchText.length >= 3) {
      debouncedFilterSearch(searchText);
    }

    // let text = searchText?.toLowerCase();
    // let filteredData = getCity?.filter(subItem => {
    //   return subItem?.name?.toLowerCase()?.includes(text);
    // });
    // setFilteredData(filteredData);
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
          nestedScrollEnabled
          contentContainerStyle={styles.contentContainerStyle}>
          <View
            style={styles.radioView}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioContainer}
                onPress={() => handlePress(option.value)}>
                <View
                  style={[
                    styles.radioButton,
                    selectedOption === option.value &&
                      styles.selectedRadioButton,
                  ]}>
                  {selectedOption === option.value && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text
                  style={[
                    styles.radioText,
                    {
                      color:
                        selectedOption === option.value
                          ? colors.Primary_Orange
                          : colors.Title_Text,
                    },
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
          {selectedOption === 'Restaurant' ? (
            <Input
              value={restaurantName}
              placeholder={strings('sign_up.restaurantName')}
              label={strings('sign_up.restaurantName')}
              onChangeText={(t: string) => setRestaurantName(t)}
            />
          ) : (
            <>
              <Input
                value={universityName}
                placeholder={strings('sign_up.university_name')}
                label={strings('StudentSignUp.university_name')}
                onChangeText={(t: string) => setUniversityName(t)}
              />
              <Input
                value={canteenName}
                placeholder={strings('sign_up.p_enter_canteen')}
                label={strings('sign_up.canteen_name')}
                onChangeText={(t: string) => setCanteenName(t)}
              />
            </>
          )}
          <Input
            value={area}
            placeholder={strings('sign_up.p_enter_area')}
            label={strings('sign_up.area')}
            onChangeText={(t: string) => setArea(t)}
          />
          <Input
            value={city}
            placeholder={strings('sign_up.p_enter_cty')}
            label={strings('sign_up.city')}
            onChangeText={(t: string) => FilterSearch(t)}
            showListView={showListView}
            searchData={searchCity}
            setShowListView={item => {
              setShowListView(false);
              setCity(item.name);
              setState(item?.state?.name);
              setCountry(item?.state?.country?.name);
              setAddressList(item);
            }}
            onFocus={() => {
              setShowListView(true);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              zIndex: -1,
            }}>
            <Input
              value={state}
              placeholder={strings('sign_up.p_enter_state')}
              label={strings('sign_up.state')}
              onChangeText={(t: string) => setState(t)}
              showListView={false}
              extraStyle={{zIndex: -1, width: '48.9%'}}
            />
            <Input
              value={country}
              placeholder={strings('sign_up.p_enter_country')}
              label={strings('sign_up.country')}
              onChangeText={(t: string) => setCountry(t)}
              extraStyle={{zIndex: -1, width: '49%'}}
            />
          </View>
          <Input
            value={pincode}
            placeholder={strings('sign_up.p_enter_pincode')}
            keyboardType="number-pad"
            label={strings('sign_up.pincode')}
            onChangeText={(t: string) => setPincode(t)}
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
    radioView:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: hp(15),
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRadioButton: {
      borderColor: colors.Primary_Orange,
    },
    radioButtonInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: colors.Primary_Orange,
    },
    radioText: {
      marginLeft: 10,
      ...commonFontStyle(400, 14, colors.Title_Text),
    },
  });
};
