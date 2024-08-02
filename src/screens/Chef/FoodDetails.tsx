import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../theme/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../i18n/i18n';
import HomeHeader from '../../compoment/HomeHeader';
import Swiper from 'react-native-swiper';
import { Icons } from '../../utils/images';
import { useAppSelector } from '../../redux/hooks';

type Props = {};

const FoodDetails = ({ route }) => {
  const { itemData } = route?.params;
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const { isDarkTheme } = useAppSelector(state => state.common);
  const [basicDetails, setBasicDetails] = useState('');
  const { name, price, cuisine_name, description } = itemData

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
        title={strings('foodDetails.food_Details')}
        extraStyle={styles.headerContainer}
        isHideIcon={true}
        rightText={strings('foodDetails.edit')}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.mainConatiner}>
          <Swiper
            showsPagination={true}
            autoplay={true}
            horizontal={true}
            paginationStyle={{ height: 10 }}
            height="auto"
            dot={
              <>
                <View style={styles.dot} />
                <View style={styles.leftView}>
                  <Text style={styles.leftText}>{cuisine_name}</Text>
                </View>
              </>
            }
            activeDot={
              <>
                <View style={styles.activateDot} />
                <View style={[styles.rightView]}>
                  <Text style={styles.leftText}>Delivery</Text>
                </View>
              </>
            }>
            {[1, 1, 2, 3].map(() => {
              return (
                <>
                  <View style={styles.slide}>
                    <Image source={Icons.slider1} style={styles.imageStyle} />
                  </View>
                </>
              );
            })}
          </Swiper>
        </View>

        <View style={styles.foodTitle}>
          <View>
            <Text style={styles.foodText}>{name}</Text>
            <View style={styles.locationView}>
              <Image source={Icons.locationPin} style={styles.locationIcon} />
              <Text style={styles.locationText}>Kentucky 39495</Text>
            </View>
          </View>
          <View>
            <Text style={styles.priceText}>{`$${price}`}</Text>
            <View style={styles.rateView}>
              <Image source={Icons.star} style={styles.starStyle} />
              <Text style={styles.rateText}>4.9</Text>
              <Text style={styles.rateText1}>{`${'(10 Reviews)'}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.underlineAll} />
        <Text style={styles.basicText}>
          {strings('foodDetails.basic_details')}
        </Text>
        <TextInput
          value={description}
          onChangeText={(t: string) => setBasicDetails(t)}
          placeholder={strings('addFoodList.add_basic')}
          style={styles.basicInput}
          multiline
          maxLength={200}
          editable={false}
          placeholderTextColor={colors.white}
        />

        {/* <View style={[styles.underlineAll, { marginTop: hp(36) }]} />
        <Text style={styles.descriptionText}>
          {strings('foodDetails.description')}
        </Text>
        <Text style={styles.descriptionText1}>{description}</Text> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FoodDetails;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    contentContainerStyle: {
      marginHorizontal: wp(16),
    },
    headerContainer: {
      backgroundColor: colors.white,
    },
    foodTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    foodText: {
      ...commonFontStyle(700, 16, colors.Title_Text),
    },
    locationView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      width: 12,
      height: 12,
      marginTop: 10,
    },
    locationText: {
      paddingTop: hp(9),
      ...commonFontStyle(400, 13, colors.tabBar),
    },
    priceText: {
      alignSelf: 'flex-end',
      ...commonFontStyle(700, 18, colors.Title_Text),
    },
    rateView: {
      flexDirection: 'row',
      paddingTop: hp(7),
      alignItems: 'center',
    },
    starStyle: {
      width: 17,
      height: 17,
    },
    rateText: {
      marginLeft: 3,
      ...commonFontStyle(700, 14, colors.Primary_Orange),
    },
    rateText1: {
      ...commonFontStyle(400, 14, colors.tabBar),
      marginLeft: 6,
    },
    underlineAll: {
      height: 1,
      width: SCREEN_WIDTH,
      backgroundColor: colors.border_line5,
      marginTop: hp(24),
    },
    basicText: {
      ...commonFontStyle(400, 14, colors.Title_Text),
      paddingTop: hp(20),
      textTransform: 'uppercase',
    },
    basicInput: {
      height: hp(136),
      borderColor: colors.border_line4,
      borderWidth: 1,
      borderRadius: 8,
      padding: 15,
      textAlignVertical: 'top',
      marginTop: hp(20),
      color:colors.black,
      backgroundColor:colors.card_bg
    },
    descriptionText: {
      marginTop: 15,
      ...commonFontStyle(400, 14, colors.Title_Text),
    },
    descriptionText1: {
      marginTop: 15,
      ...commonFontStyle(400, 13, colors.text_color),
    },
    mainConatiner: {
      marginTop: 18,
      //   paddingHorizontal: 12,
      marginBottom: 12,
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    imageStyle: {
      borderRadius: 20,
      width: '99%',
      resizeMode: 'cover',
      height: SCREEN_HEIGHT * 0.24,
    },
    activateDot: {
      backgroundColor: colors.white,
      width: 21,
      height: 10,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      top: 10,
    },
    dot: {
      backgroundColor: 'rgba(0,0,0,.2)',
      width: 10,
      height: 10,
      borderRadius: 10,
      marginLeft: 3,
      marginRight: 3,
      top: 10,
    },
    leftView: {
      position: 'absolute',
      left: 12,
      backgroundColor: colors.white,
      borderRadius: 18,
      paddingVertical: 5,
      paddingHorizontal: 16,
    },
    rightView: {
      position: 'absolute',
      right: 10,
      backgroundColor: colors.white,
      borderRadius: 18,
      paddingVertical: 5,
      paddingHorizontal: 16,
    },
    leftText: {
      ...commonFontStyle(400, 14, colors.Title_Text),
    }
  });
};
