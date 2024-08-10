import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import HomeHeader from '../../compoment/HomeHeader';
import {strings} from '../../i18n/i18n';
import Input from '../../compoment/Input';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import PrimaryButton from '../../compoment/PrimaryButton';
import {Icons} from '../../utils/images';

type Props = {};

const StudentCheckOut = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const {isDarkTheme} = useAppSelector(state => state.common);
  const [names, setName] = useState<string>('');
  const [emails, setEmail] = useState<string>('');
  const [numbers, setNumber] = useState<string>('');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />
      <HomeHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        mainShow={true}
        title={strings('Cart.CheckOut')}
        extraStyle={styles.headerContainer}
        isHideIcon={true}
        isShowIcon={false}
      />
      <ScrollView style={{marginHorizontal: wp(24)}} showsVerticalScrollIndicator={false}>
        <View style={[styles.addressContainer]}>
          <Text style={styles.youOrderText}>Your Order</Text>
          <View style={styles.lineStyle} />
          <FlatList
            data={[1, 2]}
            ListEmptyComponent={() => {
              return (
                <View style={{marginVertical: 20, alignSelf: 'center'}}>
                  <Text style={styles.noProductText}>No product found</Text>
                </View>
              );
            }}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: wp(16),
                    paddingVertical: hp(16),
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={styles.text1}>{'name item'}</Text>
                    <Text style={styles.text2}>{'item?.unit'}</Text>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={styles.rowStyle}>
                      <Image source={Icons.delete} style={styles.iconStyle} />
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                    {/* <View style={[styles.rowStyle, { marginTop: 7 }]}>
                <Image source={icons.like} style={styles.iconStyle} />
                <Text style={styles.removeText1}>Move to wish list</Text>
              </View> */}
                  </View>
                  <View>
                    <View style={styles.imageContainer}>
                      <View style={styles.imageStyle} />
                    </View>
                    <Text style={styles.footerRightText}>{`$${10}`}</Text>
                  </View>
                </View>
              );
            }}
          />

          <View style={styles.lineStyle} />
          <View style={[styles.rowStyle, styles.rowSubStyle]}>
            <Text style={styles.listLeftText}>Sub Total</Text>
            <Text style={styles.listRightText}>{`$${20}`}</Text>
          </View>
        </View>
        <Input
          value={names}
          placeholder={strings('sign_up.p_name')}
          label={strings('sign_up.name')}
          onChangeText={(t: string) => setName(t)}
        />
        <Input
          value={emails}
          placeholder={strings('sign_up.p_email')}
          label={strings('sign_up.email')}
          onChangeText={(t: string) => setEmail(t)}
        />

        <Input
          value={numbers}
          placeholder={strings('sign_up.p_enter_number')}
          keyboardType="number-pad"
          label={strings('PersonalInfo.phone_number')}
          onChangeText={(t: string) => setNumber(t)}
          maxLength={10}
        />
        <PrimaryButton
          extraStyle={styles.signupButton}
          onPress={() => {}}
          title={strings('Cart.CheckOut')}
        />
      </ScrollView>
    </View>
  );
};

export default StudentCheckOut;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerContainer: {
      backgroundColor: colors.white,
    },
    addressContainer: {
      backgroundColor: colors.white,
      shadowColor: 'rgba(1, 136, 255, 0.10)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 8,
      marginTop: hp(20),
    },
    youOrderText: {
      marginLeft: wp(16),
      marginVertical: hp(16),
      ...commonFontStyle(600, 16, colors.headerText),
    },
    lineStyle: {
      borderWidth: 0.4,
      borderColor: colors.border_line4,
    },
    noProductText: {
      ...commonFontStyle(600, 16, colors.black),
    },
    text1: {
      ...commonFontStyle(600, 12, colors.headerText),
    },
    text2: {
      marginTop: 8,
      marginBottom: 15,
      ...commonFontStyle(600, 12, colors.gray_400),
    },
    rowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    removeText: {
      ...commonFontStyle(500, 13, colors.red),
    },
    iconStyle: {
      width: wp(14),
      height: wp(14),
      resizeMode: 'contain',
      marginRight: 5,
    },
    footerRightText: {
      textAlign: 'center',
      marginTop: 16,
      ...commonFontStyle(600, 14, colors.headerText),
    },
    listLeftText: {
      ...commonFontStyle(600, 10, colors.gray_400),
    },
    listRightText: {
      right: 4,
      ...commonFontStyle(600, 14, colors.headerText),
    },
    listRightText1: {
      right: 4,
      ...commonFontStyle(600, 10, colors.gray_400),
    },
    rowSubStyle: {
      justifyContent: 'space-between',
      marginHorizontal: wp(16),
      marginVertical: 10,
    },
    imageContainer: {
      borderWidth: 1,
      width: wp(54),
      height: wp(54),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.headerText,
      // backgroundColor: colors.white,
      // alignSelf: "center",
      overflow: 'hidden',
    },
    imageStyle: {
      width: wp(54),
      height: wp(54),
      resizeMode: 'contain',
      borderRadius: 8,
    },
    signupButton: {
      marginTop: 20,
      marginBottom:30,
      marginHorizontal: wp(24),
      height: hp(50),
    },
  });
};
