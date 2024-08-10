import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import PrimaryButton from '../../compoment/PrimaryButton';
import { screenName } from '../../navigation/screenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginHeader from '../../compoment/LoginHeader';
import { strings } from '../../i18n/i18n';
import CCDropDown from '../../compoment/CCDropDown';
import { DropDownData, errorToast } from '../../utils/commonFunction';
import { useAppDispatch } from '../../redux/hooks';
import { selectRoleAction } from '../../actions/commonAction';
import { Icons } from '../../utils/images';

type Props = {};

const RoleSelectionScreen = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [selectRole, setSelectRole] = useState('');


  const onPressRole = () => {
    if (selectRole.trim().length === 0) {
      errorToast(strings('roleSelection.error_role'));
    } else {
      dispatch(selectRoleAction(selectRole));
      setTimeout(() => {
        navigation.navigate(screenName.SignInScreen, { role: selectRole });
      }, 500)
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.Primary_Bg}
      />

      <LoginHeader
        title={strings('roleSelection.select_role')}
        description={strings('login.login_dec')}
        isBack={false}
      />

      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.contentContainerStyle}>
          <CCDropDown
            data={DropDownData}
            label={strings('login.select_role')}
            labelField={'name'}
            valueField={'value'}
            placeholder={strings('login.role')}
            DropDownStyle={styles.dropDownStyle}
            value={selectRole}
            setValue={setSelectRole}
            extraStyle={styles.extraStyle}
          />

          <PrimaryButton
            extraStyle={styles.signupButton}
            onPress={onPressRole}
            title={strings('roleSelection.continue')}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default RoleSelectionScreen;

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
    roundView: {
      backgroundColor: colors.Primary_Orange,
      borderRadius: 12,
      width: wp(24),
      height: wp(24),
      alignItems: 'center',
      justifyContent: 'center'
    },
    rightIcon: {
      width: wp(12),
      height: hp(12),
      resizeMode: 'contain',
      tintColor: colors.white
    },
    countText:{
      paddingHorizontal: wp(10),
      ...commonFontStyle(400, 16, colors.black),
    }
  });
};
