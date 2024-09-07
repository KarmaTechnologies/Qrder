import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { strings } from '../i18n/i18n';
import { useAppSelector } from '../redux/hooks';

type HomeProps = {
  onPressLocation?: () => void;
  onPressCart?: () => void;
  onPressProfile?: () => void;
  onRightPress?: () => void;
  onBackPress?: () => void;
  location?: any;
  mainShow?: any;
  rightShowView?: any;
  title?: string;
  extraStyle?: ViewStyle;
  isHideIcon?: boolean
  rightText?: string
  isShowIcon?: boolean;
  rightTextStyle: any;
  isCardIcon?: boolean
};

const HomeHeader = ({
  onPressLocation,
  onPressCart,
  location,
  mainShow,
  rightShowView,
  onRightPress,
  onBackPress,
  title = '',
  extraStyle = {},
  isHideIcon = false,
  rightText,
  isShowIcon = true,
  rightTextStyle,
  isCardIcon = false
}: HomeProps) => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const { getCardData } = useAppSelector(state => state.data);
  const { isDarkTheme } = useAppSelector(state => state.common);


  const onPressBell = () => {
    // @ts-ignore
    navigate(screenName.Notifications);
  };

  if (mainShow) {
    return (
      <SafeAreaView edges={['top']} style={[styles?.container, extraStyle]}>
        <View style={styles.address_container}>
          <TouchableOpacity style={styles.location_icon} onPress={onBackPress}>
            <Image source={Icons?.leftback} style={styles?.backIcon} />
          </TouchableOpacity>
          <View style={[styles.headerTitle]}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        {isShowIcon ?
          <TouchableOpacity onPress={onRightPress}>
            {isHideIcon ? <Text style={[styles.resetText, rightTextStyle]}>{rightText}</Text> : <Image source={Icons?.option} style={styles?.header_logo} />}
          </TouchableOpacity> : null}
        {isCardIcon ?
          <View>
            <Image
              source={Icons.cart1}
              style={styles.cardIcon}
            />
            <View
              style={styles.cardCount}>
              <Text
                style={styles.cardText}>
                {getCardData?.length}
              </Text>
            </View>
          </View> : null}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles?.container}>
      <View style={styles.address_container}>
        <TouchableOpacity style={styles.location_icon} >
          <Image source={Icons?.left_menu} style={styles?.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLocation} style={styles.location}>
          <Text style={styles.home_title}>{strings("home.location")}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text numberOfLines={1} style={styles.addrs}>
              {'location'}
            </Text>
            <Image source={Icons?.arrow_down} style={styles?.arrow_down} />
          </View>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.location_icon} onPress={onPressCart}>
        <Image source={Icons?.cart} style={styles?.header_logo} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeHeader;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      backgroundColor: colors?.white,
      paddingVertical: hp(8),
      paddingBottom: hp(10),
      paddingHorizontal: wp(16),
      flexDirection: 'row',
      alignItems: 'center',
    },
    header_logo: {
      width: wp(45),
      height: wp(45),
      borderRadius: wp(45),
      resizeMode: 'contain',
    },
    arrow_down: {
      width: wp(9),
      height: wp(9),
      resizeMode: 'contain',
      tintColor: colors.black
    },
    location: {
      marginLeft: 8,
    },
    headerTitle: {
      marginLeft: wp(16),
    },
    location_icon: {
      width: wp(45),
      height: wp(45),
      borderRadius: wp(45) / 2,
      backgroundColor:colors.back_bg,
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center'
    },
    backIcon: {
      width: wp(8),
      height: hp(16),
      tintColor:colors.black
    },
    menuIcon:{
      width: wp(16),
      height: hp(16),
      tintColor:colors.black
    },
    home_title: {
      ...commonFontStyle(700, 12, colors.headerText1),
    },
    addrs: {
      ...commonFontStyle(400, 14, colors.headerText2),
      marginRight: wp(10)
    },
    address_container: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    profile: {
      width: wp(26),
      height: wp(26),
      borderRadius: wp(50),
      backgroundColor: colors.green_4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profile_text: {
      ...commonFontStyle(700, 16, colors.black),
    },
    title: {
      ...commonFontStyle(400, 17, colors.headerText),
    },
    resetText: {
      ...commonFontStyle(400, 14, colors.headerText3),
    },
    cardIcon: {
      width: 24,
      height: 24,
      tintColor: colors.Primary_Orange,
    },
    cardCount: {
      position: 'absolute',
      backgroundColor: colors.Primary_Orange,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16 / 2,
      right: -4,
      top: -5
    },
    cardText: {
      ...commonFontStyle(700, 10, colors.white),
    }
  });
};
