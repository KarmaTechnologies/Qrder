import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { hp, wp } from '../../theme/fonts';
import PrimaryButton from '../../compoment/PrimaryButton';
import { screenName } from '../../navigation/screenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import { strings } from '../../i18n/i18n';
import CCDropDown from '../../compoment/CCDropDown';
import { DropDownData, DropDownDatas } from '../../utils/commonFunction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUniversitiesDataAction, selectRoleAction } from '../../actions/commonAction';

type Props = {};

const StudentSelect = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [selectRole, setSelectRole] = useState('');
  const {getUniversitiesData} = useAppSelector(state => state.data);

  const onPressSelect = () => {
    navigation.navigate(screenName.StudentBottomBar)
  };


  console.log('getUniversitiesData',getUniversitiesData);
  

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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.Primary_Bg}
      />

      <LoginHeader
        title={strings('StudentSignUp.select_university')}
        isBack={false}
      />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.contentContainerStyle}>
          <CCDropDown
            data={getUniversitiesData}
            label={strings('StudentSignUp.university_name')}
            labelField={'name'}
            valueField={'id'}
            placeholder={strings('StudentSignUp.select_university_name')}
            DropDownStyle={styles.dropDownStyle}
            value={selectRole}
            setValue={setSelectRole}
            extraStyle={styles.extraStyle}
          />

          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPressSelect}
            title={strings('roleSelection.continue')}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default StudentSelect;

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
    dropDownStyle: {
      borderColor: colors.inputColor,
      backgroundColor: colors.inputColor,
      height: hp(60),
      borderRadius: 10,
    },
    extraStyle: {
      marginTop: hp(24),
    },
    signupButton: {
      marginTop: hp(30),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
