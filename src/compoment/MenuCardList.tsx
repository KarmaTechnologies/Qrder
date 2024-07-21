import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {commonFontStyle, hp, wp} from '../theme/fonts';
import NoDataFound from './NoDataFound';
import Loader from './Loader';
import {Icons} from '../utils/images';
import {useAppSelector} from '../redux/hooks';

type Props = {};

const MenuCardList = ({}: Props) => {
  const {colors, isDark} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [refreshing, setRefreshing] = React.useState(false);
  const {getMenuData} = useAppSelector(state => state.data);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxView}>
        <View style={styles.subBoxView}>
          {item?.images[0] ? (
            <Image source={{uri: item?.images[0]}} style={[styles.imageView,{backgroundColor: colors.image_Bg_gray}]} />
          ) : (
            <View
              style={[
                styles.imageView,
                {backgroundColor: colors.image_Bg_gray},
              ]}
            />
          )}
          <View style={styles.rightContainer}>
            <View style={styles.leftView}>
              <Text style={styles.titleText}> {item?.name}</Text>
              <Image source={Icons.optionIcon} style={styles.optionIcon} />
            </View>
            <View style={styles.rateView}>
              <View style={styles.breakfastView}>
                <Text style={styles.breakfastText}> {'Breakfast'}</Text>
              </View>
              <Text style={styles.priceText}> {`$${item?.price}`}</Text>
            </View>

            <View style={styles.rateView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Icons.star} style={styles.starStyle} />
                <Text style={styles.rateText}>4.9</Text>
                <Text style={styles.rateText1}>{`${'(10 Reviews)'}`}</Text>
              </View>
              <Text style={styles.pickUpText}> {'Pick UP'}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.itemsText}>
        {' '}
        {`Total ${getMenuData.length} items`}
      </Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.3}
        data={getMenuData}
        ListEmptyComponent={<NoDataFound />}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return (
            <View>
              {/* {true && <Loader size={'small'} />} */}
              <View style={{height: 90}} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default MenuCardList;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
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
    rightContainer: {
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
  });
};
