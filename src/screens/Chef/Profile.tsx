import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';
import { commonFontStyle, hp, wp } from '../../theme/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icons } from '../../utils/images';
import TitleList from '../../compoment/TitleListComponent';
import Spacer from '../../compoment/Spacer';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../compoment/Loader';
import { screenName } from '../../navigation/screenNames';
import { clearAsync, getAsyncUserInfo } from '../../utils/asyncStorageManager';
import { dispatchNavigation } from '../../utils/globalFunctions';
import { useAppSelector } from '../../redux/hooks';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type Props = {};

const Profile = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const { isDarkTheme } = useAppSelector(state => state.common);
  const [photoUri, setPhotoUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const fetchUserInfo = async () => {
    try {
      const userList = await getAsyncUserInfo();
      setName(userList.name || '');
      setNumber(userList.number || '')
    } catch (error) {
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
    }, [])
  );

  console.log(name)
  const selectImage = () => {
    setLoading(true);
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    })
      .then(image => {
        setPhotoUri(image.path);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const onPressNavigation = (list: string) => {
    if (list == screenName.PersonalInfo) {
      navigation.navigate(list, { hideEdit: false });
    } if (list === 'log Out') {
      console.log("222333")
    } else {
      list !== '' && navigation.navigate(list);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
      <HomeHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        onRightPress={() => {
          console.log('dee');
        }}
        mainShow={true}
        title={strings('profileScreen.profile')}
        extraStyle={styles.headerContainer}
        isHideIcon={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainerStyle}>
        <TouchableOpacity activeOpacity={0.8} style={styles.profileContainer}>
          <View style={styles.profileView}>
            <View style={styles.profileBox}>
              <View style={styles.profilImage} />
              <View style={styles.userNameView}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.numberText}>{number}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Image style={styles.rightIcon} source={Icons.rightBack} />
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={styles.accountText}>{strings('profileScreen.accounts')}</Text>
        <TitleList
          arr_list={[
            {
              title: strings('profileScreen.personal_info'),
              iconName: Icons.profileIcon,
              screens: screenName.PersonalInfo
            },
            // {
            //   title: strings('profileScreen.menu'),
            //   iconName: Icons.menuIcon,
            //   screens: ""
            // },
            {
              title: strings('profileScreen.inventory'),
              iconName: Icons.inventory,
              screens: ""
            },
            {
              title: strings('profileScreen.recipes_master'),
              iconName: Icons.inventory,
              screens: ''
            },
            {
              title: strings('profileScreen.chef'),
              iconName: Icons.chef,
              screens: screenName.ChefNameList
            },
            {
              title: strings('profileScreen.order_history'),
              iconName: Icons.inventory,
              // screens: screenName.ChefNameList
            },
            {
              title: strings('profileScreen.notifications'),
              iconName: Icons.notificationIcon,
              screens: screenName.ProfileNotification
            },
            // {
            //   title: strings('profileScreen.cuisines'),
            //   iconName: Icons.cuisine,
            //   screens: screenName.CuisinesNameList
            // },
          ]}
          onPressCell={onPressNavigation}
          styleProp={styles.boxCotainer}
        />
        <Text style={styles.accountText}>{strings('profileScreen.more')}</Text>
        <TitleList
          arr_list={[
            {
              title: strings('profileScreen.review'),
              iconName: Icons.stareIcon,
              screens: ""
            },
            {
              title: strings('profileScreen.discount'),
              iconName: Icons.discountIcon,
              screens: ""
            },
            {
              title: strings('profileScreen.support'),
              iconName: Icons.supportIcon,
              screens: ""
            },
            {
              title: strings('profileScreen.privacy_policy'),
              iconName: Icons.privacyIcon,
              screens: ""
            },
            {
              title: strings('profileScreen.term_condition'),
              iconName: Icons.termIcon,
              screens: ""
            },
            {
              title: strings('profileScreen.settings'),
              iconName: Icons.settingsIcon,
              screens: screenName.Settings
            },
            {
              title: strings('profileScreen.log_out'),
              iconName: Icons.logout,
              screens: "log Out"
            },
          ]}
          onPressCell={onPressNavigation}
          styleProp={styles.boxCotainer}
        />
        {/* <TitleList
          arr_list={[
            {
              title: strings('profileScreen.log_out'),
              iconName: Icons.logout,
            },
          ]}
          onPressCell={async () => {
            clearAsync(), dispatchNavigation(screenName.RoleSelectionScreen);
            await GoogleSignin.signOut();
          }}
          styleProp={styles.boxCotainer}
        /> */}
        <Spacer height={hp(90)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Profile;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg_white,
    },
    headerContainer: {
      backgroundColor: colors.bg_white,
    },
    contentContainerStyle: {
      marginHorizontal: wp(20),
    },
    profileView: {
      flex: 1
    },
    profileBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cards_bg,
      paddingVertical: hp(12),
      paddingHorizontal: wp(16),
      borderRadius: 16
    },
    profilImage: {
      width: wp(64),
      height: wp(64),
      borderRadius: wp(64),
      borderColor: colors.text_orange,
      borderWidth: 1,
      backgroundColor: colors.bg_orange200,
    },
    userNameView: {
      marginLeft: wp(12),
    },
    nameText: {
      ...commonFontStyle(700, 16, colors.black),
    },
    numberText: {
      marginTop: hp(4),
      ...commonFontStyle(400, 12, colors.title_dec100),
    },
    boxCotainer: {
      marginTop: hp(8),
    },
    rightIcon: {
      width: wp(24),
      height: hp(24),
      resizeMode: 'contain',
    },
    accountText: {
      marginTop: hp(20),
      ...commonFontStyle(500, 16, colors.black),
    }
  });
};
