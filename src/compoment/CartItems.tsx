import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { useAppDispatch } from '../redux/hooks';
import {
  decrement,
  increment,
} from '../actions/commonAction';
import { deleteCardAction, getCardAction, updateQuantityAction } from '../actions/cardAction';

export interface ListObj {
  title: string;
  iconName?: any;
  images?: string[];
  name?: string;
  cuisine_name?: string;
  price?: number;
  quantity: number;
  id: number;
  menu_id?: number;
  product_total: string
}
type ItemProps = {
  item: ListObj;
  setDelete?: any;
};

const CartItems = ({ item, setDelete }: ItemProps) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    cardData()
  }, [])

  const cardData = () => {
    let obj = {
      onSuccess: () => {
      },
      onFailure: () => {
      },
    };
    dispatch(getCardAction(obj));
  }

  const deleteCardItem = (id: number) => {
    let cardInfo = {
      data: id,
      onSuccess: () => {
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
    dispatch(deleteCardAction(cardInfo));
  }

  const incrementQuenty = (cardId: number) => {
    let updateObj = {
      data: {
        quantity: item?.quantity + 1
      },
      params: cardId,
      onSuccess: (res: any) => {
        dispatch(increment(res.data?.menu_id))
      },
      onFailure: (Err: any) => {
        if (Err != undefined) {
          Alert.alert('Warning', Err?.message);
        }
      },
    };
    dispatch(updateQuantityAction(updateObj));
  }

  const decrementQuenty = (cardId: number) => {
    let updateObj = {
      data: {
        quantity: item?.quantity - 1
      },
      params: cardId,
      onSuccess: (res: any) => {
        dispatch(decrement(res.data?.menu_id));

      },
      onFailure: (Err: any) => {
        if (Err != undefined) {
          Alert.alert('Warning', Err?.message);
        }
      },
    };
    dispatch(updateQuantityAction(updateObj));
  }

  return (
    <View style={styles.boxView}>
      <View style={styles.subBoxView}>
        {/* {item?.images[0] ? (
          <Image
            source={{uri: item?.images[0]}}
            style={[styles.imageView, {backgroundColor: colors.image_Bg_gray}]}
          />
        ) : ( */}
        <View
          style={[styles.imageView, { backgroundColor: colors.image_Bg_gray }]}
        />
        {/* )} */}
        <View style={styles.container}>
          <View style={styles.leftView}>
            <Text style={styles.titleText}> {item?.name}</Text>
            <TouchableOpacity onPress={() => deleteCardItem(item?.id)}>
              <Image style={styles.closeIcon} source={Icons.close} />
            </TouchableOpacity>
          </View>
          <View style={[styles.leftView, { paddingTop: hp(8) }]}>
            <View style={styles.breakfastView}>
              <Text style={styles.breakfastText}> {item.cuisine_name}</Text>
            </View>
            <Text style={styles.priceText}> {`₹${Number(item?.price * item.quantity).toFixed(2)}`}</Text>
          </View>
          <View style={styles.rateView}>
            <Text style={styles.priceText1}> {`₹${item?.price}`}</Text>
            <View style={styles.rightContainers}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.roundView}
                  onPress={() => {
                    if (item?.quantity > 1) {
                      decrementQuenty(item?.id)
                    } else {
                      deleteCardItem(item?.id);
                    }
                  }}>
                  <Image style={styles.minusIcon} source={Icons.minus} />
                </TouchableOpacity>
                <Text style={styles.countText}>{item?.quantity}</Text>
                <TouchableOpacity
                  style={styles.roundView}
                  onPress={() => {
                    incrementQuenty(item?.id)
                  }}>
                  <Image style={styles.rightIcon} source={Icons.plus} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartItems;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    boxView: {
      marginTop: hp(20),
      marginHorizontal: wp(20)
    },
    subBoxView: {
      flexDirection: 'row',
    },
    imageView: {
      width: wp(85),
      height: wp(85),
      borderRadius: 20,
    },
    container: {
      flex: 1,
      marginLeft: wp(10),
      paddingTop: hp(8),
    },
    leftView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleText: {
      ...commonFontStyle(700, 14, colors.headerText),
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
    },
    priceText: {
      ...commonFontStyle(700, 18, colors.Title_Text),
    },
    priceText1: {
      ...commonFontStyle(600, 16, colors.Title_Text),
      // marginTop: 2,
    },
    breakfastText: {
      ...commonFontStyle(400, 12, colors.Primary_Orange),
    },
    itemsText: {
      ...commonFontStyle(400, 14, colors.gray_400),
    },
    rateView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: hp(5)
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
      borderRadius: wp(20),
      width: wp(20),
      height: wp(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    minusIcon: {
      width: wp(12),
      height: hp(12),
      resizeMode: 'contain',
      tintColor: colors.white,
    },
    rightIcon: {
      width: wp(10),
      height: hp(10),
      resizeMode: 'contain',
      tintColor: colors.white,
    },
    closeIcon: {
      width: wp(18),
      height: hp(18),
      resizeMode: 'contain',
      tintColor: colors.black,
      marginRight: 5
    },
    countText: {
      paddingHorizontal: wp(6),
      ...commonFontStyle(500, 16, colors.black),
    },
  });
};
