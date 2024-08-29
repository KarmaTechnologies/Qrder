import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import HomeHeader from '../../compoment/HomeHeader';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../../theme/fonts';
import { strings } from '../../i18n/i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CartMenuCardList from '../../compoment/CartMenuCardList';
import { getCanteenCuisineAction, getCanteenMenuAction, getStudentMenuListAction } from '../../actions/commonAction';
import { GET_CANTEEN_CUISINE_LIST, GET_EMPTY_CANTEEN_LIST } from '../../redux/actionTypes';

type Props = {};

const StudentMenuList = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const [tabSelection, setTabSelection] = useState(strings('myMenuList.all'));
  const [refreshing, setRefreshing] = React.useState(false);
  const [cuisineId, setCuisineId] = React.useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const dispatch = useAppDispatch();
  const { getCanteenCuisines, getCanteenMenuData, canteenMenuCount } = useAppSelector(state => state.data);
  const { isDarkTheme } = useAppSelector(state => state.common);
  const [onEndReached, setOnEndReached] = useState(true);
  console.log('page', page);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (tabSelection === 'All') {
      getMenuList(1);
    } else {
      getAllCuisinesMenuList(cuisineId, 1)
    }
  }, [refreshing, cuisineId]);

  useEffect(() => {
    getCanteenCuisineList();
    getMenuList(1);
  }, []);

  const getCanteenCuisineList = () => {
    let obj = {
      params: params?.selectID,
      onSuccess: (res: any) => { },
      onFailure: (Err: any) => { },
    };
    dispatch(getCanteenCuisineAction(obj));
  };

  const getMenuList = (pages: number) => {
    let obj = {
      id: params?.selectID,
      data: {
        page: pages,
        limit: 7,
        pagination: true,
      },
      onSuccess: (res: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setPage(pages);
        setLoading(false)
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setLoading(false)
      },
    };
    dispatch(getCanteenMenuAction(obj));
  };

  const getAllCuisinesMenuList = (id: number, pages: number) => {
    let obj = {
      id: id,
      data: {
        page: pages,
        limit: 7,
        pagination: true,
      },
      onSuccess: (res: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setPage(pages);
        setLoading(false)
      },
      onFailure: (Err: any) => {
        setRefreshing(false);
        setLoadingMore(false);
        setLoading(false)
      },
    };
    dispatch(getStudentMenuListAction(obj));
  };

  const loadMoreData = () => {
    if (!onEndReached && getCanteenMenuData?.length >= 7) {
      if (getCanteenMenuData && getCanteenMenuData?.length < canteenMenuCount) {
        setLoadingMore(true);
        if (tabSelection === 'All') {
          getMenuList(page + 1);
        } else {
          getAllCuisinesMenuList(cuisineId, page + 1);
        }
      }
    }
  };

  const onTabChange = (item: any) => {
    setPage(1);
    setTabSelection(item.name);
    setCuisineId(item.id);
    setLoading(true);
    dispatch({ type: GET_EMPTY_CANTEEN_LIST, payload: false });
    setTimeout(() => {
      if (item.name === 'All') {
        getMenuList(1);
      } else {
        getAllCuisinesMenuList(item.id, 1);
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
      <HomeHeader
        onBackPress={() => {
          navigation.goBack();
          dispatch({ type: GET_EMPTY_CANTEEN_LIST, payload: false });
          dispatch({ type: GET_CANTEEN_CUISINE_LIST, payload: [] });
        }}
        onRightPress={() => {
          console.log('dee');
        }}
        mainShow={true}
        title={strings('myMenuList.my_menu')}
        extraStyle={styles.headerContainer}
        isShowIcon={false}
      />
      {getCanteenCuisines?.length === 0 ? null :
        <View style={styles.tabMainView}>
          <FlatList
            data={[
              { name: 'All', label: strings('myMenuList.all'), page: 0, id: 0 },
              ...getCanteenCuisines,
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onTabChange(item)}
                style={[
                  styles.tabItemView,
                  {
                    borderBottomWidth: 1,
                    paddingBottom: hp(16),
                    borderColor:
                      tabSelection === item.name
                        ? colors.headerText3
                        : colors.card_bg,
                  },
                ]}>
                <Text
                  style={{
                    color:
                      tabSelection === item.name
                        ? colors.headerText3
                        : colors.Title_Text,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.underlineAll} />
        </View>}

      <View style={styles.boxContainer}>
        <CartMenuCardList onRefresh={() => {
          onRefresh()
        }}
          refreshing={refreshing}
          loading={loading}
          loadMoreData={() => loadMoreData()}
          loadingMore={loadingMore}
          onMomentumScrollBegin={() => {
            setOnEndReached(false)
          }}
        />
      </View>
    </View>
  );
};

export default StudentMenuList;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerContainer: {
      backgroundColor: colors.white,
    },
    tabMainView: {
      flexDirection: 'row',
      marginBottom: hp(24),
      marginHorizontal: wp(24),
    },
    tabItemView: {
      flex: 1,
      marginTop: hp(14),
      alignItems: 'center',
      marginRight: 20,
      borderBottomWidth: 1,
    },
    ongoingText: {
      ...commonFontStyle(700, 14, colors.gray_200),
    },
    historyText: {
      ...commonFontStyle(700, 14, colors.gray_200),
    },
    selectUnderline: {
      height: 2,
      backgroundColor: colors.headerText3,
      marginTop: hp(16),
      width: wp(45),
    },
    underlineAll: {
      height: 1,
      width: SCREEN_WIDTH,
      backgroundColor: colors.card_bg,
      position: 'absolute',
      bottom: 0,
      zIndex: -1,
    },
    boxContainer: {
      flex: 1,
      marginHorizontal: wp(16),
    },
  });
};
