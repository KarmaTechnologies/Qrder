//import liraries
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { SCREEN_HEIGHT, commonFontStyle, hp, wp } from '../theme/fonts';
import { useTheme } from '@react-navigation/native';
import { Icons } from '../utils/images';
import PrimaryButton from './PrimaryButton';

export type OrderModal = {
  isVisible: boolean;
  title: string;
  question: string;
  onPressYes: () => void;
  onPressCancel: () => void;
  isShow?: boolean
};

const OrderModal = ({
  isVisible,
  title,
  question,
  onPressCancel,
  onPressYes,
  isShow = false,
}: OrderModal) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

  const onPressDone = () => { };
  const onCancelBtn = () => { };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      statusBarTranslucentss
      animationIn={'fadeInUpBig'}
      animationInTiming={1000}
      animationOutTiming={1000}
      onBackButtonPress={onPressCancel}
      onBackdropPress={onPressCancel}
      style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View style={styles.container}>
        <View style={styles.lineStyle} />
        <View style={styles.headerView}>
          <Text style={styles.titleText}>{`${20} Running Orders`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
              return (
                <View style={styles.listContainer}>
                  <View style={styles.imageView} />

                  <View style={styles.rightContainer}>
                    <Text style={styles.breakText}>#Breakfast</Text>
                    <Text style={styles.titleStyle}>Chicken Thai Biriyani</Text>
                    <Text style={styles.idText}>ID: 32053</Text>
                    <Text style={styles.priceText}>$60</Text>
                  </View>
                  <View style={styles.btnContainer}>
                    <PrimaryButton
                      extraStyle={styles.doneBtn}
                      title={ isShow ? 'Add' : 'Done'}
                      titleStyle={styles.doneText}
                      onPress={() => onPressDone()}
                    />
                    <PrimaryButton
                      extraStyle={styles.cancelBtn}
                      title={isShow ? 'Add' : 'Cancel'}
                      titleStyle={styles.cancelText}
                      onPress={() => onCancelBtn()}
                    />
                  </View>
                </View>
              );
            })}
            <View style={{ height: 60 }} />
          </ScrollView>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const getGlobalStyles = (props: any) => {
  const { colors } = props;

  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      height: SCREEN_HEIGHT * 0.8,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    lineStyle: {
      width: wp(60),
      height: hp(6),
      backgroundColor: colors.lineColor,
      alignSelf: 'center',
      marginTop: hp(16),
      borderRadius: 5,
    },
    headerView: {
      paddingTop: hp(18),
      paddingHorizontal: wp(24),
    },
    titleText: {
      ...commonFontStyle(400, 17, colors?.headerText),
      marginBottom: hp(4),
    },
    listContainer: {
      marginTop: hp(20),
      height: hp(103),
      flexDirection: 'row',
    },
    imageView: {
      width: wp(102),
      height: hp(102),
      borderRadius: 20,
      backgroundColor: colors.image_Bg_gray,
    },
    rightContainer: {
      marginLeft: wp(12),
    },
    breakText: {
      ...commonFontStyle(400, 14, colors?.title_orange),
    },
    titleStyle: {
      ...commonFontStyle(700, 14, colors?.Title_Text),
    },
    idText: {
      ...commonFontStyle(400, 14, colors?.dropDownText),
    },
    priceText: {
      marginTop: hp(14),
      ...commonFontStyle(400, 18, colors?.Title_Text),
    },
    btnContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    doneBtn: {
      height: hp(36),
      paddingHorizontal: wp(13),
      borderRadius: 9,
    },
    doneText: {
      ...commonFontStyle(400, 14, colors?.white),
      textTransform: 'none',
    },
    cancelBtn: {
      height: hp(36),
      paddingHorizontal: wp(13),
      marginLeft: wp(15),
      backgroundColor: colors.white,
      borderColor: colors.btn_red,
      borderWidth: 1,
      borderRadius: 9,
    },
    cancelText: {
      ...commonFontStyle(400, 14, colors?.btn_red),
      textTransform: 'none',
    },
  });
};

export default OrderModal;
