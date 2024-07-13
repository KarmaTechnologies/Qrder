import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {AppStyles} from '../../theme/appStyles';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../theme/fonts';
import {Icons} from '../../utils/images';
import PrimaryButton from '../../compoment/PrimaryButton';
import {screenName} from '../../navigation/screenNames';
import {strings} from '../../i18n/i18n';

type Props = {};

const OnboardingScreen = (props: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const flatlistRef = useRef(null);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={AppStyles.flex}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View>
          <SwiperFlatList
            index={index}
            ref={flatlistRef}
            data={[
              Icons.onboardingW1,
              Icons.onboardingW1,
              Icons.onboardingW1,
              Icons.onboardingW1,
            ]}
            onChangeIndex={({index}) => {
              setIndex(index);
            }}
            renderItem={({item}: any) => (
              <View>
                <Image style={styles.image} source={item} />
              </View>
            )}
            showPagination
            paginationStyle={{top: SCREEN_HEIGHT * 0.69}}
            paginationStyleItemActive={styles.activeDot}
            paginationStyleItemInactive={styles.inactiveDot}
            contentContainerStyle={{height: SCREEN_HEIGHT * 0.373}}
            style={{paddingTop: hp(60)}}
          />
        </View>
        <Text style={styles.title}>
          {index === 0
            ? strings('onboarding.all_you_favorites')
            : index === 1
            ? strings('onboarding.order_from_choosen_chef')
            : index === 2
            ? strings('onboarding.free_delivery_offers')
            : strings('onboarding.all_you_favorites')}
        </Text>
        <Text style={styles.des}>{strings('onboarding.onboarding_dec')}</Text>
        <PrimaryButton
          onPress={() => {
            if (index < 3) {
              flatlistRef?.current?.scrollToIndex({
                index: index + 1,
                animated: true,
              });
            } else {
              navigation.navigate(screenName.SignInScreen);
            }
          }}
          extraStyle={styles.nextBtn}
          title={
            index < 3
              ? strings('onboarding.next')
              : strings('onboarding.get_started')
          }
        />
        {index < 3 ? (
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              if (index > 0) {
                flatlistRef?.current?.scrollToIndex({
                  index: index - 1,
                  animated: true,
                });
              }
            }}>
            <Text style={styles.skipBtn}>{strings('onboarding.skip')}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    image: {
      resizeMode: 'contain',
      width: SCREEN_WIDTH,
      height: '100%',
    },
    activeDot: {
      backgroundColor: colors.Primary_Orange,
      height: 10,
      width: 10,
      marginHorizontal: 5,
    },
    inactiveDot: {
      backgroundColor: colors.Surface_Tertiary,
      height: 10,
      width: 10,
      marginHorizontal: 5,
    },
    title: {
      ...commonFontStyle(800, 24, colors.Title_Text),
      textAlign: 'center',
      marginTop: hp(63),
    },
    des: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
      textAlign: 'center',
      marginTop: hp(18),
    },
    nextBtn: {
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      width: SCREEN_WIDTH - wp(48),
      bottom: hp(55),
      color: colors.Primary_Orange,
      borderRadius: 12,
      height: hp(62),
    },
    btnStyle: {
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      bottom: hp(24),
    },
    skipBtn: {
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
    },
  });
};
