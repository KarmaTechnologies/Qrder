import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { strings } from '../i18n/i18n';
import { screenName } from '../navigation/screenNames';
import PrimaryButton from './PrimaryButton';
import { useAppDispatch } from '../redux/hooks';

import { addCardAction, getCardAction } from '../actions/cardAction';

export interface ListObj {
  title: string;
  iconName?: any;
  images?: string[];
  name?: string;
  cuisine_name?: string;
  price?: number;
}
type ItemProps = {
  item: ListObj;
};

const CartMenuItems = ({ item }: ItemProps) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const addToCard = (card: any) => {
    let obj = {
      data: {
        menu_id: card?.id,
        quantity: 1
      },
      onSuccess: (res: any) => {
        let obj = {
          onSuccess: () => {
          },
          onFailure: () => {
          },
        };
        dispatch(getCardAction(obj));
      },
      onFailure: (Err: any) => {
        if (Err != undefined) {
          Alert.alert('Warning', Err?.message);
        }
      },
    };
    dispatch(addCardAction(obj));

  }

  return (
    <View style={styles.boxView}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(screenName.FoodDetails, { itemData: item, showChef: true, showAddToCard: true });
        }}
        style={styles.subBoxView}>
        {item.images[0] ? (
          <Image
            source={{ uri: item.images[0] }}
            style={[styles.imageView, { backgroundColor: colors.image_Bg_gray }]}
          />
        ) : (
          <View
            style={[styles.imageView, { backgroundColor: colors.image_Bg_gray }]}
          />
        )}
        <View style={styles.container}>
          <View style={styles.leftView}>
            <Text style={styles.titleText}> {item?.name}</Text>
            <Text style={styles.priceText}> {`₹${item.price}`}</Text>
          </View>
          <View style={styles.rateView}>
            <View style={styles.breakfastView}>
              <Text style={styles.breakfastText}> {item.cuisine_name}</Text>
            </View>
            <PrimaryButton
              extraStyle={styles.doneBtn}
              title={strings('CardMenuList.add')}
              titleStyle={styles.doneText}
              onPress={() => addToCard(item)}
            />
          </View>
          <View style={styles.rateView}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={Icons.star} style={styles.starStyle} />
              <Text style={styles.rateText}>4.9</Text>
              {/* <Text style={styles.rateText1}>{`${'(10 Reviews)'}`}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default CartMenuItems;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    boxView: {
      marginTop: hp(20),
    },
    subBoxView: {
      flexDirection: 'row',
    },
    imageView: {
      width: wp(102),
      height: wp(102),
      borderRadius: 20,
    },
    container: {
      flex: 1,
      marginLeft: wp(12),
      paddingTop: hp(11),
    },
    leftView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleText: {
      ...commonFontStyle(700, 14, colors.headerText),
    },
    optionIcon: {
      width: wp(24),
      height: hp(24),
    },
    pickUpText: {
      ...commonFontStyle(400, 14, colors.tabBar),
    },
    breakfastView: {
      backgroundColor: colors.orange_bg,
      alignSelf: 'flex-start',
      paddingHorizontal: wp(12),
      paddingVertical: hp(2),
      borderRadius: 29,
      marginVertical: hp(11),
    },
    priceText: {
      ...commonFontStyle(700, 18, colors.Title_Text),
    },
    breakfastText: {
      ...commonFontStyle(400, 14, colors.Primary_Orange),
    },
    itemsText: {
      ...commonFontStyle(400, 14, colors.gray_400),
    },
    rateView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    starStyle: {
      width: 17,
      height: 17,
    },
    rateText: {
      marginLeft: 4,
      ...commonFontStyle(700, 14, colors.Primary_Orange),
    },
    rateText1: {
      ...commonFontStyle(400, 14, colors.tabBar),
      marginLeft: 9,
    },
    rightContainers: {
      alignItems: 'flex-end',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    menuTextStyle: {
      ...commonFontStyle(400, 16, colors.black),
    },
    boxMenu: {
      backgroundColor: colors.card_bg,
    },
    roundView: {
      backgroundColor: colors.Primary_Orange,
      borderRadius: wp(24),
      width: wp(24),
      height: wp(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    doneBtn: {
      height: hp(26),
      paddingHorizontal: wp(20),
      borderRadius: 8,
    },
    doneText: {
      ...commonFontStyle(400, 14, colors?.black),
      textTransform: 'none',
    },
  });
};
