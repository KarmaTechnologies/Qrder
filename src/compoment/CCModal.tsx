import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { hp, wp } from '../theme/fonts';

type props = {
  visible: boolean;
  transparent?: boolean;
  contain?: any;
  close?: any;
  containStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  isIcon?: boolean;
  IsBackdropPress?: boolean;
};

const CCModal = ({
  visible = false,
  transparent = true,
  contain,
  close,
  containStyle,
  containerStyle,
  IsBackdropPress = true,
}: props) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      onBackdropPress={() => (IsBackdropPress ? close(false) : close(true))}
      style={[styles.container_style, containerStyle]}
      backdropColor="rgba(0, 0, 0, 0.8)">
      <>
        <View style={[styles.contain, containStyle]}>{contain}</View>
      </>
    </Modal>
  );
};

export default CCModal;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    contain: {
      width: '90%',
      backgroundColor: colors.card_bg,
      paddingHorizontal: wp(20),
      paddingVertical: hp(24),
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: hp(10),
      marginBottom: 0,
      borderRadius: wp(20),
      marginHorizontal: wp(20),
    },
    container_style: {
      width: '100%',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      justifyContent: 'center',
    },
  });
};
