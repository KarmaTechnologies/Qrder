import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {SCREEN_HEIGHT, commonFontStyle, hp, wp} from '../theme/fonts';
import {useTheme} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {Icon} from 'react-native-paper';
import PrimaryButton from './PrimaryButton';
import {RootState, useAppDispatch} from '../redux/hooks';
import {useSelector} from 'react-redux';
import { Icons } from '../utils/images';
import { strings } from '../i18n/i18n';
import { infoToast } from '../utils/commonFunction';
import { addCuisinesAction } from '../actions/cuisinesAction';
import { getAsyncUserInfo } from '../utils/asyncStorageManager';

export default function AddFolderModal({isVisible, onClose, path}: any) {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [addText, setAddText] = useState('');
  const dispatch = useAppDispatch();

  const onPressNewAdd = async() => {
    if (addText == '') {
      infoToast(strings("addFoodList.error_enter"))
    } else {
      const userDetails = await getAsyncUserInfo()

      let data = new FormData();
      data.append('name', addText);
      data.append('parent_id', userDetails?.id);

      let obj = {
        data,
        onSuccess: (response: any) => {
          onClose();
          setAddText("")
        },
        onFailure: (Err: any) => {
          if (Err != undefined) {
            Alert.alert('Warning', Err?.message);
          }
        },
      };
      dispatch(addCuisinesAction(obj));
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      statusBarTranslucent
      animationIn={'fadeInUpBig'}
      animationInTiming={1000}
      animationOutTiming={1000}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{margin: 0, justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={styles.rowStyle}>
          <Text style={styles.itemText}>{strings("addFoodList.new_Folder")}</Text>
          <TouchableOpacity onPress={onClose}>
            <Image source={Icons.close} style={styles.close} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.inputStyle}
          value={addText}
          onChangeText={setAddText}
          placeholder={strings("addFoodList.enter_cuisine")}
          placeholderTextColor={colors.gray_300}
        />
        <PrimaryButton
          extraStyle={styles.signupButton}
          onPress={onPressNewAdd}
          title={strings("addFoodList.add_cuisine")}
        />
      </View>
    </ReactNativeModal>
  );
}

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    itemText: {
      ...commonFontStyle(400, 18, colors.black),
      opacity: 0.7,
      textAlign: 'center',
      marginBottom: hp(20),
      flex: 1,
    },
    container: {
      // padding: wp(14),
      borderRadius: 16,
      // paddingVertical: hp(25),
      backgroundColor: colors.card_bg,
      // height: SCREEN_HEIGHT * 0.4,
      paddingHorizontal: wp(16),
      paddingVertical: hp(10),
      marginHorizontal: wp(16),
    },
    check1: {
      width: 18,
      height: 18,
    },
    rowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      // justifyContent: 'space-between',
      paddingVertical: 15,
      // paddingHorizontal: 10,
    },
    listText: {
      ...commonFontStyle(400, 16, colors.black),
    },
    inputStyle: {
      ...commonFontStyle(400, 16, colors.black),
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.gray_300,
      paddingLeft: 12,
      height: hp(50)
    },
    signupButton: {
      marginTop: 20,
      alignSelf: 'center',
      height: hp(45),
      width: wp(200),
    },
    close: {
      height: wp(22),
      width: wp(22),
      top: -30,
      position: 'absolute',
      right: 0,
      tintColor:colors.black
    },
  });
};
