import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppStyles} from '../../theme/appStyles';
import {Icons} from '../../utils/images';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  commonFontStyle,
  h,
  hp,
  w,
} from '../../theme/fonts';
import PrimaryButton from '../../compoment/PrimaryButton';
import {screenName} from '../../navigation/screenNames';
import FarmerTrack from '../../compoment/FarmerTrack';

type Props = {};

let facility = [
  {id: 1, title: 'Create Route', image: Icons?.create_route},
  {id: 2, title: 'Turn on Discovery', image: Icons?.turn_on_discouvery},
  {id: 3, title: 'View Carpool trips', image: Icons?.view_carpool_trips},
  {id: 4, title: 'Book', image: Icons?.book},
  {id: 5, title: 'Earn Rewards', image: Icons?.earn},
];

const LoginSignupScreen = (props: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={Icons?.cover}
        resizeMode="cover"
        style={styles.coverimage}>
        <Image source={Icons?.Logo} resizeMode="contain" style={styles?.logo} />

        <Text style={styles.title}>{'Welcome to Tuti Trips'}</Text>
        <View style={styles?.stepcontainer}>
          {facility.map((item, index) => (
            <FarmerTrack
              item={item}
              data={facility}
              index={index}
              selectIndex={0}
              ViewStyle={styles.stepstyle}
              lineViewStyle={styles?.lineViewStyle}
              listView={styles?.listView}
              ViewContent={<Image source={item?.image} style={styles?.icon} />}
              listTitle={styles?.listTitle}
              TitleContainer={styles?.TitleContainer}
            />
          ))}
          <View style={styles.btnView}>
            <PrimaryButton
              extraStyle={styles.btn}
              title="Login"
              isYellow={false}
              onPress={() => navigation.navigate(screenName.SignInScreen)}
            />
            <PrimaryButton
              extraStyle={styles.btn}
              title="Create Account"
              onPress={() => navigation.navigate(screenName.EveryDayScreen)}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginSignupScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    coverimage: {
      width: '100%',
      height: SCREEN_HEIGHT * 0.48,
      // justifyContent: 'center',
      // alignItems: 'center',
      resizeMode: 'contain',
    },
    logo: {
      width: w(101),
      height: w(101),
      alignSelf: 'center',
      top: SCREEN_HEIGHT * 0.17,
    },
    title: {
      ...commonFontStyle(600, 24, colors?.black),
      paddingHorizontal: w(16),
      top: SCREEN_HEIGHT * 0.31,
    },
    stepcontainer: {
      paddingHorizontal: w(16),
      top: SCREEN_HEIGHT * 0.33,
    },
    stepstyle: {
      width: w(48),
      height: w(48),
      borderRadius: w(100),
      backgroundColor: colors?.Primary_500,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lineViewStyle: {
      backgroundColor: colors?.Primary_500,
      position: 'absolute',
      left: w(22),
      top: h(50),
      height: SCREEN_HEIGHT * 0.03,
    },
    listView: {
      marginBottom: h(20),
    },
    icon: {
      width: w(24),
      height: w(24),
    },
    listTitle: {
      ...commonFontStyle(400, 16, colors?.black),
    },
    TitleContainer: {
      marginLeft: w(16),
    },
    btnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: w(12),
      // paddingHorizontal: w(16),
      // top:SCREEN_HEIGHT,
      // bottom:
    },
    btn: {
      flex: 1,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      height: h(44),
    },
  });
};
