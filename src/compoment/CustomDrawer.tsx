import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  Switch,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {SCREEN_WIDTH, commonFontStyle, h, hp, w} from '../theme/fonts';
import {AppStyles} from '../theme/appStyles';
import {Icons} from '../utils/images';
import {screenName} from '../navigation/screenNames';
import {setDarkTheme} from '../utils/commonActions';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {dispatchNavigation} from '../utils/globalFunctions';
import {clearAsync} from '../utils/asyncStorageManager';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  title: string;
  onPress?: () => void;
  isYellow?: boolean;
  extraStyle?: ViewStyle;
};

const CustomDrawer = ({
  title,
  onPress = undefined,
  isYellow = true,
  extraStyle = {},
}: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const navigation = useNavigation();
  const {isDarkTheme} = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();

  const [selectValue, setSelectValue] = useState(false);
  let data = [
    // { name: 'Live tracking', screen: screenName.LiveTrackingScreen, image: Icons.liveTracking },
    {
      name: 'Home',
      screen: screenName.HomeScreen,
      image: Icons.home,
    },
    {
      name: 'Route',
      screen: screenName.RouteScreen,
      image: Icons.router,
    },
    {
      name: 'Weekly Rewards',
      screen: screenName.WeeklyRewardsScreen,
      image: Icons.weeklyRewards,
    },
    {
      name: 'Settings',
      screen: screenName.SettingScreen,
      image: Icons.setting,
    },
    // { name: 'Support', screen: screenName.SupportScreen, image: Icons.support },
    {
      name: 'Invite Friends',
      screen: screenName.InviteFriendScreen,
      image: Icons.share,
    },
    {name: 'Top Up', screen: screenName.TopUpScreen, image: Icons.topup},
  ];

  const changeValue = () => {
    dispatch(setDarkTheme(!isDarkTheme));
    setSelectValue(!selectValue);
  };
  return (
    <View style={styles.mainView}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate(screenName.ProfileScreen)}>
            <Image source={Icons.user} style={styles.userImage} />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.username}>
            Davis Rosser
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                clearAsync();
                dispatchNavigation(screenName.LoginSignupScreen);
              }}>
              <Image source={Icons.logout} style={styles.logoutImage} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.middleView}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen)}>
              <View style={styles.drawerItem}>
                <Image source={item.image} style={styles.drawerItemImage} />
                <Text style={styles.drawerItemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <ImageBackground source={Icons.bg} style={styles.bgStyle}>
          <View style={{flexDirection: 'row'}}>
            <Image source={Icons.vlogo} style={styles.vlogoStyle} />
            <View>
              <Text style={styles.headerText}>VIRTUASWAP</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <TouchableOpacity onPress={() => {}} style={styles.counterView}>
                  <Image source={Icons.dollercoin} style={styles.menuIcon} />
                  <Text style={styles?.countTitle}>{'250'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.counterView}>
                  <Image source={Icons.union} style={styles.menuIcon} />
                  <Text style={styles?.countTitle}>{'250'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.headerText1}>Download VirtuaSWAP Wallet App</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity>
              <Image source={Icons.appleIcon} style={styles.appleLogo} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Icons.googleIcon} style={styles.appleLogo} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          width: SCREEN_WIDTH * 0.72,
          justifyContent: 'space-evenly',
          backgroundColor: colors.Surface_Secondary,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate(screenName.HomeScreen)
          }}
          style={{flex: 1}}>
          <ImageBackground
            source={Icons.passengerBg}
            style={{
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.4,
              flexDirection: 'row',
            }}>
            <Image source={Icons.passenger1} style={styles.iconStyle} />
            <Text style={styles.textStyle}>Passenger</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate(screenName.StartDriver);
          }}
          style={{
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            width: SCREEN_WIDTH * 0.4,
            flexDirection: 'row',
            top: 2,
            left: 5,
          }}>
          <Image source={Icons.driver} style={styles.iconStyle} />
          <Text style={[styles.textStyle, {color: colors.Text_Tertiary}]}>
            Driver
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botomView}>
        <View style={styles.bottomRow}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Icons.tutilogo} style={styles.backImage} />
            <Text style={styles.versionText1}>Tuti Trips</Text>
          </View>
          <Text style={styles.versionText}>Version 1.0</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    bgStyle: {
      width: SCREEN_WIDTH * 0.72,
      // height:100,
      alignSelf: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 10,
      borderRadius: 5,
      resizeMode: 'contain',
    },
    vlogoStyle: {
      height: 64,
      width: 64,
      marginRight: 8,
    },
    headerText: {
      ...commonFontStyle(600, 14, colors.white),
    },
    headerText1: {
      marginVertical: 12,
      ...commonFontStyle(600, 12, colors.white),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: hp(2),
      paddingVertical: hp(2),
      backgroundColor: colors.background,
      borderBottomColor: colors.Surface_Secondary,
      borderBottomWidth: 1,
    },
    container: {
      backgroundColor: colors.white,
    },
    userImage: {
      height: 56,
      width: 56,
      borderRadius: 56 / 2,
    },
    username: {
      ...commonFontStyle(600, 20, colors.Primary),
      flex: 1,
      paddingLeft: 5,
    },
    logoutImage: {
      height: 24,
      width: 24,
      margin: hp(2),
      tintColor: colors.black,
    },
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: hp(2),
      paddingVertical: hp(1.8),
    },
    drawerItemImage: {
      height: 18,
      width: 18,
      marginRight: hp(2.5),
      tintColor: '#686C74',
      resizeMode: 'contain',
    },
    drawerItemText: {
      ...commonFontStyle(400, 16, colors.Primary),
    },
    middleView: {
      paddingVertical: hp(2),
      flex: 1,
      top: Platform.OS == 'ios' ? -40 : 0,
    },
    botomView: {
      backgroundColor: colors.Primary_500,
    },
    mainView: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: colors.white,
    },
    backImage: {height: 48, resizeMode: 'contain', width: 68},
    bottomRow: {
      paddingVertical: hp(1.5),
      paddingHorizontal: hp(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    versionText: {
      ...commonFontStyle(400, 14, colors.Neutral_1000),
    },
    versionText1: {
      ...commonFontStyle(600, 16, colors.Neutral_1000),
    },
    menuIcon: {
      height: w(20),
      width: w(20),
      resizeMode: 'contain',
    },
    counterView: {
      backgroundColor: colors?.black,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: h(7),
      paddingHorizontal: w(8),
      borderRadius: w(100),
      flexDirection: 'row',
      gap: w(2),
      marginRight: w(16),
    },
    countTitle: {
      ...commonFontStyle(400, 14, colors?.white),
      lineHeight: h(18),
      marginLeft: 4,
    },
    appleLogo: {
      height: w(32),
      width: w(108),
    },
    iconStyle: {
      height: w(16),
      width: w(16),
      marginRight: 10,
    },
    textStyle: {
      ...commonFontStyle(400, 14, colors?.black),
    },
  });
};
