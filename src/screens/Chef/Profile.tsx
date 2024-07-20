import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import {strings} from '../../i18n/i18n';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icons} from '../../utils/images';
import TitleList from '../../compoment/TitleListComponent';
import Spacer from '../../compoment/Spacer';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../compoment/Loader';
import {screenName} from '../../navigation/screenNames';
import {clearAsync} from '../../utils/asyncStorageManager';
import {dispatchNavigation} from '../../utils/globalFunctions';

type Props = {};

const Profile = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [photoUri, setPhotoUri] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const onPressNavigation = (list: any) => {
    switch (list.title) {
      case 'Chef':
        navigation.navigate(screenName.ChefSignUp);
        break;
        case 'Notifications':
          navigation.navigate(screenName.ProfileNotification);
          break;
          case 'CRM':
          navigation.navigate(screenName.ProfileMessages);
          break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
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
        isHideIcon={false}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={selectImage}>
            {loading ? (
              <View style={[styles.loader, styles.profilImage]}>
                <Loader />
              </View>
            ) : (
              <Image
                source={photoUri ? {uri: photoUri} : Icons.profileImage}
                style={styles.profilImage}
              />
            )}
          </TouchableOpacity>
          <View style={styles.userNameView}>
            <Text style={styles.nameText}>Vishal Khadok</Text>
            <Text style={styles.desText}>I love fast food</Text>
          </View>
        </View>

        <TitleList
          arr_list={[
            {
              title: strings('profileScreen.personal_info'),
              iconName: Icons.profileIcon,
            },
          ]}
          onPressCell={onPressNavigation}
        />
        <TitleList
          arr_list={[
            {
              title: strings('profileScreen.menu'),
              iconName: Icons.menuIcon,
            },
            {
              title: strings('profileScreen.inventory'),
              iconName: Icons.inventory,
            },
            {
              title: strings('profileScreen.crm'),
              iconName: Icons.crmIcon,
            },
            {
              title: strings('profileScreen.notifications'),
              iconName: Icons.bellIcon,
            },
            {
              title: strings('profileScreen.chef'),
              iconName: Icons.chefIcon,
            },
          ]}
          onPressCell={onPressNavigation}
          styleProp={styles.boxCotainer}
        />
        <TitleList
          arr_list={[
            {
              title: strings('profileScreen.fAQs'),
              iconName: Icons.faqsIcon,
            },
            {
              title: strings('profileScreen.settings'),
              iconName: Icons.settingsIcon,
            },
          ]}
          onPressCell={onPressNavigation}
          styleProp={styles.boxCotainer}
        />
        <TitleList
          arr_list={[
            {
              title: strings('profileScreen.log_out'),
              iconName: Icons.logout,
            },
          ]}
          onPressCell={() => {
            clearAsync(), dispatchNavigation(screenName.SignInScreen);
          }}
          styleProp={styles.boxCotainer}
        />
        <Spacer height={hp(90)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Profile;

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
    contentContainerStyle: {
      marginHorizontal: wp(16),
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: hp(6),
      paddingBottom: hp(32),
    },
    profilImage: {
      width: wp(100),
      height: wp(100),
      borderRadius: wp(50),
      // backgroundColor: '#F88222',
      // opacity: 0.5
    },
    loader: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    userNameView: {
      marginLeft: wp(32),
    },
    nameText: {
      ...commonFontStyle(700, 20, colors.Title_Text),
    },
    desText: {
      marginTop: hp(8),
      ...commonFontStyle(400, 14, colors.gray_300),
    },
    boxCotainer: {
      marginTop: hp(20),
    },
  });
};
