//import liraries
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { SCREEN_HEIGHT, commonFontStyle, hp, wp } from '../theme/fonts';
import { useTheme } from '@react-navigation/native';
import PrimaryButton from './PrimaryButton';
import { strings } from '../i18n/i18n';
import CCDropDown from './CCDropDown';
import { useAppSelector } from '../redux/hooks';
import Spacer from './Spacer';

export type OrderModal = {
  isVisible: boolean;
  title: string;
  question: string;
  onPressYes: () => void;
  onPressCancel: () => void;
  isRunning?: boolean;
};

const OrderModal = ({
  isVisible,
  title,
  question,
  onPressCancel,
  onPressYes,
  isRunning = false,
}: OrderModal) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [selectedChefs, setSelectedChefs] = useState('');
  const { getChefsData } = useAppSelector(state => state.data);

  const onPressDone = () => { };
  const onCancelBtn = () => { };


  const handleChefSelection = (value: string, index: number) => {
    setSelectedChefs(prevState => ({
      ...prevState,
      [index]: value,
    }));
  };

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
          <Text style={styles.titleText}>
            {isRunning ? `${20} ${strings('orderModal.running_orders')}` : `${5} ${strings('orderModal.order_request')}`}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6].map((value, index) => {
              return (
                <View style={styles.listContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageView} />

                    <View style={styles.rightContainer}>
                      <Text style={styles.breakText}>Invoice ID: #32053</Text>
                      <Text style={styles.titleStyle}>Kartik Patel</Text>
                      <Text style={styles.idText}>Table No: 32</Text>
                      <View style={styles.priceView}>
                        <Text
                          style={[
                            styles.priceText,
                            // { marginTop: isRunning ? hp(0) : hp(14) },
                          ]}>
                          ₹60
                        </Text>
                        <Text
                          style={[
                            styles.dateText,
                            // { marginTop: isRunning ? hp(0) : hp(14) },
                          ]}>
                          18 January 2024
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.diningView}>
                      <Text style={styles.diningText}>Dining</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[
                      styles.btnContainer,
                      // { bottom: isRunning ? 0 : 2 },
                    ]}>
                    {isRunning ? (
                      <View style={{ flexDirection: 'row' }}>
                        <PrimaryButton
                          extraStyle={styles.cancelBtn}
                          title={strings('orderModal.cancel')}
                          titleStyle={styles.cancelText}
                          onPress={() => onCancelBtn()}
                        />
                      </View>
                    ) : (
                      <View style={{ flexDirection: 'row' }}>
                        <PrimaryButton
                          extraStyle={styles.accpetBtn}
                          title={strings('orderModal.accpet')}
                          titleStyle={styles.accpetText}
                          onPress={() => onCancelBtn()}
                        />
                        <Spacer width={16}/>
                        <PrimaryButton
                          extraStyle={styles.cancelBtn}
                          title={strings('orderModal.declined')}
                          titleStyle={styles.cancelText}
                          onPress={() => onCancelBtn()}
                        />
                      </View>
                      // <CCDropDown
                      //   data={getChefsData}
                      //   label={''}
                      //   labelField={'name'}
                      //   valueField={'id'}
                      //   placeholder={strings('orderModal.select_chef')}
                      //   DropDownStyle={styles.dropDownStyle}
                      //   value={selectedChefs[index]}
                      //   setValue={value => handleChefSelection(value, index)}
                      // />
                    )}
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
      backgroundColor: colors.bg_white,
      height: SCREEN_HEIGHT * 0.8,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    lineStyle: {
      width: wp(40),
      height: hp(4),
      backgroundColor: colors.text_gray,
      alignSelf: 'center',
      marginTop: hp(16),
      borderRadius: 5,
    },
    headerView: {
      paddingTop: hp(16),
      paddingHorizontal: wp(20),
    },
    titleText: {
      ...commonFontStyle(500, 20, colors?.black),
      marginBottom: hp(4),

    },
    listContainer: {
      marginTop: hp(16),
      backgroundColor: colors.cards_bg,
      paddingVertical: hp(16),
      paddingHorizontal: wp(16),
      borderRadius: 16,
    },
    imageView: {
      width: wp(70),
      height: hp(70),
      borderRadius: 16,
      backgroundColor: colors.image_bg,
    },
    rightContainer: {
      marginLeft: wp(10),
      flex: 1,
    },
    breakText: {
      ...commonFontStyle(400, 10, colors?.text_orange),
    },
    titleStyle: {
      ...commonFontStyle(600, 14, colors?.black),
    },
    idText: {
      marginTop: hp(2),
      ...commonFontStyle(400, 12, colors?.title_dec),
    },
    priceView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    priceText: {
      ...commonFontStyle(600, 16, colors?.text_orange),
    },
    dateText: {
      ...commonFontStyle(500, 14, colors?.text_gray),
    },
    btnContainer: {

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
      flex: 1,
      height: hp(34),
      marginTop: hp(16),
      backgroundColor: colors.cards_bg,
      borderColor: colors.title_dec,
      borderWidth: 1,
      borderRadius: 8,
    },
    cancelText: {
      ...commonFontStyle(600, 14, colors?.title_dec),
      textTransform: 'none',
    },
    accpetBtn:{
      flex: 1,
      height: hp(34),
      marginTop: hp(16),
      backgroundColor: colors.text_orange,
      borderColor: colors.text_orange,
      borderWidth: 1,
      borderRadius: 8,
    },
    accpetText: {
      ...commonFontStyle(600, 14, colors?.defult_white),
      textTransform: 'none',
    },
    dropDownStyle: {
      borderColor: colors.border_line4,
      width: wp(120),
      height: hp(30),
      borderRadius: 5,
    },
    diningView: {
      position: 'absolute',
      top: -2,
      right: 0,
      backgroundColor: colors.text_orange,
      paddingHorizontal: wp(6),
      paddingVertical: hp(2),
      borderRadius: 16,
    },
    diningText: {
      ...commonFontStyle(500, 12, colors?.defult_white),
    }
  });
};

export default OrderModal;
