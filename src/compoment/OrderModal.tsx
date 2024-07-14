//import liraries
import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  commonFontStyle,
  h,
  hp,
  w,
  wp,
} from '../theme/fonts';
import {useTheme} from '@react-navigation/native';
import {Icons} from '../utils/images';

export type OrderModal = {
  isVisible: boolean;
  title: string;
  question: string;
  onPressYes: () => void;
  onPressCancel: () => void;
};

const OrderModal = ({
  isVisible,
  title,
  question,
  onPressCancel,
  onPressYes,
}: OrderModal) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [selectIndex, setSelectIndex] = useState(1);
  const [keyboardVale, setKeyboardVale] = useState(false);

  return (
    <ReactNativeModal
      isVisible={isVisible}
      statusBarTranslucent
      animationIn={'fadeInUpBig'}
      animationInTiming={1000}
      animationOutTiming={1000}
onBackButtonPress={onPressCancel}
onBackdropPress={onPressCancel}
      style={{justifyContent:'flex-end',margin:0}}>
      <View style={styles.container}>
        <View style={styles.lineStyle}/>
        <View style={styles.headerView}>
          <Text></Text>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const getGlobalStyles = (props: any) => {
  const {colors} = props;

  return StyleSheet.create({
    container: {
      // padding: wp(14),
      // paddingVertical: hp(25),
      backgroundColor: colors.white,
      height: SCREEN_HEIGHT * 0.8,
      borderTopLeftRadius:30,
      borderTopRightRadius:30
    },
    lineStyle:{
      width:90,
      height:6,
      backgroundColor:colors.lineColor,
      alignSelf:'center',
      marginTop:5,
      borderRadius:5
    },
    headerView: {
      // flexDirection: 'row',
      // alignItems: 'center',
      // paddingHorizontal: 24,
      // paddingVertical: 12,
    },

    btnText: {
      ...commonFontStyle(500, 14, colors?.black),
    },
  });
};

export default OrderModal;
